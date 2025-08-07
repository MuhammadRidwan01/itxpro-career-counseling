import { type NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { PrismaClient } from '@/generated/prisma/client'

const prisma = new PrismaClient()

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session || session.user.role !== "ADMIN") {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const startDateParam = searchParams.get("startDate")
    const endDateParam = searchParams.get("endDate")
    const kelasSaatIniParam = searchParams.get("kelasSaatIni")
    const konselingCategoryParam = searchParams.get("konselingCategory")
    const tujuanKarirCategoryParam = searchParams.get("tujuanKarirCategory")

    const dateFilter =
      startDateParam && endDateParam
        ? {
            tanggalKonseling: {
              gte: new Date(startDateParam),
              lte: new Date(endDateParam),
            },
          }
        : {}

    const konselingCategoryFilter =
      konselingCategoryParam && konselingCategoryParam !== "all"
        ? { kategori: konselingCategoryParam }
        : {}

    const tujuanKarirCategoryFilter =
      tujuanKarirCategoryParam && tujuanKarirCategoryParam !== "all"
        ? { kategoriUtama: tujuanKarirCategoryParam }
        : {}

    const classFilter =
      kelasSaatIniParam && kelasSaatIniParam !== "all"
        ? { kelasSaatIni: kelasSaatIniParam }
        : {}

    // Comprehensive Counseling Statistics
    const [
      totalKonseling,
      konselingByCategory,
      totalTujuanKarir,
      tujuanKarirByCategory,
      studentsNotSubmittedTujuanKarir,
      classesWithStudents,
      allClasses,
      allKonselingCategories, // New
      allTujuanKarirCategories, // New
    ] = await Promise.all([
      prisma.hasilKonseling.count({ where: { ...dateFilter, ...konselingCategoryFilter } }),
      prisma.hasilKonseling.groupBy({
        by: ["kategori"],
        _count: {
          kategori: true,
        },
        orderBy: {
          _count: {
            kategori: "desc",
          },
        },
        where: { ...dateFilter, ...konselingCategoryFilter },
      }),
      prisma.tujuanKarir.count({
        where: {
          ...tujuanKarirCategoryFilter,
          siswa: classFilter.kelasSaatIni ? { kelasSaatIni: classFilter.kelasSaatIni } : undefined,
        },
      }),
      prisma.tujuanKarir.groupBy({
        by: ["kategoriUtama"],
        _count: {
          kategoriUtama: true,
        },
        orderBy: {
          _count: {
            kategoriUtama: "desc",
          },
        },
        where: {
          ...tujuanKarirCategoryFilter,
          siswa: classFilter.kelasSaatIni ? { kelasSaatIni: classFilter.kelasSaatIni } : undefined,
        },
      }),
      prisma.siswa.findMany({
        where: {
          tujuanKarirSubmitted: false,
          ...classFilter,
        },
        select: {
          nis: true,
          nama: true,
          kelasSaatIni: true,
        },
      }),
      prisma.siswa.groupBy({
        by: ["kelasSaatIni"],
        _count: {
          nis: true,
        },
        where: classFilter,
      }),
      prisma.siswa.findMany({
        distinct: ["kelasSaatIni"],
        select: {
          kelasSaatIni: true,
        },
        where: {
          kelasSaatIni: {
            not: null,
          },
        },
      }),
      prisma.hasilKonseling.findMany({ // Fetch all unique konseling categories
        distinct: ["kategori"],
        select: {
          kategori: true,
        },
        where: {
          kategori: {
            not: "", // Filter out empty strings if any, or use isNot null if appropriate for your data
          },
        },
      }),
      prisma.tujuanKarir.findMany({ // Fetch all unique tujuan karir categories
        distinct: ["kategoriUtama"],
        select: {
          kategoriUtama: true,
        },
        where: {
          kategoriUtama: {
            not: "", // Filter out empty strings if any, or use isNot null if appropriate for your data
          },
        },
      }),
    ])

    const studentsNotSubmittedByClass: {
      [key: string]: {
        students: { nis: string; nama: string }[];
        count: number;
        percentage: number;
      };
    } = {}

    for (const classData of classesWithStudents) {
      if (classData.kelasSaatIni) {
        const totalStudentsInClass = classData._count.nis
        const studentsInClassNotSubmitted = studentsNotSubmittedTujuanKarir.filter(
          (s: { kelasSaatIni: string | null }) => s.kelasSaatIni === classData.kelasSaatIni
        )
        const countNotSubmitted = studentsInClassNotSubmitted.length
        const percentage = totalStudentsInClass > 0 ? (countNotSubmitted / totalStudentsInClass) * 100 : 0

        studentsNotSubmittedByClass[classData.kelasSaatIni] = {
          students: studentsInClassNotSubmitted.map((s: { nis: string; nama: string }) => ({ nis: s.nis, nama: s.nama })),
          count: countNotSubmitted,
          percentage: parseFloat(percentage.toFixed(2)),
        }
      }
    }

    const stats = {
      totalKonseling,
      konselingByCategory: konselingByCategory.map((item: { kategori: string | null; _count: { kategori: number } }) => ({
        category: item.kategori,
        count: item._count.kategori,
      })),
      totalTujuanKarir,
      tujuanKarirByCategory: tujuanKarirByCategory.map((item) => ({
        category: item.kategoriUtama,
        count: item._count.kategoriUtama,
      })),
      studentsNotSubmittedTujuanKarir: studentsNotSubmittedTujuanKarir.length,
      studentsNotSubmittedDetails: studentsNotSubmittedTujuanKarir,
      studentsNotSubmittedByClass,
      availableClasses: allClasses.map((c) => c.kelasSaatIni!).filter(Boolean) as string[],
      availableKonselingCategories: allKonselingCategories.map((c) => c.kategori!).filter(Boolean) as string[],
      availableTujuanKarirCategories: allTujuanKarirCategories.map((c) => c.kategoriUtama!).filter(Boolean) as string[],
    }

    return NextResponse.json({
      success: true,
      data: stats,
    })
  } catch (error) {
    console.error("Error fetching comprehensive stats:", error)
    return NextResponse.json({ success: false, message: "Terjadi kesalahan server" }, { status: 500 })
  }
}
