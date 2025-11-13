import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { currentLoggedInUserInfo } from "@/lib/currentLoggedInUserInfo";


export async function POST(req:NextRequest){
    const user = await currentLoggedInUserInfo();
    if(!user){
        return NextResponse.json({error: 'Unauthorized'}, {status: 401})
    }
    try {
        const { title, description, targetDate, status, priority, tags, timelineID } = await req.json();
        if(title.trim() === '' || description.trim() === '' || !targetDate || !timelineID){
            return NextResponse.json({error: 'Please fill all the required fields'}, {status: 400})
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

        await prisma.creditUsage.create({
            data: {
                userId: user.id,
                creditsUsed: 5,
                type : 'ADD_MILESTONE',
                description: `Used 5 credits for adding a milestone on timeline ID: ${timelineID}`
            }
        })

        return NextResponse.json({message: 'Milestone added successfully'}, {status: 201})
        
    } catch (error) {
        console.log(error);
        return NextResponse.json({error: 'Internal Server Error'}, {status: 500})
    }
}