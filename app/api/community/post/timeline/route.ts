import { NextResponse, NextRequest } from "next/server";
import { getServerSession } from "next-auth";
import { NEXT_AUTH } from "@/utils/auth";
import prisma from "@/lib/prisma";


export async function POST(req: NextRequest){
    const session = await getServerSession(NEXT_AUTH)

    if(!session){
        return NextResponse.json({error: 'Unauthorized'}, {status: 401})
    }
    const user = await prisma.user.findUnique({
        where: {
            email: session.user?.email || ''
        }
    })
    if(!user){
        return NextResponse.json({error: 'Unauthorized'}, {status: 401})
    }
    try {
        const { timelineId, communityId } = await req.json();
        if(!timelineId || typeof timelineId !== 'string'){
            return NextResponse.json({error: 'Bad Request'}, {status: 400})
        }

        const timeline = await prisma.timeline.findFirst({
            where: {
                id: timelineId,
                userId: user.id
            },
            include : {
                milestones: true
            }
        })
        if(!timeline){
            return NextResponse.json({error: 'Timeline Not Found'}, {status: 404})
        }

        const community  = await prisma.communitySpace.findFirst({
            where: {
                id: communityId 
            }
        })
        if(!community){
            return NextResponse.json({error: 'Community Not Found'}, {status: 404})
        }

        let slug = timeline.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
        slug = slug + '-' + Math.floor(1000 + Math.random() * 9000).toString();

        let timelineData = {
            name : timeline.name,
            category : timeline.category,
            duration : timeline.duration,
            startDate : timeline.startDate,
            endDate : timeline.endDate,
            risk_challanges : timeline.risk_challanges,
            resources : timeline.resources_needed,
            ai_suggestions : timeline.ai_suggestions,
        }

        let mileStoneData = timeline.milestones.map(milestone => ({
            title : milestone.title,
            description : milestone.description,
            targetDate : milestone.targetDate,
            status : milestone.status,
        }))


        await prisma.createPost.create({
            data : {
                title : timeline.name,
                content : "Thrilled to share my timeline!",
                category : timeline.category,
                readTime : Math.max(1, Math.floor(timeline.milestones.length / 3)),
                slug,
                attachments : [],
                authorId : user.id,
                spaceId : community.id,
                postType : "TIMELINE",
                status : "PUBLISHED",
                timelineData,
                mileStoneData
            }
        })

        return NextResponse.json({message: 'Timeline Shared Successfully'}, {status: 201})

    } catch (error) {
        console.log(error)
        return NextResponse.json({error: 'Internal Server Error'}, {status: 500})
    }
}