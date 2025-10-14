import React from 'react'
import prisma from '@/lib/prisma'
import ViewCommunity from '@/components/Community/ViewCommunity';
import { getServerSession } from 'next-auth';
import { NEXT_AUTH } from '@/utils/auth';
import { Metadata } from 'next';


export async function generateMetadata({ params }: any): Promise<Metadata> {
  const community = await prisma.communitySpace.findUnique({
    where: { slug: params.slug },
  });

  if (!community) {
    return {
      title: 'Community Not Found',
      description: 'The community you are looking for does not exist.',
    };
  }

  return {
    title: community.name,
    description: `Join the ${community.name} community on ChronoVue! Connect, share, and engage with like-minded individuals.`,
  };
}

const page = async ({ params }: { params: { slug: string } }) => {
  const community = await prisma.communitySpace.findUnique({
    where: { slug: params.slug },
    include: {
      owner: {
        select: {
          id: true,
          fullName: true,
          email: true,
        }
      },
      recentActivities : {
        orderBy : { createdAt : 'desc'},
      },
      members: {
        include: {
          user: {
            select: {
              id: true,
              fullName: true,
              email: true,
            }
          }
        }
      }
    }
  });

  const session = await getServerSession(NEXT_AUTH);
  const userId = session?.user?.id;

  const posts = await prisma.createPost.findMany({
    where: { spaceId: community?.id },
    orderBy: { createdAt: 'desc' },
    include: {
      author: {
        select: {
          id: true,
          fullName: true,
          email: true,
        }
      },
      likes: true,
      comments: {
        include: {
          user: {
            select: {
              id: true,
              fullName: true,
              email: true,
            }
          }
        }
      }
    }
  });

  if (!community) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Community Not Found</h1>
          <p className="text-gray-600">The community you're looking for doesn't exist.</p>
        </div>
      </div>
    );
  }


  if (community.isPrivate) {
    const isMember = community.members.some(member => member.user.id === userId);
    if (!isMember && community.owner.id !== userId) {
      return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Community Not Found</h1>
            <p className="text-gray-600">The community you're looking for doesn't exist.</p>
          </div>
        </div>
      );
    }
  }

  const memberRecord = community.members.find(member => member.user.id === userId);
  if (memberRecord && !memberRecord.isApproved && community.owner.id !== userId) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Pending Approval</h1>
          <p className="text-gray-600">Your request to join this community is pending approval.</p>
        </div>
      </div>
    );
  }

  const formatDate = (date: Date) => {
  return date.toLocaleDateString('en-GB'); 
}


  const communityData = {
    id: community.id,
    name: community.name,
    slug: community.slug,
    description: community.description,
    coverImage: community.coverImage,
    isPrivate: community.isPrivate,
    isVerified: community.isVerified,
    category: community.category,
    rules: community.rules,
    owner: community.owner,
    joinCode: community.joinCode,
    memberCount: community.members.length,
    createdAt: formatDate(new Date(community.createdAt)),
    recentActivities : community.recentActivities.map(activity => ({
      id: activity.id,
      type: activity.activity,
      createdAt: formatDate(new Date(activity.createdAt)),
    })),
    posts,
    members: community.members.map(member => ({
      id: member.id,
      role: member.role,
      joinedAt: formatDate(new Date(member.joinedAt)),
      user: member.user,
      isApproved: member.isApproved,

    }))
  };

  return <ViewCommunity community={communityData} userId={userId} posts={posts} />
}

export default page