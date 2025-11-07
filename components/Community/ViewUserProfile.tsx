"use client"
import React from 'react'
import { Users, FileText, MessageCircle, Heart, Eye, Calendar, MapPin, Building, Award, Shield } from 'lucide-react'
import Link from 'next/link'

interface User {
    id: string
    fullName: string | null
    username: string
    email: string
    profilePicture: string
    isVerified: boolean
    createdAt: string
    profile: {
        bio: string | null
        headline: string | null
        location: string | null
        skills: string[]
        careerStage: string | null
    } | null
    stats: {
        totalPosts: number
        communitiesJoined: number
        communitiesOwned: number
    }
    ownedCommunities: Array<{
        id: string
        name: string
        slug: string
        description: string
        isPrivate: boolean
        memberCount: number
        postCount: number
    }>
    joinedCommunities: Array<{
        id: string
        name: string
        slug: string
        role: string
        memberCount: number
        postCount: number
    }>
    recentPosts: Array<{
        id: string
        title: string
        content: string
        slug: string
        postType: string
        views: number
        readTime: number
        createdAt: string
        space: {
            name: string
            slug: string
        }
        likes: number
        comments: number
    }>
}

interface ViewUserProfileProps {
    user: User
    currentUserId: string | undefined
}

const ViewUserProfile: React.FC<ViewUserProfileProps> = ({ user, currentUserId }) => {
    const isOwnProfile = currentUserId === user.id

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        })
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="">
                <div className="bg-white rounded-xl border  mb-8">
                    <div className="p-8">
                        <div className="flex flex-col md:flex-row items-start gap-6">
                            <img
                                src={user.profilePicture}
                                alt={user.fullName || user.username}
                                className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-lg"
                            />
                            <div className="flex-1">
                                <div className="flex items-center gap-3 mb-2">
                                    <h1 className="text-3xl font-bold text-gray-900">
                                        {user.fullName || user.username}
                                    </h1>
                                </div>
                                
                                <p className="text-gray-600 text-lg mb-3">@{user.username}</p>
                                
                                {user.profile?.headline && (
                                    <p className="text-gray-700 text-lg font-medium mb-4">
                                        {user.profile.headline}
                                    </p>
                                )}

                                <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-4">
                                    {user.profile?.location && (
                                        <div className="flex items-center gap-1">
                                            <MapPin className="h-4 w-4" />
                                            <span>{user.profile.location}</span>
                                        </div>
                                    )}
                                    <div className="flex items-center gap-1">
                                        <Calendar className="h-4 w-4" />
                                        <span>Joined {formatDate(user.createdAt)}</span>
                                    </div>
                                </div>

                                {user.profile?.bio && (
                                    <p className="text-gray-700 leading-relaxed">
                                        {user.profile.bio}
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="space-y-6">
                        <div className="bg-white rounded-xl border  p-6">
                            <h2 className="text-xl font-semibold text-gray-900 mb-4">Activity Stats</h2>
                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 bg-blue-100 rounded-lg">
                                            <FileText className="h-5 w-5 text-blue-600" />
                                        </div>
                                        <div>
                                            <p className="font-medium text-gray-900">Posts</p>
                                            <p className="text-2xl font-bold text-gray-900">{user.stats.totalPosts}</p>
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 bg-green-100 rounded-lg">
                                            <Users className="h-5 w-5 text-green-600" />
                                        </div>
                                        <div>
                                            <p className="font-medium text-gray-900">Communities</p>
                                            <p className="text-2xl font-bold text-gray-900">{user.stats.communitiesJoined}</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 bg-orange-100 rounded-lg">
                                            <Building className="h-5 w-5 text-orange-600" />
                                        </div>
                                        <div>
                                            <p className="font-medium text-gray-900">Owned</p>
                                            <p className="text-2xl font-bold text-gray-900">{user.stats.communitiesOwned}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {user.profile?.skills && user.profile.skills.length > 0 && (
                            <div className="bg-white rounded-xl border p-6">
                                <h2 className="text-xl font-semibold text-gray-900 mb-4">Skills</h2>
                                <div className="flex flex-wrap gap-2">
                                    {user.profile.skills.map((skill, index) => (
                                        <span
                                            key={index}
                                            className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full border"
                                        >
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}

                        {user.ownedCommunities.length > 0 && (
                            <div className="bg-white rounded-xl border p-6">
                                <h2 className="text-xl font-semibold text-gray-900 mb-4">Owned Communities</h2>
                                <div className="space-y-3">
                                    {user.ownedCommunities.slice(0, 3).map((community) => (
                                        <Link
                                            key={community.id}
                                            href={`/community/v/${community.slug}`}
                                            className="block p-3 border rounded-lg hover:border-blue-500 transition-colors"
                                        >
                                            <div className="flex items-center justify-between mb-1">
                                                <h3 className="font-semibold text-gray-900">{community.name}</h3>
                                                {community.isPrivate && (
                                                    <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                                                        Private
                                                    </span>
                                                )}
                                            </div>
                                            <div className="flex items-center gap-4 text-xs text-gray-600">
                                                <div className="flex items-center gap-1">
                                                    <Users className="h-3 w-3" />
                                                    <span>{community.memberCount} members</span>
                                                </div>
                                                <div className="flex items-center gap-1">
                                                    <FileText className="h-3 w-3" />
                                                    <span>{community.postCount} posts</span>
                                                </div>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="lg:col-span-2">
                        <div className="bg-white rounded-xl border">
                            <div className="p-6 border-b">
                                <h2 className="text-xl font-semibold text-gray-900">Recent Posts</h2>
                            </div>
                            
                            <div className="p-6">
                                {user.recentPosts.length === 0 ? (
                                    <div className="text-center py-8 text-gray-500">
                                        <FileText className="h-12 w-12 mx-auto mb-3 text-gray-300" />
                                        <p>No posts yet</p>
                                    </div>
                                ) : (
                                    <div className="space-y-4">
                                        {user.recentPosts.map((post) => (
                                            <Link
                                                key={post.id}
                                                href={`/community/posts/v/${post.slug}`}
                                                className="block p-4 border rounded-lg hover:shadow-md transition-shadow"
                                            >
                                                <div className="flex items-start justify-between mb-2">
                                                    <h3 className="font-semibold text-gray-900 line-clamp-2 flex-1">
                                                        {post.title}
                                                    </h3>
                                                    <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded ml-2">
                                                        {post.postType.toLowerCase()}
                                                    </span>
                                                </div>
                                                
                                                <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                                                    {post.content}
                                                </p>

                                                <div className="flex items-center justify-between text-sm text-gray-500">
                                                    <div className="flex items-center gap-4">
                                                        <div className="flex items-center gap-1">
                                                            <Eye className="h-4 w-4" />
                                                            <span>{post.views}</span>
                                                        </div>
                                                        <div className="flex items-center gap-1">
                                                            <Heart className="h-4 w-4" />
                                                            <span>{post.likes}</span>
                                                        </div>
                                                        <div className="flex items-center gap-1">
                                                            <MessageCircle className="h-4 w-4" />
                                                            <span>{post.comments}</span>
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <span className="text-xs">{post.readTime} min read</span>
                                                        <span className="text-xs">in {post.space.name}</span>
                                                    </div>
                                                </div>
                                            </Link>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ViewUserProfile