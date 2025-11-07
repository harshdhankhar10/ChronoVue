"use client"
import React from 'react'
import { Users, FileText, MessageCircle, Heart, Eye, TrendingUp, Bookmark } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'

interface User {
    name: string | null
    email: string
}

interface Community {
    id: string
    name: string
    slug: string
    role: string
    memberCount: number
    postCount: number
    popularPosts: Array<{
        id: string
        title: string
        slug: string
        views: number
        _count: {
            comments: number
            likes: number
        }
    }>
}

interface UserPost {
    id: string
    title: string
    views: number
    comments: number
    slug: string
    likes: number
    community: string
    createdAt: Date
}

interface SavedPost {
    id: string
    title: string
    views: number
    comments: number
    likes: number
    community: string
    slug: string
    createdAt: Date
}

interface DashboardData {
    user: User
    communities: Community[]
    userPosts: UserPost[]
    savedPosts: SavedPost[]
}

const CommunityDashboard = ({ data }: { data: DashboardData }) => {
    const totalStats = {
        communities: data.communities.length,
        totalMembers: data.communities.reduce((sum, comm) => sum + comm.memberCount, 0),
        totalPosts: data.communities.reduce((sum, comm) => sum + comm.postCount, 0),
        yourPosts: data.userPosts.length,
        savedPosts: data.savedPosts.length
    }
    const router = useRouter();

    const actionsMenus = [
        {name : "Create Space", href: "/community/create-space"},
    ]

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 py-8">

              <div className="flex justify-between items-center mb-8">
                  <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Community Dashboard</h1>
                    <p className="text-gray-600">Manage your communities and track performance</p>
                </div>
                 <div className="mb-8 flex flex-wrap gap-3">
                    {actionsMenus.map((action) => (
                        <Button key={action.name} variant="outline" onClick={() => router.push(action.href)}>
                            {action.name}
                        </Button>
                    ))}
                </div>
              </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <div className="bg-white rounded-md border p-6 shadow-sm flex items-center justify-between">
                                <p className="text-sm font-medium text-gray-600 mb-1">Your Communities</p>
                                <p className="text-2xl font-bold text-gray-900">{totalStats.communities}</p>                            
                    </div>

                    <div className="bg-white rounded-xl border p-6 shadow-sm flex items-center justify-between">
                                <p className="text-sm font-medium text-gray-600 mb-1">Total Members</p>
                                <p className="text-2xl font-bold text-gray-900">{totalStats.totalMembers}</p>
                    </div>
                    <div className="bg-white rounded-xl border p-6 shadow-sm flex items-center justify-between">
                                <p className="text-sm font-medium text-gray-600 mb-1">Your Posts</p>
                                <p className="text-2xl font-bold text-gray-900">{totalStats.yourPosts}</p>
                    </div>

                    <div className="bg-white rounded-xl border p-6 shadow-sm flex items-center justify-between">    
                                <p className="text-sm font-medium text-gray-600 mb-1">Total Posts</p>
                                <p className="text-2xl font-bold text-gray-900">{totalStats.totalPosts}</p>
                    </div>

                </div>
                </div>
              

                <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 px-4">
                    <div className="bg-white rounded-xl border shadow-sm max-h-[600px] overflow-y-auto">
                        <div className="p-6 border-b">
                            <h2 className="text-xl font-semibold text-gray-900">Your Communities</h2>
                        </div>
                        <div className="p-6 space-y-4">
                            {data.communities.map((community) => (
                                <Link
                                    key={community.id}
                                    href={`/community/v/${community.slug}`}
                                    className="block p-4 border rounded-lg "
                                >
                                    <div className="flex items-center justify-between mb-3">
                                        <h3 className="font-semibold text-gray-900 text-lg">{community.name}</h3>
                                        <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                                            community.role === 'ADMIN' 
                                                ? 'bg-blue-100 text-blue-800 border border-blue-200' 
                                                : 'bg-gray-100 text-gray-700 border border-gray-200'
                                        }`}>
                                            {community.role.toLowerCase()}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-6 text-sm text-gray-600">
                                        <div className="flex items-center gap-2">
                                            <Users className="h-4 w-4" />
                                            <span>{community.memberCount} members</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <FileText className="h-4 w-4" />
                                            <span>{community.postCount} posts</span>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>

                    <div className="bg-white rounded-xl border shadow-sm max-h-[600px] overflow-y-auto">
                        <div className="p-6 border-b">
                            <h2 className="text-xl font-semibold text-gray-900">Your Posts</h2>
                        </div>
                        <div className="p-6 space-y-4">
                            {data.userPosts.slice(0, 5).map((post) => (
                                <div key={post.id} className="p-4 border rounded-lg ">
                                    <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 leading-tight">{post.title}</h3>
                                    <p className="text-sm text-gray-500 mb-3">in {post.community}</p>
                                    <div className="flex items-center gap-6 text-sm text-gray-600">
                                        <div className="flex items-center gap-2">
                                            <Eye className="h-4 w-4" />
                                            <span>{post.views}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <MessageCircle className="h-4 w-4" />
                                            <span>{post.comments}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Heart className="h-4 w-4" />
                                            <span>{post.likes}</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="bg-white rounded-xl border shadow-sm max-h-[600px] overflow-y-auto">
                        <div className="p-6 border-b">
                            <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                                <Bookmark className="h-5 w-5 text-purple-600" />
                                Saved Posts
                            </h2>
                        </div>
                        <div className="p-6 space-y-4">
                            {data.savedPosts.slice(0, 5).map((post) => (
                                <Link
                                    key={post.id}
                                    href={`/community/posts/v/${post.slug}`}
                                    className="block p-4 border rounded-lg "
                                >
                                    <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 leading-tight">{post.title}</h3>
                                    <p className="text-sm text-gray-500 mb-3">in {post.community}</p>
                                    <div className="flex items-center gap-6 text-sm text-gray-600">
                                        <div className="flex items-center gap-2">
                                            <Eye className="h-4 w-4" />
                                            <span>{post.views}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <MessageCircle className="h-4 w-4" />
                                            <span>{post.comments}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Heart className="h-4 w-4" />
                                            <span>{post.likes}</span>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="mt-8 mx-4 bg-white rounded-xl border shadow-sm">
                    <div className="p-6 border-b flex items-center justify-between">
                        <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                            <TrendingUp className="h-5 w-5 text-orange-600" />
                            Popular Posts in Your Communities
                        </h2>
                        <Button variant="outline" onClick={() => router.push('/community/my-spaces')}>
                            View All
                        </Button>
                    </div>
                    <div className="p-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {data.communities.flatMap(community => 
                                community.popularPosts.map(post => (
                                    <Link
                                        key={post.id}
                                        href={`/community/posts/v/${post.slug}`}
                                        className="block p-6 border rounded-xl "
                                    >
                                        <div className="flex items-start justify-between mb-3">
                                            <h3 className="font-semibold text-gray-900 line-clamp-2 leading-tight flex-1 mr-4">{post.title}</h3>
                                            <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded-full whitespace-nowrap">
                                                {community.name}
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-6 text-sm text-gray-600">
                                            <div className="flex items-center gap-2">
                                                <Eye className="h-4 w-4" />
                                                <span className="font-medium">{post.views} views</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <MessageCircle className="h-4 w-4" />
                                                <span>{post._count.comments} comments</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Heart className="h-4 w-4" />
                                                <span>{post._count.likes} likes</span>
                                            </div>
                                        </div>
                                    </Link>
                                ))
                            ).slice(0, 4)}
                        </div>
                    </div>
                </div>
            </div>
    )
}

export default CommunityDashboard