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
    const limit = getAllData ? undefined : Number.parseInt(searchParams.get("limit") || "100") // Meningkatkan default limit
    const status = searchParams.get("status")
    const angkatan = searchParams.get("angkatan")

    const where: any = {}

    if (search) {
      where.OR = [
        { nama: { contains: search, mode: "insensitive" } },
        { nis: { contains: search } },
        { email: { contains: search, mode: "insensitive" } },
      ]
    }

    if (status) {
      where.status = status
    }

    if (angkatan) {
      where.angkatan = Number.parseInt(angkatan)
    }

    const [siswa, total] = await Promise.all([
      prisma.siswa.findMany({
        where,
        ...(getAllData ? {} : {
          skip: (page - 1) * (limit || 100),
          take: limit,
        }),
        orderBy: { createdAt: "desc" },
        include: {
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
            },
            orderBy: { tanggalKonseling: "desc" },
            take: 1,
          },
        },
      }),
      prisma.siswa.count({ where }),
    ])

    return NextResponse.json({
      success: true,
      data: {
        siswa,
        ...(getAllData ? {} : {
          pagination: {
            page,
            limit: limit || 100,
            total,
            totalPages: Math.ceil(total / (limit || 100)),
          },
        }),
      },
    })
  } catch (error) {
    console.error("Get siswa error:", error)
    return NextResponse.json({ success: false, message: "Terjadi kesalahan server" })
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

    // Extract angkatan from NIS
    const angkatan = Number.parseInt(nis.substring(0, 2)) + 2000

    const siswa = await prisma.siswa.create({
      data: {
        nis,
        nama,
        kelasSaatIni,
        angkatan,
        jurusan,
        tahunLulusTarget: tahunLulusTarget || angkatan,
        user: undefined // Make the user relation optional
      },
    })

    return NextResponse.json({ success: true, data: siswa })
  } catch (error) {
    console.error("Create siswa error:", error)
    return NextResponse.json({ success: false, message: "Terjadi kesalahan server" })
  }
}
