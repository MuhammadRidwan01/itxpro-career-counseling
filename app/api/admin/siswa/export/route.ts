import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import ExcelJS from "exceljs";

export async function GET(request: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== "ADMIN") {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const search = searchParams.get("search") || "";
    const status = searchParams.get("status");
    const angkatan = searchParams.get("angkatan");
    const jurusan = searchParams.get("jurusan");

    // Build where clause
    const whereConditions: any[] = [];

    // Search condition
    if (search.trim()) {
      whereConditions.push({
        OR: [
          { nama: { contains: search.trim(), mode: "insensitive" } },
          { nis: { contains: search.trim() } },
          { email: { contains: search.trim(), mode: "insensitive" } },
        ]
      });
    }

    // Status filter
    if (status && status !== 'all') {
      whereConditions.push({
        status: { equals: status }
      });
    }

    // Jurusan filter
    if (jurusan && jurusan !== 'all') {
      whereConditions.push({
        jurusan: { equals: jurusan }
      });
    }

    // Angkatan filter
    if (angkatan && angkatan !== 'all') {
      whereConditions.push({
        angkatan: { equals: Number.parseInt(angkatan) }
      });
    }

    // Combine all conditions
    const where = whereConditions.length > 0 ? { AND: whereConditions } : {};

    const siswa = await prisma.siswa.findMany({
      where,
      orderBy: { createdAt: "desc" },
      select: {
        nis: true,
        nama: true,
        email: true,
        kelasSaatIni: true,
        angkatan: true,
        jurusan: true,
        status: true,
        tujuanKarirSubmitted: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Data Siswa");

    // Define columns
    worksheet.columns = [
      { header: "NIS", key: "nis", width: 15 },
      { header: "Nama Siswa", key: "nama", width: 30 },
      { header: "Email", key: "email", width: 30 },
      { header: "Kelas Saat Ini", key: "kelasSaatIni", width: 15 },
      { header: "Angkatan", key: "angkatan", width: 10 },
      { header: "Jurusan", key: "jurusan", width: 15 },
      { header: "Status", key: "status", width: 15 },
      { header: "Tujuan Karir Submitted", key: "tujuanKarirSubmitted", width: 20 },
      { header: "Tanggal Dibuat", key: "createdAt", width: 20 },
    ];

    // Add rows
    siswa.forEach((item) => {
      worksheet.addRow({
        nis: item.nis,
        nama: item.nama,
        email: item.email || "",
        kelasSaatIni: item.kelasSaatIni,
        angkatan: item.angkatan,
        jurusan: item.jurusan,
        status: item.status,
        tujuanKarirSubmitted: item.tujuanKarirSubmitted ? "Ya" : "Tidak",
        createdAt: new Date(item.createdAt).toLocaleDateString("id-ID", {
          year: "numeric",
          month: "long",
          day: "numeric",
        }),
      });
    });

    // Generate buffer
    const buffer = await workbook.xlsx.writeBuffer();

    // Set headers for file download
    const headers = new Headers();
    headers.append("Content-Type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
    headers.append("Content-Disposition", "attachment; filename=data_siswa.xlsx");
    headers.append("Content-Length", buffer.byteLength.toString());

    return new NextResponse(buffer, { headers });

  } catch (error: any) {
    console.error("Error exporting students:", error);
    return NextResponse.json(
      { success: false, message: "Terjadi kesalahan server saat mengekspor data siswa." },
      { status: 500 }
    );
  }
}