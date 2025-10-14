import React from 'react';
import prisma from '@/lib/prisma';
import ViewCommunityPost from '@/components/Community/ViewCommunityPost';
import { getServerSession } from 'next-auth';
import { NEXT_AUTH } from '@/utils/auth';
import { Metadata } from 'next';
import ViewCommunityPostTimeline from '@/components/Community/ViewCommunityPostTimeline';

interface TimelineData {
  name: string;
  category: string;
  duration: string;
  startDate: string;
  endDate: string;
  risk_challanges: string[];
  resources: string[];
  ai_suggestions: any[];
}

interface MilestoneData {
  title: string;
  description: string;
  targetDate: string;
  status: string;
}


function parseMilestoneData(data: any): MilestoneData[] | null {
  if (!Array.isArray(data)) return null;

  return data.map((item) => ({
    title: String(item.title),
    description: String(item.description),
    targetDate: String(item.targetDate),
    status: String(item.status),
  }));
}

export async function generateMetadata({ params }: any): Promise<Metadata> {
  const post = await prisma.createPost.findUnique({
    where: { slug: params.slug },
  });

  if (!post) {
    return {
      title: 'Post Not Found',
      description: 'The post you are looking for does not exist.',
    };
  }

  return {
    title: post.title,
    description: post.content.slice(0, 150),
  };
}

const Page = async ({ params }: any) => {
  const { slug } = params;
  const session = await getServerSession(NEXT_AUTH);

  const userId = session?.user?.id;

  const post = await prisma.createPost.findUnique({
    where: { slug },
    include: {
      author: {
        select: {
          id: true,
          fullName: true,
          email: true,
        }
      },
      space: {
        select: {
          id: true,
          name: true,
          slug: true,
          isPrivate: true,
        }
      },
      comments: {
        include: {
          user: {
            select: {
              id: true,
              fullName: true,
              email: true,
            }
          }
        },
        orderBy: {
          createdAt: 'desc'
        }
      },
      likes: {
        include: {
          user: {
            select: {
              id: true,
              fullName: true,
            }
          }
        }
      }
    }
  });

  if (!post) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Post Not Found</h1>
          <p className="text-gray-600">The Post you're looking for doesn't exist.</p>
        </div>
      </div>
    );
  }

  // Increment views
  await prisma.createPost.update({
    where: { id: post.id },
    data: { views: { increment: 1 } }
  });

  const postData = {
    id: post.id,
    title: post.title,
    content: post.content,
    postType: post.postType,
    timelineData: post.timelineData as TimelineData | null, 
    mileStoneData: post.mileStoneData as MilestoneData[] | null,
    coverImage: post.coverImage,
    createdAt: post.createdAt.toISOString(),
    updatedAt: post.updatedAt.toISOString(),
    readTime: post.readTime,
    views: post.views + 1,
    tags: post.tags,
    category: post.category,
    isCommentsEnabled: post.isCommentsEnabled,
    author: post.author,
    space: post.space,
    comments: post.comments.map(comment => ({
      id: comment.id,
      content: comment.content,
      createdAt: comment.createdAt.toISOString(),
      user: comment.user
    })),
    likes: post.likes.map(like => ({
      id: like.id,
      userId: like.userId,
      user: like.user
    })),
    attachments: post.attachments
  };

  if (post.postType === 'TIMELINE') {
    return <ViewCommunityPostTimeline post={postData} userId={userId} />
  }

  return <ViewCommunityPost post={postData} userId={userId} />
}

export default Page;
