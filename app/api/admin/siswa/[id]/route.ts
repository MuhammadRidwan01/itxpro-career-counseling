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
    const { nama, kelasSaatIni, jurusan, status, tahunLulusTarget } = data

    const updateData: any = {}

    if (nama !== undefined) updateData.nama = nama
    if (kelasSaatIni !== undefined) updateData.kelasSaatIni = kelasSaatIni
    if (jurusan !== undefined) updateData.jurusan = jurusan
    if (status !== undefined) updateData.status = status
    if (tahunLulusTarget !== undefined) {
      updateData.tahunLulusTarget = tahunLulusTarget ? Number.parseInt(tahunLulusTarget) : null
    }

    const updatedSiswa = await prisma.siswa.update({
      where: { nis: id },
      data: updateData,
    })

    return NextResponse.json({ success: true, data: updatedSiswa })
  } catch (error) {
    console.error("Update siswa error:", error)
    return NextResponse.json({ success: false, message: "Terjadi kesalahan server" }, { status: 500 })
  }
}

export async function DELETE(
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

    await prisma.siswa.delete({
      where: { nis: id },
    })

    return NextResponse.json({ success: true, message: "Siswa berhasil dihapus" })
  } catch (error) {
    console.error("Delete siswa error:", error)
    return NextResponse.json({ success: false, message: "Terjadi kesalahan server" }, { status: 500 })
  }
}