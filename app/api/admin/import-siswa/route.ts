import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { extractAngkatanFromNIS } from "@/lib/utils"

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session || session.user.role !== "ADMIN") {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 })
    }

    const { siswaData } = await request.json()

    const results = []

    for (const data of siswaData) {
      try {
        const angkatan = extractAngkatanFromNIS(data.nis)

        const siswa = await prisma.siswa.upsert({
          where: { nis: data.nis },
          update: {
            nama: data.nama,
            kelasSaatIni: data.kelas,
            angkatan,
          },
          create: {
            nis: data.nis,
            nama: data.nama,
            email: `${data.nis}@temp.itxpro.sch.id`, // Temporary email
            kelasSaatIni: data.kelas,
            angkatan,
          },
        })

        results.push({ success: true, nis: data.nis, nama: data.nama })
      } catch (error) {
        results.push({ success: false, nis: data.nis, error: error.message })
      }
    }

    return NextResponse.json({ success: true, results })
  } catch (error) {
    console.error("Import error:", error)
    return NextResponse.json({ success: false, message: "Terjadi kesalahan server" })
  }
}
