import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NEXT_AUTH } from "@/utils/auth";
import { NextRequest, NextResponse } from "next/server";


export async function POST(req: NextRequest){
    const session = await getServerSession(NEXT_AUTH)
    if(!session) {
        return NextResponse.json({error: 'Unauthorized'}, {status: 401})
    }
    const user = await prisma.user.findUnique({
        where: { email: session.user?.email || undefined }
    })
    try {
        const { joinCode } = await req.json()
        if(!joinCode || typeof joinCode !== 'string') {
            return NextResponse.json({error: 'Invalid join code'}, {status: 400})
        }

        const community = await prisma.communitySpace.findFirst({
            where : {
                joinCode: joinCode
            }
        })
        if(!community) {
            return NextResponse.json({error: 'The Join Code you entered is invalid. Please check and try again.'}, {status: 400})
        }

        const isMember = await prisma.communityMember.findFirst({
            where: {
                userId: user?.id,
                spaceId: community.id
            }
        })
        if(isMember) {
            return NextResponse.json({error: 'User is already a member'}, {status: 400})
        }

        await prisma.communityMember.create({
            data: {
                userId: user?.id || '',
                spaceId: community.id,
                role: "MEMBER",
                joinMethod: "INVITE",
                isApproved : false
            }
        })

        

        return NextResponse.json({message: 'Request to join community sent successfully! Wait for Admin approval.'}, {status: 201})

    } catch (error) {
        return NextResponse.json({error: 'Internal Server Error'}, {status: 500})   
    }
}