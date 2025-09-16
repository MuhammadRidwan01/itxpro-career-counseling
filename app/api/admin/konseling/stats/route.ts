import { type NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { PrismaClient } from '@prisma/client' // Use @prisma/client directly

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
    const startDateParam = searchParams.get("startDate")
    const endDateParam = searchParams.get("endDate")
    const kelasSaatIniParam = searchParams.get("kelasSaatIni")
    const konselingCategoryParam = searchParams.get("konselingCategory")
    const tujuanKarirCategoryParam = searchParams.get("tujuanKarirCategory")
    const search = searchParams.get("search")
    const status = searchParams.get("status")
    const jurusan = searchParams.get("jurusan")
    const angkatan = searchParams.get("angkatan")

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

    // Build student filters properly
    const studentFilter: any = {}

    // Add class filter
    if (kelasSaatIniParam && kelasSaatIniParam !== "all") {
      studentFilter.kelasSaatIni = kelasSaatIniParam
    }

    // Add other filters
    if (status && status !== "all") {
      studentFilter.status = status
    }

    if (jurusan && jurusan !== "all") {
      studentFilter.jurusan = jurusan
    }

    if (angkatan && angkatan !== "all") {
      studentFilter.angkatan = parseInt(angkatan)
    }

    // Add search filter
    if (search) {
      studentFilter.OR = [
        { nama: { contains: search, mode: "insensitive" as any } },
        { nis: { contains: search } },
        { email: { contains: search, mode: "insensitive" as any } },
      ]
    }

    // Base student filter for classes query (without search to avoid type conflicts)
    const baseStudentFilter: any = {}
    
    if (kelasSaatIniParam && kelasSaatIniParam !== "all") {
      baseStudentFilter.kelasSaatIni = kelasSaatIniParam
    }

    if (status && status !== "all") {
      baseStudentFilter.status = status
    }

    if (jurusan && jurusan !== "all") {
      baseStudentFilter.jurusan = jurusan
    }

    if (angkatan && angkatan !== "all") {
      baseStudentFilter.angkatan = parseInt(angkatan)
    }

    // Comprehensive Counseling Statistics
    const [
      totalKonseling,
      konselingByCategory,
      totalTujuanKarir,
      tujuanKarirByCategory,
      studentsNotSubmittedTujuanKarir,
      classesWithStudents,
      allClasses,
      allKonselingCategories, // Fetch ALL categories without filters
      allTujuanKarirCategories, // Fetch ALL categories without filters
      konselingRecordsWithSiswa,
    ] = await Promise.all([
      prisma.hasilKonseling.count({
        where: {
          ...dateFilter,
          ...konselingCategoryFilter,
          siswa: studentFilter
        }
      }),
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
        where: {
          ...dateFilter,
          ...konselingCategoryFilter,
          siswa: studentFilter
        },
      }),
      prisma.tujuanKarir.count({
        where: {
          ...tujuanKarirCategoryFilter,
          siswa: studentFilter,
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
          siswa: studentFilter,
        },
      }),
      prisma.siswa.findMany({
        where: {
          tujuanKarirSubmitted: false,
          ...studentFilter,
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
        where: studentFilter,
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
          // Only apply base student filter without search
          ...baseStudentFilter,
        },
      }),
      // Fetch ALL konseling categories without any filters
      prisma.hasilKonseling.findMany({
        distinct: ["kategori"],
        select: {
          kategori: true,
        },
        where: {
          kategori: {
            not: null,
            not: "", // Filter out empty strings
          },
        },
        orderBy: {
          kategori: "asc",
        },
      }),
      // Fetch ALL tujuan karir categories without any filters
      prisma.tujuanKarir.findMany({
        distinct: ["kategoriUtama"],
        select: {
          kategoriUtama: true,
        },
        where: {
          kategoriUtama: {
            not: null,
            not: "", // Filter out empty strings
          },
        },
        orderBy: {
          kategoriUtama: "asc",
        },
      }),
      // New query: Fetch konseling records with associated siswa details
      prisma.hasilKonseling.findMany({
        where: {
          ...dateFilter,
          ...konselingCategoryFilter,
          siswa: studentFilter
        },
        select: {
          nisSiswa: true,
          siswa: {
            select: {
              kelasSaatIni: true,
            },
          },
        },
      }),
    ])

    const konselingStatsByClass: {
      [key: string]: {
        totalStudents: number;
      };
    } = {};

    const uniqueStudentsByClass: {
      [key: string]: Set<string>;
    } = {};

    konselingRecordsWithSiswa.forEach((record: { nisSiswa: string; siswa: { kelasSaatIni: string | null } }) => {
      const kelasSaatIni = record.siswa.kelasSaatIni;
      if (kelasSaatIni) {
        if (!uniqueStudentsByClass[kelasSaatIni]) {
          uniqueStudentsByClass[kelasSaatIni] = new Set();
        }
        uniqueStudentsByClass[kelasSaatIni].add(record.nisSiswa);
      }
    });

    for (const kelas in uniqueStudentsByClass) {
      konselingStatsByClass[kelas] = {
        totalStudents: uniqueStudentsByClass[kelas].size,
      };
    }

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
      tujuanKarirByCategory: tujuanKarirByCategory.map((item: { kategoriUtama: string | null; _count: { kategoriUtama: number } }) => ({
        category: item.kategoriUtama,
        count: item._count.kategoriUtama,
      })),
      studentsNotSubmittedTujuanKarir: studentsNotSubmittedTujuanKarir.length,
      studentsNotSubmittedDetails: studentsNotSubmittedTujuanKarir,
      studentsNotSubmittedByClass,
      availableClasses: allClasses.map((c: { kelasSaatIni: string | null }) => c.kelasSaatIni!).filter(Boolean) as string[],
      // These will now contain ALL available categories, not filtered ones
      availableKonselingCategories: allKonselingCategories.map((c: { kategori: string | null }) => c.kategori!).filter(Boolean) as string[],
      availableTujuanKarirCategories: allTujuanKarirCategories.map((c: { kategoriUtama: string | null }) => c.kategoriUtama!).filter(Boolean) as string[],
      konselingStatsByClass,
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