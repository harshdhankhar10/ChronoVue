import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { currentLoggedInUserInfo } from "@/lib/currentLoggedInUserInfo";

export async function PATCH(req: NextRequest) {
    const user = await currentLoggedInUserInfo();
    if (!user) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const {
            fullName,
            username,
            phoneNumber,
            profile
        } = await req.json();

        const updatedUser = await prisma.user.update({
            where: { email: user.email || '' },
            data: {
                fullName,
                username,
                phoneNumber,
            }});

            await prisma.profile.update({
                where: { userId: user.id || '' },
                data: {
                    bio: profile.bio,
                    location: profile.location,
                    careerStage: profile.carrerStage,
                    headline: profile.headline,
                    timezone: profile.timezone,
                }
            });

        return NextResponse.json({ message: "Your information has been updated successfully." }, { status: 200 });
        
    } catch (error) {
       return NextResponse.json({ error: "Failed to update user information." }, { status: 500 }); 
    }
}