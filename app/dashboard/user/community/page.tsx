import React from 'react'
import { getServerSession } from 'next-auth'
import { NEXT_AUTH } from '@/utils/auth'
import { redirect } from 'next/navigation'
import prisma from '@/lib/prisma'
import CommunityDashboard from './CommunityDashboard'

const page = async() => {
    const session = await getServerSession(NEXT_AUTH)
    if (!session?.user?.email) {
        redirect('/signin')
    }

    const user = await prisma.user.findUnique({
        where: { email: session.user.email },
    })
    if (!user) redirect('/signin')

    const userCommunities = await prisma.communityMember.findMany({
        where: { userId: user.id },
        include: {
            space: {
                include: {
                    _count: {
                        select: {
                            members: true,
                            posts: true
                        }
                    },
                    posts: {
                        include: {
                            _count: {
                                select: {
                                    comments: true,
                                    likes: true
                                }
                            }
                        },
                        orderBy: { views: 'desc' },
                        take: 5
                    }
                }
            }
        }
    })

    const userPosts = await prisma.createPost.findMany({
        where: { authorId: user.id },
        include: {
            space: {
                select: { name: true }
            },
            _count: {
                select: {
                    comments: true,
                    likes: true
                }
            }
        },
        orderBy: { createdAt: 'desc' }
    })

    const savedPosts = await prisma.postSave.findMany({
        where: { userId: user.id },
        include: {
            post: {
                include: {
                    space: {
                        select: { name: true }
                    },
                    _count: {
                        select: {
                            comments: true,
                            likes: true
                        }
                    }
                }
            }
        }
    })

    const dashboardData = {
        user: {
            name: user.fullName,
            email: user.email
        },
        communities: userCommunities.map(uc => ({
            id: uc.space.id,
            name: uc.space.name,
            slug: uc.space.slug,
            role: uc.role,
            
            memberCount: uc.space._count.members,
            postCount: uc.space._count.posts,
            popularPosts: uc.space.posts
        })),
        userPosts: userPosts.map(post => ({
            id: post.id,
            title: post.title,
            views: post.views,
            slug: post.slug,
            comments: post._count.comments,
            likes: post._count.likes,
            community: post.space.name,
            createdAt: post.createdAt
        })),
        savedPosts: savedPosts.map(sp => ({
            id: sp.post.id,
            title: sp.post.title,
            views: sp.post.views,
            slug: sp.post.slug,
            comments: sp.post._count.comments,
            likes: sp.post._count.likes,
            community: sp.post.space.name,
            createdAt: sp.post.createdAt
        }))
    }

    return <CommunityDashboard data={dashboardData} />
}

export default page