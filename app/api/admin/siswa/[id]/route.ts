import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = await params
    const session = await getServerSession(authOptions)

    if (!session || session.user.role !== "ADMIN") {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 })
    }

    if (!id) {
      return NextResponse.json({ success: false, message: "Student ID is required" }, { status: 400 })
    }

    const data = await request.json()
    const { status, tahunLulusTarget } = data

    const updatedSiswa = await prisma.siswa.update({
      where: { nis: id },
      data: {
        status: status,
        tahunLulusTarget: tahunLulusTarget ? Number.parseInt(tahunLulusTarget) : null,
      },
    })

    return NextResponse.json({ success: true, data: updatedSiswa })
  } catch (error) {
    console.error("Update siswa error:", error)
    return NextResponse.json({ success: false, message: "Terjadi kesalahan server" }, { status: 500 })
  }
}