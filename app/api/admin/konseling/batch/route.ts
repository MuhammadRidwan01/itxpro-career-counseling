import { type NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { Prisma } from "@prisma/client"

interface SessionUser {
  id: string
  email: string
  role: "ADMIN" | "STUDENT"
}

interface ExtendedSession {
  user: SessionUser
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions) as ExtendedSession | null

    if (!session?.user || session.user.role !== "ADMIN") {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()
    const { siswaList, tanggalKonseling, hasilText, deskripsi, tindakLanjut, kategori } = body as {
      siswaList: string[]
      tanggalKonseling: string
      hasilText: string
      deskripsi?: string
      tindakLanjut?: string
      kategori: string
    }

    // Validasi input
    if (!siswaList || !Array.isArray(siswaList) || siswaList.length === 0) {
      return NextResponse.json({ success: false, message: "Daftar siswa tidak boleh kosong" }, { status: 400 })
    }

    if (!tanggalKonseling || !hasilText || !kategori) {
      return NextResponse.json({ success: false, message: "Semua field wajib diisi" }, { status: 400 })
    }

    // Validasi siswa exists
    const existingSiswa = await prisma.siswa.findMany({
      where: {
        nis: {
          in: siswaList,
        },
      },
      select: {
        nis: true,
      },
    })

    const existingNis = existingSiswa.map((s) => s.nis)
    const notFoundNis = siswaList.filter((nis) => !existingNis.includes(nis))

    if (notFoundNis.length > 0) {
      return NextResponse.json(
        { success: false, message: `Siswa dengan NIS ${notFoundNis.join(", ")} tidak ditemukan` },
        { status: 400 },
      )
    }

    // Buat data konseling untuk batch insert
    const konselingData: Prisma.HasilKonselingCreateManyInput[] = siswaList.map((nis) => ({
      nisSiswa: nis,
      tanggalKonseling: new Date(tanggalKonseling),
      hasilText,
      kategori,
      adminId: session.user.id,
      status: "BELUM", // Set default status as per model
      ...(deskripsi ? { deskripsi } : {}),
      ...(tindakLanjut ? { tindakLanjut } : {}),
    }))

    // Insert batch konseling
    const result = await prisma.hasilKonseling.createMany({
      data: konselingData,
      skipDuplicates: true,
    })

    return NextResponse.json({
      success: true,
      message: `Berhasil membuat ${result.count} konseling`,
      data: {
        created: result.count,
        siswaCount: siswaList.length,
      },
    })
  } catch (error) {
    console.error("Error creating batch konseling:", error)
    return NextResponse.json({ success: false, message: "Terjadi kesalahan server" }, { status: 500 })
  }
}
