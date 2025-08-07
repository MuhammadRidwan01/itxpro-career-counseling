import { type NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from '@/lib/prisma' // Import prisma singleton

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session || session.user.role !== "ADMIN") {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const page = Number.parseInt(searchParams.get("page") || "1")
    const limit = Number.parseInt(searchParams.get("limit") || "10")
    const search = searchParams.get("search") || ""
    const kategori = searchParams.get("kategori") || ""
    const startDate = searchParams.get("startDate")
    const endDate = searchParams.get("endDate")

    const skip = (page - 1) * limit

    // Build where clause
    const where: any = {}

    if (search) {
      where.OR = [
        {
          siswa: {
            nama: {
              contains: search,
              mode: "insensitive",
            },
          },
        },
        {
          nisSiswa: {
            contains: search,
          },
        },
        {
          hasilText: {
            contains: search,
            mode: "insensitive",
          },
        },
      ]
    }

    if (kategori) {
      where.kategori = kategori
    }

    if (startDate && endDate) {
      where.tanggalKonseling = {
        gte: new Date(startDate),
        lte: new Date(endDate),
      }
    }

    const [konseling, total] = await Promise.all([
      prisma.hasilKonseling.findMany({
        where,
        include: {
          siswa: {
            select: {
              nis: true,
              nama: true,
              kelasSaatIni: true,
              angkatan: true,
            },
          },
        },
        orderBy: {
          tanggalKonseling: "desc",
        },
        skip,
        take: limit,
      }),
      prisma.hasilKonseling.count({ where }),
    ])

    return NextResponse.json({
      success: true,
      data: {
        konseling,
        pagination: {
          page,
          limit,
          total,
          totalPages: Math.ceil(total / limit),
        },
      },
    })
  } catch (error) {
    console.error("Error fetching konseling:", error)
    return NextResponse.json({ success: false, message: "Terjadi kesalahan server" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session || session.user.role !== "ADMIN") {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()
    const { nisSiswa, tanggalKonseling, hasilText, kategori } = body

    // Validasi input
    if (!nisSiswa || !tanggalKonseling || !hasilText || !kategori) {
      return NextResponse.json({ success: false, message: "Semua field wajib diisi" }, { status: 400 })
    }

    // Validasi siswa exists
    const siswa = await prisma.siswa.findUnique({
      where: { nis: nisSiswa },
    })

    if (!siswa) {
      return NextResponse.json({ success: false, message: "Siswa tidak ditemukan" }, { status: 404 })
    }

    const konseling = await prisma.hasilKonseling.create({
      data: {
        nisSiswa,
        tanggalKonseling: new Date(tanggalKonseling),
        hasilText,
        kategori,
        adminId: session.user.id,
      },
      include: {
        siswa: {
          select: {
            nis: true,
            nama: true,
            kelasSaatIni: true,
          },
        },
      },
    })

    return NextResponse.json({
      success: true,
      message: "Konseling berhasil ditambahkan",
      data: konseling,
    })
  } catch (error) {
    console.error("Error creating konseling:", error)
    return NextResponse.json(
      {
        success: false,
        message: "Terjadi kesalahan server",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}
