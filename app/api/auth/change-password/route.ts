import { NextResponse, NextRequest } from "next/server";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NEXT_AUTH } from "@/utils/auth";
import bcrypt from "bcryptjs";


export async function PATCH(request: NextRequest) {
  try {
    const session = await getServerSession(NEXT_AUTH);
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { oldPassword, newPassword } = await request.json();

    if (!oldPassword || !newPassword) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    const isValid = await bcrypt.compare(oldPassword, user.password);

    if (!isValid) {
      return NextResponse.json({ error: "Your old password is incorrect" }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await prisma.user.update({
      where: { email: session.user.email },
      data: { password: hashedPassword },
    });

    return NextResponse.json({ message: "Password changed successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error changing password:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}