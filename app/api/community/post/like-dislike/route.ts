import { NextRequest, NextResponse } from "next/server";
import {getServerSession} from "next-auth";
import { NEXT_AUTH } from "@/utils/auth";
import prisma from "@/lib/prisma";

export async function POST(req: NextRequest){
    const session = await getServerSession(NEXT_AUTH);
    if(!session?.user){
        return NextResponse.json({error: "Unauthorized"}, {status: 401});
    }
    try {
     const { postId } = await req.json();
     if (!postId) {
        return NextResponse.json({ error: "Post ID is required" }, { status: 400 });
     }
        const existingLike = await prisma.postLike.findFirst({     
            where: {
                postId,
                userId: session.user.id,
            },
        });

        if (existingLike) {
            await prisma.postLike.delete({
                where: { id: existingLike.id },
            });
            return NextResponse.json({ message: "Post Disliked" }, { status: 201 });
        }

        await prisma.postLike.create({
            data: {
                postId,
                userId: session.user.id,
            },
        });
        return NextResponse.json({ message: "Post Liked" }, { status: 201 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({error: "Internal Server Error"}, {status: 500});
    }
}