import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { currentLoggedInUserInfo } from "@/lib/currentLoggedInUserInfo";

export async function POST(req: NextRequest) {
    const user = await currentLoggedInUserInfo();

    if (!user) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    if (user?.credits < 10) {
        return NextResponse.json({ error: "Insufficient credits. Minimum 10 credits required to create a timeline." }, { status: 403 });
    }
    try {
        const { timeline, milestones, action } = await req.json();

        if (!timeline.name || !timeline.duration || !timeline.category || !timeline.startDate || !timeline.risks || !timeline.resources) {
            return NextResponse.json({ error: "All fields are required!" }, { status: 400 })
        }
        


        if (action !== "FROM_GLOBAL_AI_INSIGHTS"  && milestones.length === 0) {
            return NextResponse.json({ error: "At least one milestone is required!" }, { status: 400 })
        }



        const timelineData = await prisma.timeline.create({
            data: {
                userId: user.id,
                name: timeline.name,
                category: timeline.category,
                duration: timeline.duration,
                risk_challanges: timeline.risks,
                startDate: timeline.startDate,
                resources_needed: timeline.resources,
                endDate: timeline.endDate,
            }
        })

        await prisma.mileStone.createMany({
            data: milestones.map((milestone: any) => ({
                timelineId: timelineData.id,
                title: milestone.title,
                description: milestone.description,
                targetDate: milestone.targetDate,
                status: milestone.status,
                priority: milestone.priority,
                tags: milestone.tags,
                userId: user.id,
            }))
        })

        await prisma.creditUsage.create({
            data: {
                userId: user.id,
                creditsUsed: 10,
                type: "TIMELINE_CREATION",
                description: "Used 10 credits for creating a new timeline"
            }
        });

        return NextResponse.json({ message: "Your timeline has been created successfully!" }, { status: 201 })


    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: "Something went wrong!" }, { status: 500 })
    }
}