import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== "STUDENT") {
    return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
  }

  const { oldPassword, newPassword } = await req.json();

  if (!oldPassword || !newPassword) {
    return NextResponse.json({ success: false, message: "Field tidak boleh kosong" }, { status: 400 });
  }

  const email = session.user.email;
  if (!email) {
    return NextResponse.json({ success: false, message: "Email tidak ditemukan di sesi." }, { status: 400 });
  }

  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    return NextResponse.json({ success: false, message: "User tidak ditemukan" }, { status: 404 });
  }

  const isMatch = await bcrypt.compare(oldPassword, user.password);
  if (!isMatch) {
    return NextResponse.json({ success: false, message: "Password lama salah" }, { status: 400 });
  }

  const hashed = await bcrypt.hash(newPassword, 10);

  await prisma.user.update({
    where: { email },
    data: { password: hashed },
  });

  return NextResponse.json({ success: true, message: "Password berhasil diubah" });
}
