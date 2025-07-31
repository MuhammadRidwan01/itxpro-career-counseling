import { type NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session || session.user.role !== "ADMIN") {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 })
    }

    const now = new Date()
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1)
    const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0)

    // Total konseling
    const totalKonseling = await prisma.hasilKonseling.count()

    // Konseling bulan ini
    const konselingBulanIni = await prisma.hasilKonseling.count({
      where: {
        tanggalKonseling: {
          gte: startOfMonth,
          lte: endOfMonth,
        },
      },
    })

    // Rata-rata rating
    const avgRating = await prisma.hasilKonseling.aggregate({
      _avg: {
        rating: true,
      },
    })

    // Siswa unik yang pernah konseling
    const siswaUnik = await prisma.hasilKonseling.groupBy({
      by: ["nisSiswa"],
    })

    // Kategori terpopuler
    const kategoriStats = await prisma.hasilKonseling.groupBy({
      by: ["kategori"],
      _count: {
        kategori: true,
      },
      orderBy: {
        _count: {
          kategori: "desc",
        },
      },
      take: 1,
    })

    const stats = {
      totalKonseling,
      konselingBulanIni,
      rataRataRating: avgRating._avg.rating || 0,
      kategoriTerpopuler: kategoriStats[0]?.kategori || "Tidak ada",
      siswaUnik: siswaUnik.length,
    }

    return NextResponse.json({
      success: true,
      data: stats,
    })
  } catch (error) {
    console.error("Error fetching konseling stats:", error)
    return NextResponse.json({ success: false, message: "Terjadi kesalahan server" }, { status: 500 })
  }
}
