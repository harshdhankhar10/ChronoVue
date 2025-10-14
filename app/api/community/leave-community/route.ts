import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NEXT_AUTH } from "@/utils/auth";

export async function POST(req: NextRequest) {
    const session = await getServerSession(NEXT_AUTH);
    if(!session){
        return NextResponse.json({error: "Unauthorized"}, {status: 401});
    }
    try {
    const {communityId} = await req.json();
    if(!communityId || typeof communityId !== "string"){
        return NextResponse.json({error: "Invalid community ID"}, {status: 400});
    }

    const user = await prisma.user.findUnique({
        where: {email: session.user.email}
    });    
    if(!user) {
        return NextResponse.json({error: "User not found"}, {status: 404});
    }
    const community = await prisma.communitySpace.findUnique({
        where: {id: communityId}
    });
    if(!community) {
        return NextResponse.json({error: "Community not found"}, {status: 404});
    }

    const isMember = await prisma.communityMember.findFirst({
        where : {
            spaceId : communityId
        }
    })
    if(!isMember){
        return NextResponse.json({error: "User is not a member of this community"}, {status: 404});
    }

    await prisma.communityMember.deleteMany({
        where: {
            userId: user.id,
            spaceId: communityId
        }
    });

    await prisma.communitySpaceRecentActivity.create({
        data: {
            spaceId: communityId,
            activity : `${user.fullName} has left the community.`,
            userId: user.id
        }
    })

    return NextResponse.json({message: "Left community successfully"}, {status: 200});

        
    } catch (error) {
    console.log(error);
    return NextResponse.json({error: "Internal Error"}, {status: 500});

    }
}