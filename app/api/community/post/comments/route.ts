import { NextResponse, NextRequest } from "next/server";
import { getServerSession } from "next-auth";
import { NEXT_AUTH } from "@/utils/auth";
import prisma from "@/lib/prisma";


export async function POST(req: NextRequest){
    const session = await getServerSession(NEXT_AUTH);
    if(!session?.user){
        return NextResponse.json({error: "Unauthorized"}, {status: 401});
    }
    try {
     const {postId, content} = await req.json();
     if(!postId || !content){
        return NextResponse.json({error: "Post ID and content are required"}, {status: 400});
     }
     await prisma.postComment.create({
        data : {
            content,
            postId,
            userId: session.user.id
        }
     })   

        return NextResponse.json({message: "Comment Added"}, {status: 201});
    } catch (error) {
        console.log(error);
        return NextResponse.json({error: "Internal Server Error"}, {status: 500});
    }
}