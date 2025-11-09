import { NextResponse, NextRequest } from "next/server";
import { getServerSession } from "next-auth";
import { NEXT_AUTH } from "@/utils/auth";
import prisma from "@/lib/prisma";

export async function PATCH(request: NextRequest) {
  try {
    const session = await getServerSession(NEXT_AUTH);
    if (!session?.user?.email) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }
    const { imageUrl } = await request.json();

    await prisma.user.update({
      where: { email: session.user.email },
      data: { profilePicture: imageUrl }
    });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error updating profile picture:', error);
    return NextResponse.json({ success: false, message: 'Internal Server Error' }, { status: 500 });
  }
}