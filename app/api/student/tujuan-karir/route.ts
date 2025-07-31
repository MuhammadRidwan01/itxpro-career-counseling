import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session || session.user.role !== "STUDENT") {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 })
    }

    // Get student data
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      include: { siswa: true },
    })

    if (!user?.siswa) {
      return NextResponse.json({ success: false, message: "Data siswa tidak ditemukan" })
    }

    // Check if already submitted
    if (user.siswa.tujuanKarirSubmitted) {
      return NextResponse.json({ success: false, message: "Tujuan karir sudah pernah diisi" })
    }

    const data = await request.json()

    // Create tujuan karir
    await prisma.tujuanKarir.create({
      data: {
        nisSiswa: user.siswa.nis,
        kategoriUtama: data.kategoriUtama,
        ptn1: data.ptn1 || null,
        jurusan1: data.jurusan1 || null,
        ptn2: data.ptn2 || null,
        jurusan2: data.jurusan2 || null,
        ptn3: data.ptn3 || null,
        jurusan3: data.jurusan3 || null,
        detailBekerja: data.detailBekerja || null,
        detailWirausaha: data.detailWirausaha || null,
      },
    })

    // Update siswa status
    await prisma.siswa.update({
      where: { nis: user.siswa.nis },
      data: { tujuanKarirSubmitted: true },
    })

    return NextResponse.json({ success: true, message: "Tujuan karir berhasil disimpan" })
  } catch (error) {
    console.error("Save tujuan karir error:", error)
    return NextResponse.json({ success: false, message: "Terjadi kesalahan server" })
  }
}
