import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { validateNIS } from "@/lib/utils"

export async function POST(request: Request) {
  try {
    const { nis } = await request.json()

    if (!validateNIS(nis)) {
      return NextResponse.json({ success: false, message: "Format NIS tidak valid" })
    }

    const siswa = await prisma.siswa.findUnique({
      where: { nis },
      include: { user: true },
    })

    if (!siswa) {
      return NextResponse.json({ success: false, message: "NIS tidak ditemukan dalam database" })
    }

    if (siswa.user) {
      return NextResponse.json({ success: false, message: "NIS sudah terdaftar" })
    }

    return NextResponse.json({
      success: true,
      siswa: {
        nis: siswa.nis,
        nama: siswa.nama,
        kelasSaatIni: siswa.kelasSaatIni,
        angkatan: siswa.angkatan,
      },
    })
  } catch (error) {
    console.error("Validate NIS error:", error)
    return NextResponse.json({ success: false, message: "Terjadi kesalahan server" })
  }
}
