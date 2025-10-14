import { NextResponse, NextRequest } from "next/server";
import { getServerSession } from "next-auth";
import { NEXT_AUTH } from "@/utils/auth";
import prisma from "@/lib/prisma";

export async function POST(req: NextRequest){
    const session = await getServerSession(NEXT_AUTH);
    if (!session?.user) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    try {
     const { postId } = await req.json();
     if (!postId) {
        return NextResponse.json({ error: "Post ID is required" }, { status: 400 });
     }
     
     const existingSave = await prisma.postSave.findFirst({
        where: {
            postId,
            userId: session.user.id
        }
     });

     if(existingSave){
        await prisma.postSave.delete({
            where: {
                id: existingSave.id
            }
        });
        return NextResponse.json({ message: "Post Unsaved" }, { status: 201 });
     }     

     await prisma.postSave.create({
        data: {
            postId,
            userId: session.user.id
        }
     });
     return NextResponse.json({ message: "Post Saved" }, { status: 201 });

    } catch (error) {
        console.log(error);
        return NextResponse.json({error: "Internal Server Error"}, {status: 500});
    }
}