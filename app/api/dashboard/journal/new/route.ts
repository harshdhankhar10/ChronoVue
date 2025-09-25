import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { NEXT_AUTH } from "@/utils/auth";
import prisma from "@/lib/prisma";
import { error } from "console";

export async function POST(req: NextRequest){
    const session = await getServerSession(NEXT_AUTH)
    if(!session){
        return NextResponse.json({error : "UnAuthorized!"}, {status : 400})
    }
    const user = session?.user;
    try {
        const {title, content, tags, mood} = await req.json();
        if(title.trim() === '' || content.trim() === ''){
            return NextResponse.json({error : "All Fields Required."}, {status : 400})
        }

        
        await prisma.journal.create({
            data : {
                title, content, tags, mood, userId : user.id
            }
        })

        return NextResponse.json({message : "Journal Saved Successfully"}, {status : 201})
        
    } catch (error) {
        console.log(error);
        return NextResponse.json({error : "Internal Server Error" }, {status : 400});
    }
}