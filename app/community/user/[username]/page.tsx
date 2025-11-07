import React from 'react'
import prisma from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { NEXT_AUTH } from '@/utils/auth'
import ViewUserProfile from '@/components/Community/ViewUserProfile'
import { Metadata } from 'next'

export async function generateMetadata({params}: any): Promise<Metadata> {
    const username = params.username
    const user = await prisma.user.findUnique({
        where: { username: username },
        select: { fullName: true, username: true }
    })
    if (!user) {
        return {
            title: 'User Not Found',
            description: 'The user you are looking for does not exist.'
        }
    }
    return {
        title: `${user.fullName} (@${user.username}) - Profile ChronoVue`,
        description: `View the profile of ${user.fullName} (@${user.username}) on ChronoVue.`
    }
}

const page = async({params}: any) => {
    const session = await getServerSession(NEXT_AUTH)
    const username = params.username

    const currentUserId = session?.user?.id

    const user = await prisma.user.findUnique({
        where: { username: username },
        include: {
            Profile: true,
            ownedSpaces: {
                include: {
                    _count: {
                        select: { members: true, posts: true }
                    }
                },
                take: 6
            },
            memberships: {
                include: {
                    space: {
                        include: {
                            _count: {
                                select: { members: true, posts: true }
                            }
                        }
                    }
                },
                where: { status: 'ACTIVE' }
            },
            posts: {
                where: { status: 'PUBLISHED' },
                include: {
                    space: { select: { name: true, slug: true } },
                    _count: {
                        select: { likes: true, comments: true }
                    }
                },
                orderBy: { createdAt: 'desc' },
                take: 8
            },
            _count: {
                select: {
                    posts: true,
                    memberships: true,
                    ownedSpaces: true
                }
            }
        }
    })

    if (!user) {
        return (
            <div className='flex flex-col items-center justify-center h-screen'>
                <h1 className='text-2xl font-bold mb-4'>User Not Found</h1>
                <p className='text-gray-600'>The user you are looking for does not exist.</p>
            </div>        
        )
    }

    const userData = {
        id: user.id,
        fullName: user.fullName,
        username: user.username,
        email: user.email,
        profilePicture: user.profilePicture,
        isVerified: user.isVerified,
        lastLogin: user.lastLogin?.toISOString(),
        createdAt: user.createdAt.toISOString(),
        profile: user.Profile ? {
            bio: user.Profile.bio,
            headline: user.Profile.headline,
            location: user.Profile.location,
            skills: user.Profile.skills,
            careerStage: user.Profile.careerStage
        } : null,
        stats: {
            totalPosts: user._count.posts,
            communitiesJoined: user._count.memberships,
            communitiesOwned: user._count.ownedSpaces
        },
        ownedCommunities: user.ownedSpaces.map(space => ({
            id: space.id,
            name: space.name,
            slug: space.slug,
            description: space.description,
            isPrivate: space.isPrivate,
            memberCount: space._count.members,
            postCount: space._count.posts
        })),
        joinedCommunities: user.memberships.map(membership => ({
            id: membership.space.id,
            name: membership.space.name,
            slug: membership.space.slug,
            role: membership.role,
            memberCount: membership.space._count.members,
            postCount: membership.space._count.posts
        })),
        recentPosts: user.posts.map(post => ({
            id: post.id,
            title: post.title,
            content: post.content,
            slug: post.slug,
            postType: post.postType,
            views: post.views,
            readTime: post.readTime,
            createdAt: post.createdAt.toISOString(),
            space: post.space,
            likes: post._count.likes,
            comments: post._count.comments
        }))
    }

    return <ViewUserProfile user={userData} currentUserId={currentUserId} />
}

export default page