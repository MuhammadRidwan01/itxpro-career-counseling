import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(req: Request) {
  try {
    const { processedBlocks } = await req.json();
    console.log('Received request for final import.');
    console.log('Processed blocks received:', JSON.stringify(processedBlocks, null, 2));

    if (!processedBlocks || !Array.isArray(processedBlocks)) {
      console.error('Invalid request body: processedBlocks array is missing or malformed');
      return NextResponse.json({ message: 'Invalid request body: processedBlocks array is missing or malformed' }, { status: 400 });
    }

    const importedStudents = [];
    const failedStudents = [];
    let totalStudentsExpected = 0;

    for (const block of processedBlocks) {
      if (!block.students || !Array.isArray(block.students)) {
        console.warn(`Skipping block with missing or malformed students array: ${block.id}`);
        continue;
      }
      totalStudentsExpected += block.students.length;

      for (const student of block.students) {
        const nis = student.nis;
        const namaSiswa = student.nama;
        const angkatan = student.angkatan;
        const kelasSaatIni = block.selectedClass; // Use selected class from block
        const jurusan = block.selectedJurusan;   // Use selected jurusan from block

        console.log(`Attempting to process student: ${namaSiswa} (NIS: ${nis}) - Class: ${kelasSaatIni}, Jurusan: ${jurusan}, Angkatan: ${angkatan}`);

        try {
          const existingSiswa = await prisma.siswa.findUnique({ where: { nis: nis } });

          if (existingSiswa) {
            await prisma.siswa.update({
              where: { nis: nis },
              data: {
                nama: namaSiswa,
                angkatan: angkatan,
                kelasSaatIni: kelasSaatIni,
                jurusan: jurusan,
              },
            });
            importedStudents.push({
              nis: nis,
              nama: namaSiswa,
              status: 'updated',
              class: kelasSaatIni,
              jurusan: jurusan,
            });
            console.log(`Student updated: ${namaSiswa} (${nis})`);
          } else {
            await prisma.siswa.create({
              data: {
                nis: nis,
                nama: namaSiswa,
                angkatan: angkatan,
                kelasSaatIni: kelasSaatIni,
                jurusan: jurusan,
              },
            });
            importedStudents.push({
              nis: nis,
              nama: namaSiswa,
              status: 'created',
              class: kelasSaatIni,
              jurusan: jurusan,
            });
            console.log(`Student created: ${namaSiswa} (${nis})`);
          }
        } catch (dbError: any) {
          console.error(`Database error for ${namaSiswa} (${nis}):`, dbError);
          failedStudents.push({
            data: { nis, nama: namaSiswa, class: kelasSaatIni, jurusan },
            reason: dbError.message,
          });
        }
      }
    }

    console.log('Final import process finished. Total students expected:', totalStudentsExpected, 'Imported:', importedStudents.length, 'Failed:', failedStudents.length);

    return NextResponse.json({
      message: 'CSV import completed successfully',
      importedCount: importedStudents.length,
      failedCount: failedStudents.length,
      failedDetails: failedStudents.length > 0 ? failedStudents : undefined,
      importedDetails: importedStudents,
      summary: {
        totalProcessed: importedStudents.length + failedStudents.length,
        successful: importedStudents.length,
        failed: failedStudents.length,
      }
    });

  } catch (error: any) {
    console.error('Error during final CSV import:', error);
    return NextResponse.json({
      message: 'Internal server error during final CSV import',
      error: error.message
    }, { status: 500 });
  }
}