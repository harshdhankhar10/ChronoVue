import React from 'react'
import { getServerSession } from 'next-auth'
import { NEXT_AUTH } from '@/utils/auth'
import { redirect } from 'next/navigation'
import prisma from '@/lib/prisma'
import Link from 'next/link'
import { Calendar, Clock, Eye, MessageCircle, Bookmark } from 'lucide-react'
import { Metadata } from 'next'
import { accessDenied } from '../timeline/page'

export const metadata: Metadata = {
    title: 'Saved Posts - ChronoVue Community',
    description: 'View and manage your saved posts on ChronoVue Community.',
}

const page = async() => {
    const session = await getServerSession(NEXT_AUTH)
    if (!session) {
        return (
            accessDenied
        )
    }

    const user = await prisma.user.findUnique({
        where: {
            email: session.user?.email || ''
        }
    })
    if (!user) {
        redirect('/signin')
    }

    const savedPosts = await prisma.postSave.findMany({
        where: {
            userId: user?.id,
        },
        include: {
            post: {
                include: {
                    author: {
                        select: {
                            fullName: true,
                        }
                    },
                    space: {
                        select: {
                            name: true,
                            slug: true,
                        }
                    },
                    _count: {
                        select: {
                            comments: true,
                            likes: true
                        }
                    }
                }
            }
        },
        orderBy: {
            createdAt: 'desc'
        }
    })

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-4xl mx-auto px-4">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Saved Posts</h1>
                    <p className="text-gray-600">Posts you've bookmarked for later</p>
                </div>

                {savedPosts.length === 0 ? (
                    <div className="bg-white rounded-xl border p-12 text-center">
                        <Bookmark className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">No saved posts</h3>
                        <p className="text-gray-600 mb-6">Posts you save will appear here for easy access.</p>
                        <Link 
                            href="/community"
                            className="px-6 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 inline-block"
                        >
                            Explore Communities
                        </Link>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {savedPosts.map((saved) => (
                            <Link
                                key={saved.id}
                                href={`/community/posts/v/${saved.post.slug}`}
                                className="block bg-white rounded-lg border p-6 "
                            >
                                <div className="flex items-start justify-between mb-3">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                                            <span className="text-orange-600 font-semibold text-sm">
                                                {saved.post.author.fullName!.charAt(0)}
                                            </span>
                                        </div>
                                        <div>
                                            <p className="font-medium text-gray-900">{saved.post.author.fullName}</p>
                                            <p className="text-sm text-gray-500">in {saved.post.space.name}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2 text-sm text-gray-500">
                                        <Calendar className="h-4 w-4" />
                                        <span>
                                            {new Date(saved.post.createdAt).toLocaleDateString()}
                                        </span>
                                    </div>
                                </div>

                                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                    {saved.post.title}
                                </h3>

                                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                                    {saved.post.content}
                                </p>

                                <div className="flex items-center justify-between text-sm text-gray-500">
                                    <div className="flex items-center gap-4">
                                        <div className="flex items-center gap-1">
                                            <Eye className="h-4 w-4" />
                                            <span>{saved.post.views} views</span>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <MessageCircle className="h-4 w-4" />
                                            <span>{saved.post._count.comments} comments</span>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <Clock className="h-4 w-4" />
                                            <span>{saved.post.readTime} min read</span>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-1 text-orange-600">
                                        <Bookmark className="h-4 w-4" />
                                        <span className="text-xs">Saved</span>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}

export default page