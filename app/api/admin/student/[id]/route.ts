import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params
    console.log("API received student ID:", id)

    const session = await getServerSession(authOptions)

    if (!session || session.user.role !== "ADMIN") { // Only ADMIN role allowed
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 })
    }

    if (!id) {
      return NextResponse.json({ success: false, message: "Student ID is required" }, { status: 400 })
    }

    const siswa = await prisma.siswa.findUnique({
      where: { nis: id },
      include: {
        hasilKonseling: true, // Include counseling history
        tujuanKarir: true, // Include career goals
      },
    })
    console.log("Prisma query result for siswa:", siswa)

    if (!siswa) {
      return NextResponse.json({ success: false, message: "Student not found" }, { status: 404 })
    }

    // Filter out sensitive data if necessary before sending to client
    const studentData = {
      siswa: {
        nis: siswa.nis,
        nama: siswa.nama,
        email: siswa.email,
        kelasSaatIni: siswa.kelasSaatIni,
        angkatan: siswa.angkatan,
        jurusan: siswa.jurusan,
        status: siswa.status,
        tujuanKarirSubmitted: siswa.tujuanKarirSubmitted,
      },
      konselingHistory: siswa.hasilKonseling.map((k: { id: string; tanggalKonseling: Date; kategori: string | null; hasilText: string | null }) => ({
        id: k.id,
        tanggal: k.tanggalKonseling,
        kategori: k.kategori || "N/A", // Provide a default if null
        hasil: k.hasilText || "N/A", // Provide a default if null
      })),
      tujuanKarir: siswa.tujuanKarir ? {
        kategoriUtama: siswa.tujuanKarir.kategoriUtama,
        ptn1: siswa.tujuanKarir.ptn1,
        jurusan1: siswa.tujuanKarir.jurusan1,
        ptn2: siswa.tujuanKarir.ptn2,
        jurusan2: siswa.tujuanKarir.jurusan2,
        ptn3: siswa.tujuanKarir.ptn3,
        jurusan3: siswa.tujuanKarir.jurusan3,
        detailBekerja: siswa.tujuanKarir.detailBekerja,
        detailWirausaha: siswa.tujuanKarir.detailWirausaha,
      } : null,
    }

    return NextResponse.json({ success: true, data: studentData }, { status: 200 })
  } catch (error) {
    console.error("[API/ADMIN/STUDENT/ID] Error fetching student details:", error)
    return NextResponse.json({ success: false, message: "Internal Server Error" }, { status: 500 })
  }
}