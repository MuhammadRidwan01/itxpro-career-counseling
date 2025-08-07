import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const nisSiswa = searchParams.get("nisSiswa")

    let tujuanKarir

    if (nisSiswa) {
      tujuanKarir = await prisma.tujuanKarir.findMany({
        where: {
          nisSiswa: nisSiswa,
        },
        include: {
          siswa: {
            select: {
              nama: true,
              kelasSaatIni: true,
            },
          },
        },
      })
    } else {
      tujuanKarir = await prisma.tujuanKarir.findMany({
        include: {
          siswa: {
            select: {
              nama: true,
              kelasSaatIni: true,
            },
          },
        },
      })
    }

    return NextResponse.json({ success: true, data: tujuanKarir })
  } catch (error: any) {
    console.error("Error fetching career goals:", error)
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    )
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get("id")

    if (!id) {
      return NextResponse.json(
        { success: false, message: "ID Tujuan Karir diperlukan" },
        { status: 400 }
      )
    }

    await prisma.tujuanKarir.delete({
      where: {
        id: id,
      },
    })

    return NextResponse.json({ success: true, message: "Tujuan Karir berhasil dihapus" })
  } catch (error: any) {
    console.error("Error deleting career goal:", error)
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    )
  }
}