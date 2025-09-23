import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";


export async function POST(req:NextRequest){
    try {
        const { note, milestoneId } = await req.json();

        const reflection = await prisma.reflection.create({
            data: {
                note,
                mileStoneId: milestoneId
            }
        });

        return NextResponse.json({message: 'Reflection added successfully'}, {status: 201});
    } catch (error) {
        console.log(error);
        return NextResponse.json({error: 'Internal Server Error'}, {status: 500});
    }
}