import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";


export async function POST(req:NextRequest){
    try {
        const { title, milestoneId } = await req.json();

        const subtask = await prisma.subTask.create({
            data: {
                title,
                mileStoneId: milestoneId
            }
        });

        return NextResponse.json({message: 'Subtask added successfully'}, {status: 201});
    } catch (error) {
        console.log(error);
        return NextResponse.json({error: 'Internal Server Error'}, {status: 500});
    }
}