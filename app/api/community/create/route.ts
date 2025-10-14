import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { NEXT_AUTH } from "@/utils/auth";
import prisma from "@/lib/prisma";


export async function POST(req: NextRequest){
    const session = await getServerSession(NEXT_AUTH);
    if(!session?.user) {
        return NextResponse.json({error: 'Unauthorized'}, {status: 401});
    }
    let user;
    if(session){
        user = await prisma.user.findUnique({
        where: {
            email: session.user.email
        }
    });
    }
    try {
        const {name, description,privacy, category, rules} = await req.json();

        if(name.trim() === '' || description.trim() === '' || !category || !rules || rules.length === 0){
            return NextResponse.json({error: 'Missing required fields'}, {status: 400});
        }

        let slug = name.trim().toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9\-]/g, '');
        slug = slug + '-' + Math.floor(1000 + Math.random() * 9000).toString();

        await prisma.communitySpace.create({
            data: {
                name: name.trim(),
                description: description.trim(),
                isPrivate : privacy === 'private' ? true : false,
                category,
                rules,
                ownerId: user?.id as string,
                slug,
            }
        });

        await prisma.communityMember.create({
            data: {
                space: {connect: {slug} },
                user: {connect: {id: user?.id as string}},
                role: 'ADMIN',
                isApproved: true
            }
        });

        return NextResponse.json({message: 'Community created successfully', slug}, {status: 201});
    } catch (error) {
        console.log(error);
        return NextResponse.json({error: 'Internal server error'}, {status: 500});
    }
}