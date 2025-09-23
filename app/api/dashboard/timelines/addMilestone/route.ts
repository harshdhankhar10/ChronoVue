import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NEXT_AUTH } from "@/utils/auth";


export async function POST(req:NextRequest){
    const session = await getServerSession(NEXT_AUTH)
    if(!session){
        return NextResponse.json({error: 'Unauthorized'}, {status: 401})
    }
    try {
        const { title, description, targetDate, status, priority, tags, timelineID } = await req.json();
        if(title.trim() === '' || description.trim() === '' || !targetDate || !timelineID){
            return NextResponse.json({error: 'Please fill all the required fields'}, {status: 400})
        }

        const user = await prisma.user.findUnique({
            where: {
                email: session?.user?.email || ''
            },
        })

        if (!user) {
            return NextResponse.json({error: 'User not found'}, {status: 404})
        }

        await prisma.mileStone.create({
            data: {
                title,
                description,
                targetDate: new Date(targetDate),
                status,
                priority,
                tags,
                timelineId: timelineID,
                userId: user.id
            }
        })

        return NextResponse.json({message: 'Milestone added successfully'}, {status: 201})
        
    } catch (error) {
        console.log(error);
        return NextResponse.json({error: 'Internal Server Error'}, {status: 500})
    }
}