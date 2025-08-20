import { type NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { PrismaClient } from '@prisma/client'

// Use a global singleton pattern for PrismaClient
declare global {
  var prisma: PrismaClient | undefined
}

const prisma = global.prisma || new PrismaClient()

if (process.env.NODE_ENV !== 'production') global.prisma = prisma

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session || session.user.role !== "ADMIN") {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const dataType = searchParams.get("type")
    const category = searchParams.get("category")
    const kelasSaatIni = searchParams.get("kelasSaatIni")
    const nis = searchParams.get("nis")
    const tujuanKarirSubmitted = searchParams.get("tujuanKarirSubmitted")

    let data: any[] = []
    let totalCount = 0

    switch (dataType) {
      case "siswa":
        const siswaWhere: any = {}
        if (kelasSaatIni) siswaWhere.kelasSaatIni = kelasSaatIni
        if (nis) siswaWhere.nis = nis
        if (tujuanKarirSubmitted !== null) siswaWhere.tujuanKarirSubmitted = tujuanKarirSubmitted === "true"

        data = await prisma.siswa.findMany({
          where: siswaWhere,
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
          },
        })
        totalCount = await prisma.siswa.count({ where: siswaWhere })
        break
      case "konseling":
        const konselingWhere: any = {}
        if (category) konselingWhere.kategori = { equals: category, mode: "insensitive" } // Case-insensitive
        if (nis) konselingWhere.nisSiswa = nis
        if (kelasSaatIni) konselingWhere.siswa = { kelasSaatIni: kelasSaatIni }

        data = await prisma.hasilKonseling.findMany({
          where: konselingWhere,
          include: {
            siswa: {
              select: {
                nama: true,
                kelasSaatIni: true,
              },
            },
          },
        })
        totalCount = await prisma.hasilKonseling.count({ where: konselingWhere })
        break
      case "tujuanKarir":
        const tujuanKarirWhere: any = {}
        if (category) {
          // Handle "Kuliah" mapping to "melanjutkan" for consistency with frontend
          tujuanKarirWhere.kategoriUtama = {
            equals: category === "Kuliah" ? "melanjutkan" : category,
            mode: "insensitive",
          }
        }
        if (nis) tujuanKarirWhere.nisSiswa = nis
        if (kelasSaatIni) tujuanKarirWhere.siswa = { kelasSaatIni: kelasSaatIni }

        data = await prisma.tujuanKarir.findMany({
          where: tujuanKarirWhere,
          include: {
            siswa: {
              select: {
                nama: true,
                kelasSaatIni: true,
              },
            },
          },
        })
        totalCount = await prisma.tujuanKarir.count({ where: tujuanKarirWhere })
        break
      case "jurusan": // New case for fetching unique jurusan
        data = await prisma.siswa.findMany({
          distinct: ['jurusan'],
          select: { jurusan: true },
          where: {
            jurusan: {
              not: "",
            },
          },
        }).then(res => res.map(item => item.jurusan).filter(Boolean)) // Extract only the jurusan string and filter out null/undefined/empty strings
        break
      case "angkatan": // New case for fetching unique angkatan
        data = await prisma.siswa.findMany({
          distinct: ['angkatan'],
          select: { angkatan: true },
          where: { }, // Removed redundant 'not: null' for angkatan as it's a non-nullable field
          orderBy: { angkatan: 'desc' },
        }).then(res => res.map(item => item.angkatan)) // Filter out nulls after mapping
        break
      default:
        return NextResponse.json({ success: false, message: "Invalid data type" }, { status: 400 })
    }

    return NextResponse.json({
      success: true,
      data: data,
      totalCount: totalCount,
    })
  } catch (error) {
    console.error("Error fetching data:", error)
    return NextResponse.json({ success: false, message: "Terjadi kesalahan server" }, { status: 500 })
  }
}