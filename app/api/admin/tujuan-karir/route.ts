import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const nisSiswa = searchParams.get("nisSiswa")
    const limit = searchParams.get("limit") ? Number(searchParams.get("limit")) : undefined
    const orderBy = searchParams.get("orderBy") || "createdAt:desc" // Default to most recent

    let findManyArgs: any = {
      include: {
        siswa: {
          select: {
            nama: true,
            kelasSaatIni: true,
          },
        },
      },
      orderBy: {
        [orderBy.split(":")[0]]: orderBy.split(":")[1],
      },
      take: limit,
    }

    if (nisSiswa) {
      findManyArgs.where = {
        nisSiswa: nisSiswa,
      }
    }

    const tujuanKarir = await prisma.tujuanKarir.findMany(findManyArgs)

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