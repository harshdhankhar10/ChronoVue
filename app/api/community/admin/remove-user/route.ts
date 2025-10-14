import {NextRequest, NextResponse} from "next/server";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NEXT_AUTH } from "@/utils/auth";

export async function POST(req: NextRequest){
    const session = await getServerSession(NEXT_AUTH);
    if(!session?.user){
        return NextResponse.json({error: "Unauthorized"}, {status: 401});
    }
    const user = await prisma.user.findUnique({
        where: { email: session.user.email }
    });
    const community = await prisma.communitySpace.findFirst({
        where: { ownerId: session.user.id }
    });
    if(!user){
        return NextResponse.json({error: "User not found"}, {status: 404});
    }
    if(!community){
        return NextResponse.json({error: "Only community owner can remove members"}, {status: 403});
    }
    try {
        const { memberId, communityId } = await req.json();
        if(typeof memberId !== "string" || typeof communityId !== "string"){
            return NextResponse.json({error: "Invalid data"}, {status: 400});
        }
        const membership = await prisma.communityMember.findFirst({
            where: {
                userId: memberId,
                spaceId: communityId,
            }
        });
        if(!membership){
            return NextResponse.json({error: "Membership not found"}, {status: 404});
        }

        if(membership.userId === user.id){
            return NextResponse.json({error: "Admins cannot remove themselves"}, {status: 403});
        }

        await prisma.communityMember.delete({
            where: { id: membership.id }
        });
        await prisma.communitySpaceRecentActivity.create({
            data : {
                activity : "A member was removed from the community",
                spaceId : communityId,
                userId : membership.userId,
            }
        });
        return NextResponse.json({message: "Member removed"}, {status: 201});

        
    } catch (error) {
        console.log(error)
        return NextResponse.json({error: "Internal Server Error"}, {status: 500});
    }
}