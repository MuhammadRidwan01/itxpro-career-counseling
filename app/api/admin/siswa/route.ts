import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export async function GET(request: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session || session.user.role !== "ADMIN") {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const search = searchParams.get("search") || ""
    const getAllData = searchParams.get("all") === "true"
    const page = getAllData ? 1 : Number.parseInt(searchParams.get("page") || "1")
    const limitParam = searchParams.get("limit")
    const limit = getAllData ? undefined : (limitParam ? Number.parseInt(limitParam) : undefined)
    const status = searchParams.get("status")
    const angkatan = searchParams.get("angkatan")
    const jurusan = searchParams.get("jurusan")
    const hasKonseling = searchParams.get("hasKonseling")

    // Build where clause
    const whereConditions: any[] = []

    // Search condition
    if (search.trim()) {
      whereConditions.push({
        OR: [
          { nama: { contains: search.trim(), mode: "insensitive" } },
          { nis: { contains: search.trim() } },
          { email: { contains: search.trim(), mode: "insensitive" } },
        ]
      })
    }

    // Status filter
    if (status && status !== 'all') {
      whereConditions.push({
        status: { equals: status }
      })
    }

    // Jurusan filter
    if (jurusan && jurusan !== 'all') {
      whereConditions.push({
        jurusan: { equals: jurusan }
      })
    }

    // Angkatan filter
    if (angkatan && angkatan !== 'all') {
      whereConditions.push({
        angkatan: { equals: Number.parseInt(angkatan) }
      })
    }

    // HasKonseling filter
    if (hasKonseling === "true") {
      whereConditions.push({
        hasilKonseling: {
          some: {}
        }
      })
    } else if (hasKonseling === "false") {
      whereConditions.push({
        hasilKonseling: {
          none: {}
        }
      })
    }

    // Combine all conditions
    const where = whereConditions.length > 0 ? { AND: whereConditions } : {}

    const findManyOptions: any = {
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
        user: {
          select: {
            id: true,
            email: true,
            createdAt: true,
          },
        },
        tujuanKarir: {
          select: {
            kategoriUtama: true,
          },
        },
        hasilKonseling: {
          select: {
            id: true,
            tanggalKonseling: true,
            status: true,
          },
          orderBy: { tanggalKonseling: "desc" },
          take: 1,
        },
      },
    }

    if (!getAllData && limit !== undefined) {
      findManyOptions.skip = (page - 1) * limit
      findManyOptions.take = limit
    }

    const [siswa, total] = await Promise.all([
      prisma.siswa.findMany(findManyOptions), prisma.siswa.count({ where }),
    ])

    return NextResponse.json({
      success: true,
      data: {
        siswa,
        ...(getAllData || limit === undefined ? {} : {
          pagination: {
            page,
            limit: limit,
            total,
            totalPages: Math.ceil(total / limit),
          },
        }),
      },
    })
  } catch (error) {
    console.error("Get siswa error:", error)
    return NextResponse.json({ 
      success: false, 
      message: "Terjadi kesalahan server",
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    })
  }
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session || session.user.role !== "ADMIN") {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 })
    }

    const data = await request.json()
    const { nis, nama, email, kelasSaatIni, jurusan, tahunLulusTarget } = data

    // Validate required fields
    if (!nis || !nama || !kelasSaatIni || !jurusan) {
      return NextResponse.json({ 
        success: false, 
        message: "NIS, nama, kelas, dan jurusan wajib diisi" 
      }, { status: 400 })
    }

    // Check if NIS already exists
    const existingSiswa = await prisma.siswa.findUnique({
      where: { nis }
    })

    if (existingSiswa) {
      return NextResponse.json({ 
        success: false, 
        message: "NIS sudah terdaftar" 
      }, { status: 400 })
    }

    // Extract angkatan from NIS (assuming first 2 digits represent year)
    const angkatan = Number.parseInt(nis.substring(0, 2)) + 2000

    const siswa = await prisma.siswa.create({
      data: {
        nis,
        nama,
        kelasSaatIni,
        angkatan,
        jurusan,
        tahunLulusTarget: tahunLulusTarget || angkatan + 3, // Default 3 years study
        email: email || null, // Make email optional
      },
    })

    return NextResponse.json({ success: true, data: siswa })
  } catch (error) {
    console.error("Create siswa error:", error)
    return NextResponse.json({ 
      success: false, 
      message: "Terjadi kesalahan server",
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    })
  }
}