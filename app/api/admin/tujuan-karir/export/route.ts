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

    const tujuanKarir = await prisma.tujuanKarir.findMany({
      include: {
        siswa: {
          select: {
            nama: true,
            nis: true,
            kelasSaatIni: true,
            jurusan: true,
            angkatan: true,
            status: true,
          },
        },
      },
      orderBy: {
        createdAt: "asc",
      },
    });

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Data Tujuan Karir");

    // Define columns
    worksheet.columns = [
      { header: "NIS", key: "nis", width: 15 },
      { header: "Nama Siswa", key: "namaSiswa", width: 30 },
      { header: "Kelas", key: "kelas", width: 10 },
      { header: "Jurusan", key: "jurusan", width: 15 },
      { header: "Angkatan", key: "angkatan", width: 10 },
      { header: "Status Siswa", key: "statusSiswa", width: 15 },
      { header: "Kategori Utama", key: "kategoriUtama", width: 20 },
      { header: "PTN 1", key: "ptn1", width: 30 },
      { header: "Jurusan PTN 1", key: "jurusan1", width: 30 },
      { header: "PTN 2", key: "ptn2", width: 30 },
      { header: "Jurusan PTN 2", key: "jurusan2", width: 30 },
      { header: "PTN 3", key: "ptn3", width: 30 },
      { header: "Jurusan PTN 3", key: "jurusan3", width: 30 },
      { header: "Detail Bekerja", key: "detailBekerja", width: 50 },
      { header: "Detail Wirausaha", key: "detailWirausaha", width: 50 },
      { header: "Tanggal Dibuat", key: "createdAt", width: 20 },
    ];

    // Add rows
    tujuanKarir.forEach((item) => {
      worksheet.addRow({
        nis: item.siswa.nis,
        namaSiswa: item.siswa.nama,
        kelas: item.siswa.kelasSaatIni,
        jurusan: item.siswa.jurusan,
        angkatan: item.siswa.angkatan,
        statusSiswa: item.siswa.status,
        kategoriUtama: item.kategoriUtama === "melanjutkan" ? "Kuliah" : item.kategoriUtama,
        ptn1: item.ptn1,
        jurusan1: item.jurusan1,
        ptn2: item.ptn2,
        jurusan2: item.jurusan2,
        ptn3: item.ptn3,
        jurusan3: item.jurusan3,
        detailBekerja: item.detailBekerja,
        detailWirausaha: item.detailWirausaha,
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
    headers.append("Content-Disposition", "attachment; filename=data_tujuan_karir.xlsx");
    headers.append("Content-Length", buffer.byteLength.toString());

    return new NextResponse(buffer, { headers });

  } catch (error: any) {
    console.error("Error exporting career goals:", error);
    return NextResponse.json(
      { success: false, message: "Terjadi kesalahan server saat mengekspor data tujuan karir." },
      { status: 500 }
    );
  }
}