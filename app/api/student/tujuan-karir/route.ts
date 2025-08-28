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
          ptn1: data.kategoriUtama === "kuliah" ? data.ptn1 || null : null,
          jurusan1: data.kategoriUtama === "kuliah" ? data.jurusan1 || null : null,
          ptn2: data.kategoriUtama === "kuliah" ? data.ptn2 || null : null,
          jurusan2: data.kategoriUtama === "kuliah" ? data.jurusan2 || null : null,
          ptn3: data.kategoriUtama === "kuliah" ? data.ptn3 || null : null,
          jurusan3: data.kategoriUtama === "kuliah" ? data.jurusan3 || null : null,
          detailBekerja: data.kategoriUtama === "bekerja" ? data.detailBekerja || null : null,
          detailWirausaha: data.kategoriUtama === "wirausaha" ? data.detailWirausaha || null : null,
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
          ptn1: data.kategoriUtama === "kuliah" ? data.ptn1 || null : null,
          jurusan1: data.kategoriUtama === "kuliah" ? data.jurusan1 || null : null,
          ptn2: data.kategoriUtama === "kuliah" ? data.ptn2 || null : null,
          jurusan2: data.kategoriUtama === "kuliah" ? data.jurusan2 || null : null,
          ptn3: data.kategoriUtama === "kuliah" ? data.ptn3 || null : null,
          jurusan3: data.kategoriUtama === "kuliah" ? data.jurusan3 || null : null,
          detailBekerja: data.kategoriUtama === "bekerja" ? data.detailBekerja || null : null,
          detailWirausaha: data.kategoriUtama === "wirausaha" ? data.detailWirausaha || null : null,
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
