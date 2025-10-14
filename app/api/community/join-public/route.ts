import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NEXT_AUTH } from "@/utils/auth";

export async function POST(req: NextRequest){
    const session = await getServerSession(NEXT_AUTH);
    if(!session?.user?.email){
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
    if(community.isPrivate) {
        return NextResponse.json({error: "Cannot join a private community"}, {status: 403});
    }
    const isMember = await prisma.communityMember.findFirst({
        where: {
            userId: user.id,
            spaceId: community.id
        }
    });
    if(isMember) {
        return NextResponse.json({error: "User is already a member"}, {status: 400});
    }

    await prisma.communityMember.create({
        data: {
            userId: user.id,
            spaceId: community.id,
            isApproved: true,
            joinMethod : "OPEN",  
            status : "ACTIVE",
            role : "MEMBER"    
        }
    });

    await prisma.communitySpaceRecentActivity.create({
        data: {
            spaceId: community.id,
            userId: user.id,
            activity : `${user.fullName} joined the community`,
        }
    });

    return NextResponse.json({message: "Successfully joined community"}, {status: 201});
} catch (error) {
    console.log(error);
    return NextResponse.json({error: "Internal Error"}, {status: 500});
}
}