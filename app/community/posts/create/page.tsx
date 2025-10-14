import React from 'react'
import prisma from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { NEXT_AUTH } from '@/utils/auth';
import CreateCommunityPost from '@/components/Community/CreateCommunityPost';
const page = async ({searchParams} : any) => {

    const communityId = searchParams.communityId;

    if(!communityId){
        return (
            <>
                <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                    <div className="text-center">
                        <h1 className="text-2xl font-bold text-gray-900 mb-2">Community ID Missing</h1>
                        <p className="text-gray-600">Please provide a valid community ID.</p>
                    </div>
                </div>
            </>
        )
    }



    const session = await getServerSession(NEXT_AUTH);
    const userId = session?.user?.id;

    const isCommunityIDValid = await prisma.communitySpace.findUnique({
        where: { id: communityId }
    });

    if(!isCommunityIDValid){
        return (
        <>
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-gray-900 mb-2">Invalid Community</h1>
                    <p className="text-gray-600">The Community does not exist.</p>
                </div>
            </div>
         </>
    )
    }

    const isMember = await prisma.communityMember.findFirst({
        where: {
            spaceId: communityId,
            userId: userId
        }
    });

    if(!session || !userId || !isMember){
        return (
            <>
                <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                    <div className="text-center">
                        <h1 className="text-2xl font-bold text-gray-900 mb-2">Access Denied</h1>
                        <p className="text-gray-600">You are not a member of this community.</p>
                    </div>
                </div>
            </>
        )
    }



    return (
      <>
        <CreateCommunityPost spaceId={communityId} spaceName={isCommunityIDValid?.name} />
      </>
    )
}

export default page