import {NextRequest, NextResponse} from "next/server";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NEXT_AUTH } from "@/utils/auth";


export async function PATCH(req: NextRequest){
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
        return NextResponse.json({error: "Only community owner can approve joining requests"}, {status: 403});
    }

    try {
        const { memberId, isApproved, communityId } = await req.json();
        if(typeof memberId !== "string" || typeof isApproved !== "boolean" || typeof communityId !== "string"){
            return NextResponse.json({error: "Invalid data"}, {status: 400});
        }
        const membership = await prisma.communityMember.findFirst({
            where: {
                userId: memberId,
                spaceId: communityId,
                isApproved : false
            }
        });
        if(!membership){
            return NextResponse.json({error: "Membership request not found"}, {status: 404});
        }

        const user = await prisma.user.findUnique({
            where: { id: memberId }
        });

        if(isApproved){
            await prisma.communityMember.update({
                where: { id: membership.id },
                data: { isApproved: true }
            });

            await prisma.communitySpaceRecentActivity.create({
                data : {
                    activity : `${user?.fullName} has joined the community.`,
                    spaceId : communityId,
                    userId : memberId
                }
            });

            return NextResponse.json({message: "Membership approved"}, {status: 201});
        }

        if(!isApproved){
            await prisma.communityMember.delete({
                where: { id: membership.id }
            });
            return NextResponse.json({message: "Membership rejected"}, {status: 201});
        }


        
    } catch (error) {
        console.error("Error approving/rejecting membership:", error);
        return NextResponse.json({error: "Internal Server Error"}, {status: 500});
    }
}