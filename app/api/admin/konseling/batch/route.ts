import { type NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session || session.user.role !== "ADMIN") {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()
    const { students, tanggalKonseling, kategori, hasilText, rekomendasi, rating } = body

    // Validasi input
    if (!students || !Array.isArray(students) || students.length === 0) {
      return NextResponse.json({ success: false, message: "Pilih minimal satu siswa" }, { status: 400 })
    }

    if (!tanggalKonseling || !kategori || !hasilText) {
      return NextResponse.json({ success: false, message: "Semua field wajib diisi" }, { status: 400 })
    }

    // Validasi rating
    if (rating < 1 || rating > 5) {
      return NextResponse.json({ success: false, message: "Rating harus antara 1-5" }, { status: 400 })
    }

    // Validasi siswa exists
    const existingStudents = await prisma.siswa.findMany({
      where: {
        nis: {
          in: students,
        },
      },
      select: {
        nis: true,
        nama: true,
      },
    })

    if (existingStudents.length !== students.length) {
      return NextResponse.json({ success: false, message: "Beberapa siswa tidak ditemukan" }, { status: 400 })
    }

    // Buat konseling untuk setiap siswa
    const konselingData = students.map((nis: string) => ({
      nisSiswa: nis,
      tanggalKonseling: new Date(tanggalKonseling),
      hasilText,
      rekomendasi: rekomendasi || null,
      rating: Number.parseInt(rating.toString()),
      kategori,
      adminId: session.user.id,
    }))

    const result = await prisma.hasilKonseling.createMany({
      data: konselingData,
    })

    // Ambil data konseling yang baru dibuat untuk response
    const createdKonseling = await prisma.hasilKonseling.findMany({
      where: {
        nisSiswa: {
          in: students,
        },
        tanggalKonseling: new Date(tanggalKonseling),
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
      orderBy: {
        createdAt: "desc",
      },
    })

    return NextResponse.json({
      success: true,
      message: `Berhasil menambahkan konseling untuk ${result.count} siswa`,
      data: {
        count: result.count,
        konseling: createdKonseling,
      },
    })
  } catch (error) {
    console.error("Error creating batch konseling:", error)
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
