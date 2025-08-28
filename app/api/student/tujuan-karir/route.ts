import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export async function GET() {
  try {
    const session = await getServerSession(authOptions)

    if (!session || session.user.role !== "STUDENT") {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 })
    }

    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      include: { siswa: true },
    })

    if (!user?.siswa) {
      return NextResponse.json({ success: false, message: "Data siswa tidak ditemukan" }, { status: 404 })
    }

    const tujuanKarir = await prisma.tujuanKarir.findUnique({
      where: { nisSiswa: user.siswa.nis },
    })

    return NextResponse.json({ success: true, data: tujuanKarir })
  } catch (error) {
    console.error("Get tujuan karir error:", error)
    return NextResponse.json({ success: false, message: "Terjadi kesalahan server" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session || session.user.role !== "STUDENT") {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 })
    }

    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      include: { siswa: true },
    })

    if (!user?.siswa) {
      return NextResponse.json({ success: false, message: "Data siswa tidak ditemukan" }, { status: 404 })
    }

    const data = await request.json()

    const existingTujuanKarir = await prisma.tujuanKarir.findUnique({
      where: { nisSiswa: user.siswa.nis },
    })

    if (existingTujuanKarir) {
      // Update existing record
      await prisma.tujuanKarir.update({
        where: { nisSiswa: user.siswa.nis },
        data: {
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
      if (!user.siswa.tujuanKarirSubmitted) {
        await prisma.siswa.update({
          where: { nis: user.siswa.nis },
          data: { tujuanKarirSubmitted: true },
        })
      }
      return NextResponse.json({ success: true, message: "Tujuan karir berhasil diperbarui" })
    } else {
      // Create new record
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
      await prisma.siswa.update({
        where: { nis: user.siswa.nis },
        data: { tujuanKarirSubmitted: true },
      })
      return NextResponse.json({ success: true, message: "Tujuan karir berhasil disimpan" })
    }
  } catch (error) {
    console.error("Save/Update tujuan karir error:", error)
    return NextResponse.json({ success: false, message: "Terjadi kesalahan server" }, { status: 500 })
  }
}
