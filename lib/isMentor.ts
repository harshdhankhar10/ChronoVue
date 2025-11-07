import { getServerSession } from "next-auth";
import { NEXT_AUTH } from "@/utils/auth";
import prisma from "@/lib/prisma";

export async function isMentor() {
  const session = await getServerSession(NEXT_AUTH);
  if (!session) return false;

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: { isMentor: true },
  });

  return user?.isMentor || false;
}

export async function isLoggedIn() {
  const session = await getServerSession(NEXT_AUTH);
  return !!session;
}