import { getServerSession } from "next-auth";
import { NEXT_AUTH } from "@/utils/auth";
import prisma from "@/lib/prisma";

export async function isAdmin() {
  const session = await getServerSession(NEXT_AUTH);
  if (!session) return false;

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: { role: true },
  });

  return user?.role === "ADMIN";
}

export async function isLoggedIn() {
  const session = await getServerSession(NEXT_AUTH);
  return !!session;
}