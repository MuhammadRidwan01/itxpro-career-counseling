import { type NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { PrismaClient } from '@/generated/prisma/client'

const prisma = new PrismaClient()

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)

    if (!session || session.user.role !== "ADMIN") {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 })
    }

    const { id } = await params
    const body = await request.json()
    const { nisSiswa, tanggalKonseling, hasilText, kategori, status } = body

    // Validate input
    if (!nisSiswa || !tanggalKonseling || !hasilText || !kategori || !status) {
      return NextResponse.json({ success: false, message: "Semua field wajib diisi" }, { status: 400 })
    }

    // Validate siswa exists
    const siswa = await prisma.siswa.findUnique({
      where: { nis: nisSiswa },
    })

    if (!siswa) {
      return NextResponse.json({ success: false, message: "Siswa tidak ditemukan" }, { status: 404 })
    }

    const updatedKonseling = await prisma.hasilKonseling.update({
      where: { id },
      data: {
        nisSiswa,
        tanggalKonseling: new Date(tanggalKonseling),
        hasilText,
        kategori,
        status,
      },
    })

    return NextResponse.json({
      success: true,
      message: "Konseling berhasil diperbarui",
      data: updatedKonseling,
    })
  } catch (error) {
    console.error("Error updating konseling:", error)
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