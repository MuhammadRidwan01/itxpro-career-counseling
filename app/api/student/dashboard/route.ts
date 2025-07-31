import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export async function GET() {
  try {
    const session = await getServerSession(authOptions)

    if (!session || session.user.role !== "STUDENT") {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 })
    }

    // Get student data
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      include: {
        siswa: {
          include: {
            tujuanKarir: true,
            hasilKonseling: {
              orderBy: { tanggalKonseling: "desc" },
              take: 10,
            },
          },
        },
      },
    })

    if (!user?.siswa) {
      return NextResponse.json({ success: false, message: "Data siswa tidak ditemukan" })
    }

    const siswa = user.siswa

    // Calculate stats
    const totalKonseling = siswa.hasilKonseling.length
    const avgRating =
      totalKonseling > 0 ? siswa.hasilKonseling.reduce((acc, k) => acc + k.rating, 0) / totalKonseling : 0

    return NextResponse.json({
      success: true,
      data: {
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
        stats: {
          totalKonseling,
          avgRating: Math.round(avgRating * 10) / 10,
          tujuanKarirStatus: siswa.tujuanKarirSubmitted ? "Terisi" : "Belum",
        },
        tujuanKarir: siswa.tujuanKarir,
        konselingHistory: siswa.hasilKonseling.map((k) => ({
          id: k.id,
          tanggal: k.tanggalKonseling,
          kategori: k.kategori,
          hasil: k.hasilText,
          rating: k.rating,
        })),
      },
    })
  } catch (error) {
    console.error("Student dashboard error:", error)
    return NextResponse.json({ success: false, message: "Terjadi kesalahan server" })
  }
}
