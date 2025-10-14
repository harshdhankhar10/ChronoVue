import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NEXT_AUTH } from "@/utils/auth";

export async function POST(req: NextRequest){
    const session = await getServerSession(NEXT_AUTH);
    const userId = session?.user?.id;
    if(!session || !userId){
            return NextResponse.json({error: 'Unauthorized'}, {status: 401});
    }
    try {
        const { title, content, tags, communityId, coverImageType, coverImageUrl, isCommentsEnabled, status, category } = await req.json();
        if(!title || !content || !communityId || !status){
            return NextResponse.json({error: 'All fields are required'}, {status: 400});
        }
        const isCommunityIDValid = await prisma.communitySpace.findUnique({
            where: { id: communityId }
        });
        if(!isCommunityIDValid){
            return NextResponse.json({error: 'Invalid Community ID'}, {status: 400});
        }

        const isMember = await prisma.communityMember.findFirst({
            where: {
                spaceId: communityId,
                userId: userId
            }
        });

        if(!isMember){
            return NextResponse.json({error: 'You are not a member of this community'}, {status: 403});
        }

        let slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
        slug = slug + '-' + Math.floor(1000 + Math.random() * 9000).toString();


        let attachments = {
            type: coverImageType,
            url: coverImageUrl
        }

        const newPost = await prisma.createPost.create({
            data: {
                title,
                content,
                tags,
                spaceId: communityId,
                authorId: userId,
                attachments: (coverImageUrl && coverImageType) ? [attachments] : [],
                isCommentsEnabled,
                status : 'PUBLISHED',
                readTime: Math.ceil(content.split(' ').length / 200),
                slug,
                category

            }
        });
        await prisma.communitySpaceRecentActivity.create({
            data : {
                activity : `Exciting news! A new post titled - "${title}" has just been published!`,
                spaceId : communityId,
                userId : userId
            }
        });

        

        return NextResponse.json({message: 'Post created successfully', slug: newPost.slug}, {status: 201});

        
    } catch (error) {
        console.log(error);
        return NextResponse.json({error: 'Internal Server Error'}, {status: 500});
    }
}