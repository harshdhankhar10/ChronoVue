import React from 'react'
import prisma from '@/lib/prisma'
import Link from 'next/link'
import { Users, MessageCircle, Shield, Calendar } from 'lucide-react'
import { getServerSession } from 'next-auth'
import { NEXT_AUTH } from '@/utils/auth'
import { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Discover Communities - ChronoVue',
    description: 'Explore verified public communities and trending discussions on our platform.',
} 

const page = async() => {
    const session = await getServerSession(NEXT_AUTH)
    let isAuthenticated = false;
    if(session) isAuthenticated = true;
    
    
    const communities = await prisma.communitySpace.findMany({
        where : {
            isPrivate : false,
            isVerified : true,     
        },
        include: {
            owner: {
                select: {
                    fullName: true,
                }
            },
            _count: {
                select: {
                    members: true,
                    posts: true
                }
            }
        },
        orderBy : {
            createdAt : 'desc'
        },
    })

    const trendingPosts = await prisma.createPost.findMany({
        where : {
            status : 'PUBLISHED',
        },
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
        },
        orderBy: {
            views: 'desc'
        },
        take: 6
    })

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Discover Communities
          </h1>
          <p className="text-xl text-gray-600">
            Explore verified public communities and trending discussions
          </p>
        </div>

        <section className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-gray-900">Verified Communities</h2>
            <div className="flex items-center gap-2 text-orange-600">
              <Shield className="h-5 w-5" />
              <span className="font-medium">All Verified</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {communities.map((community) => (
              <Link 
                key={community.id}
                href={`/community/v/${community.slug}`}
                className="bg-white rounded-xl border p-6 block"
              >
                <div className="flex items-start justify-between mb-4">
                  <h3 className="font-semibold text-lg text-gray-900">{community.name}</h3>
                </div>
                
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {community.description}
                </p>

                <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
                  <div className="flex items-center gap-1">
                    <Users className="h-4 w-4" />
                    <span>{community._count.members} members</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MessageCircle className="h-4 w-4" />
                    <span>{community._count.posts} posts</span>
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span>By {community.owner.fullName}</span>
                  <span className="capitalize bg-gray-100 px-2 py-1 rounded">
                    {community.category}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <section>
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-gray-900">Trending Posts</h2>
            <div className="text-orange-600 font-medium">
              Most Viewed
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {trendingPosts.map((post) => (
              <Link
                key={post.id}
                href={`/community/posts/v/${post.slug}`}
                className="bg-white rounded-xl border p-6  block"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                    <span className="text-orange-600 font-semibold text-sm">
                      {post.author.fullName!.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 text-sm">{post.author.fullName}</p>
                    <p className="text-xs text-gray-500">in {post.space.name}</p>
                  </div>
                </div>

                <h3 className="font-semibold text-gray-900 mb-3 line-clamp-2">
                  {post.title}
                </h3>

                <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                  {post.content}
                </p>

                <div className="flex items-center justify-between text-xs text-gray-500">
                  <div className="flex items-center gap-4">
                    <span>{post.views} views</span>
                    <span>{post._count.comments} comments</span>
                    <span>{post._count.likes} likes</span>
                  </div>
                  <span className="bg-gray-100 px-2 py-1 rounded">
                    {Math.ceil(post.content.length / 200)} min read
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {communities.length === 0 && (
          <div className="text-center py-12">
            <Shield className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No Communities Found</h3>
            <p className="text-gray-600">There are no verified public communities at the moment.</p>
          </div>
        )}

        {trendingPosts.length === 0 && communities.length > 0 && (
          <div className="text-center py-8">
            <MessageCircle className="h-12 w-12 text-gray-300 mx-auto mb-3" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No Trending Posts</h3>
            <p className="text-gray-600">Be the first to start a discussion in these communities!</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default page