import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import Papa from 'papaparse';

export async function POST(req: Request) {
  try {
    console.log('Received CSV import request');
    const formData = await req.formData();
    const file = formData.get('file') as File;

    if (!file) {
      console.log('No file uploaded');
      return NextResponse.json({ message: 'No file uploaded' }, { status: 400 });
    }

    // Validate file type
    if (!file.name.toLowerCase().endsWith('.csv')) {
      return NextResponse.json({ message: 'Please upload a CSV file' }, { status: 400 });
    }

    console.log('CSV file received:', file.name, file.size, 'bytes');
    const fileContent = await file.text();

    // Parse CSV with PapaParser
    let csvData: string[][];
    try {
      const parseResult = Papa.parse(fileContent, {
        delimiter: ';',
        skipEmptyLines: false,
        header: false
      });
      
      csvData = parseResult.data as string[][];
      console.log('CSV parsing complete. Total rows:', csvData.length);
    } catch (csvError: any) {
      console.error('CSV parsing error:', csvError);
      return NextResponse.json({ message: 'Invalid CSV file', error: csvError.message }, { status: 400 });
    }

    // Define types for better readability and structure
    interface StudentInBlock {
      nis: string;
      nama: string;
      angkatan: number;
      originalRowIndex: number;
      originalColIndex: number;
    }

    interface ClassBlock {
      id: string; // Unique ID for the block
      initialClass: string;
      initialJurusan: string;
      students: StudentInBlock[];
      startingRow: number;
      startingCol: number;
      nisColumn: number; // The column index where NIS for this block's students is found
    }

    const processedBlocks: ClassBlock[] = [];
    const classHeaderRows: { rowIndex: number; colIndex: number; className: string; jurusan: string }[] = [];

    // Step 1: Identify class headers and their positions
    for (let rowIndex = 0; rowIndex < csvData.length; rowIndex++) {
      const row = csvData[rowIndex];
      if (!row) continue;

      for (let colIndex = 0; colIndex < row.length - 1; colIndex++) {
        const cell = row[colIndex];
        const nextCell = row[colIndex + 1];
        if (cell && cell.trim() === 'Kelas' && nextCell && nextCell.includes(':')) {
          const classMatch = nextCell.match(/:\s*(.+)/);
          if (classMatch) {
            const className = classMatch[1].trim();
            let jurusan = 'Umum';

            if (className.includes('RPL')) jurusan = 'RPL';
            else if (className.includes('TKJ')) jurusan = 'TKJ';
            else if (className.includes('DKV')) jurusan = 'DKV';

            classHeaderRows.push({ rowIndex, colIndex, className, jurusan });
          }
        }
      }
    }

    console.log('Class headers identified:', classHeaderRows.length);

    // Step 2: Group students into class blocks
    for (const header of classHeaderRows) {
      // Dynamically find the NIS column for this block
      let nisColumn = -1;
      const headerRowIndex = header.rowIndex + 1; // Row containing "No;NIS;NAMA"
      if (headerRowIndex < csvData.length) {
        const headerRow = csvData[headerRowIndex];
        // Search for "NIS" in the header row, prioritizing near the block's start
        // Account for potential empty cells before "NIS"
        for (let i = Math.max(0, header.colIndex - 3); i < headerRow.length; i++) { // Start search a bit before header.colIndex
          if (headerRow[i] && headerRow[i].trim().toUpperCase() === 'NIS') {
            nisColumn = i;
            break;
          }
        }
      }

      if (nisColumn === -1) {
        console.warn(`Could not find NIS column for block: ${header.className}. Skipping block.`);
        continue;
      }

      const newBlock: ClassBlock = {
        id: `${header.className}-${header.jurusan}-${header.colIndex}-${header.rowIndex}`,
        initialClass: header.className,
        initialJurusan: header.jurusan,
        students: [],
        startingRow: header.rowIndex,
        startingCol: header.colIndex,
        nisColumn: nisColumn,
      };
      processedBlocks.push(newBlock);

      // Find students belonging to this block
      // Iterate from the row after headers until a new header or end of file
      for (let rowIndex = header.rowIndex + 3; rowIndex < csvData.length; rowIndex++) { // Start 3 rows after "Kelas:" header (skips "NO;NIS;NAMA" line and empty line)
        const row = csvData[rowIndex];
        if (!row || row.length === 0) continue;

        // Stop if we hit another class header row or a "Wali Kelas" row
        const rowText = row.join('').toLowerCase();
        if (rowText.includes('wali kelas') || rowText.includes('kelas:')) {
          break;
        }

        const nisCell = row[newBlock.nisColumn]; // Directly check the NIS column for this block
        const namaCell = row[newBlock.nisColumn + 1]; // Name should be next to NIS (assuming Nama is always next to NIS)

        if (!nisCell || !namaCell) {
          // If NIS or Name cell is empty, it might be an empty row within student data, or end of block
          // Check if the current row is entirely empty or only contains non-student data
          const rowIsEffectivelyEmpty = row.every(cell => !cell || cell.trim() === '');
          if (rowIsEffectivelyEmpty) {
            continue; // Skip this effectively empty row
          }
          // If it's not empty but NIS/Nama are missing, it's likely the end of student data for this block
          break;
        }

        const nis = nisCell.trim();
        const nama = namaCell.trim();

        // Validate NIS: should be 9-10 digits
        if (!/^\d{9,10}$/.test(nis)) continue; // Skip if NIS format is invalid

        // Validate NAMA: should be meaningful text (not empty or just "NAMA")
        if (nama.length < 3 || !/[A-Za-z]/.test(nama) || nama.toUpperCase() === 'NAMA') continue;

        // Determine angkatan from NIS format
        let angkatan: number;
        const nisYearPrefix = nis.substring(0, 2);
        const parsedYear = parseInt(nisYearPrefix);

        if (!isNaN(parsedYear) && parsedYear >= 20 && parsedYear <= 99) {
          angkatan = 2000 + parsedYear;
        } else {
          console.warn(`Could not determine angkatan for NIS: ${nis}. Defaulting to 0.`);
          angkatan = 0;
        }

        newBlock.students.push({
          nis: nis,
          nama: nama,
          angkatan: angkatan,
          originalRowIndex: rowIndex,
          originalColIndex: nisColumn,
        });
      }
    }

    console.log('CSV data parsed into blocks. Total blocks:', processedBlocks.length);

    // Return the processed blocks for frontend preview
    return NextResponse.json({
      message: 'CSV parsed successfully for preview',
      processedBlocks: processedBlocks,
      summary: {
        totalBlocks: processedBlocks.length,
        totalStudentsFound: processedBlocks.reduce((sum, block) => sum + block.students.length, 0),
      }
    });

  } catch (error: any) {
    console.error('Error processing CSV for preview:', error);
    return NextResponse.json({
      message: 'Internal server error during CSV processing',
      error: error.message
    }, { status: 500 });
  }
}