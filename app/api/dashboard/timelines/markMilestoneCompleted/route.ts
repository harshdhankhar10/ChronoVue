import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NEXT_AUTH } from "@/utils/auth";


export async function POST(req: NextRequest){
    const session = await getServerSession(NEXT_AUTH);
    if(!session){
        return NextResponse.json({message: 'Unauthorized'}, {status: 401});
    }
    const user = await prisma.user.findUnique({
        where: {
            email: session.user?.email
        }
    });
    try {
        const { milestoneId } = await req.json();
        if(!milestoneId || typeof milestoneId !== 'string'){
            return NextResponse.json({message: 'Bad Request'}, {status: 400});
        }
        const milestone = await prisma.mileStone.findUnique({
            where: {
                id: milestoneId
            }
        });
        if(!milestone || milestone.userId !== user?.id){
            return NextResponse.json({message: 'Not Found'}, {status: 404});
        }

        await prisma.mileStone.update({
            where: {
                id: milestoneId
            },
            data: {
                status: 'COMPLETED',
                targetDate: new Date()
            }
        });

        return NextResponse.json({message: 'Congrats! Milestone marked as completed'}, {status: 200});
    } catch (error) {
        console.log(error);
        return NextResponse.json({message: 'Internal Server Error'}, {status: 500});
    }
}