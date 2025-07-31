import { NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import { prisma } from "@/lib/prisma"
import { validateNIS } from "@/lib/utils"

export async function POST(request: Request) {
  try {
    const { nis, email, password } = await request.json()

    if (!validateNIS(nis)) {
      return NextResponse.json({ success: false, message: "Format NIS tidak valid" })
    }

    // Check if siswa exists and not registered yet
    const siswa = await prisma.siswa.findUnique({
      where: { nis },
      include: { user: true },
    })

    if (!siswa) {
      return NextResponse.json({ success: false, message: "NIS tidak ditemukan" })
    }

    if (siswa.user) {
      return NextResponse.json({ success: false, message: "NIS sudah terdaftar" })
    }

    // Check if email already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    })

    if (existingUser) {
      return NextResponse.json({ success: false, message: "Email sudah digunakan" })
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12)

    // Create user and update siswa
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        role: "STUDENT",
      },
    })

    await prisma.siswa.update({
      where: { nis },
      data: { email },
    })

    return NextResponse.json({ success: true, message: "Registrasi berhasil" })
  } catch (error) {
    console.error("Register error:", error)
    return NextResponse.json({ success: false, message: "Terjadi kesalahan server" })
  }
}
