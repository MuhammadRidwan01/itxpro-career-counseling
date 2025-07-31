import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export async function GET() {
  try {
    const session = await getServerSession(authOptions)

    if (!session || session.user.role !== "ADMIN") {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 })
    }

    // Get statistics
    const [totalSiswa, siswaAktif, totalKonseling, tujuanKarirCount] = await Promise.all([
      prisma.siswa.count(),
      prisma.siswa.count({ where: { status: "AKTIF" } }),
      prisma.hasilKonseling.count(),
      prisma.siswa.count({ where: { tujuanKarirSubmitted: true } }),
    ])

    // Get tujuan karir distribution
    const tujuanKarirData = await prisma.tujuanKarir.groupBy({
      by: ["kategoriUtama"],
      _count: {
        kategoriUtama: true,
      },
    })

    // Get konseling per month (last 6 months)
    const sixMonthsAgo = new Date()
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6)

    const konselingBulanan = await prisma.hasilKonseling.groupBy({
      by: ["tanggalKonseling"],
      where: {
        tanggalKonseling: {
          gte: sixMonthsAgo,
        },
      },
      _count: {
        id: true,
      },
    })

    // Process monthly data
    const monthlyData = konselingBulanan.reduce(
      (acc, item) => {
        const month = new Date(item.tanggalKonseling).toLocaleDateString("id-ID", { month: "short" })
        acc[month] = (acc[month] || 0) + item._count.id
        return acc
      },
      {} as Record<string, number>,
    )

    // Get distribution by angkatan
    const distribusiAngkatan = await prisma.siswa.groupBy({
      by: ["angkatan"],
      _count: {
        angkatan: true,
      },
      orderBy: {
        angkatan: "desc",
      },
    })

    // Get recent students
    const recentStudents = await prisma.siswa.findMany({
      take: 10,
      orderBy: { createdAt: "desc" },
      select: {
        nis: true,
        nama: true,
        kelasSaatIni: true,
        angkatan: true,
        status: true,
        tujuanKarirSubmitted: true,
      },
    })

    return NextResponse.json({
      success: true,
      data: {
        stats: {
          totalSiswa,
          siswaAktif,
          totalKonseling,
          tujuanKarirCount,
        },
        charts: {
          tujuanKarir: tujuanKarirData.map((item) => ({
            name: item.kategoriUtama,
            value: item._count.kategoriUtama,
            color:
              item.kategoriUtama === "kuliah" ? "#D4AF37" : item.kategoriUtama === "bekerja" ? "#E8B4CB" : "#9A7AA0",
          })),
          konselingBulanan: Object.entries(monthlyData).map(([bulan, jumlah]) => ({
            bulan,
            jumlah,
          })),
          distribusiAngkatan: distribusiAngkatan.map((item) => ({
            angkatan: item.angkatan.toString(),
            jumlah: item._count.angkatan,
          })),
        },
        recentStudents,
      },
    })
  } catch (error) {
    console.error("Dashboard API error:", error)
    return NextResponse.json({ success: false, message: "Terjadi kesalahan server" })
  }
}
