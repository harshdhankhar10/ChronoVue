import React from 'react'
import prisma from '@/lib/prisma'
import { currentLoggedInUserInfo } from '@/lib/currentLoggedInUserInfo'
import ViewSpecificUser from '@/components/Admin/Users/ViewSpecificUser';
const page = async ({ params }: any) => {
    const { username } = params;
    const userInfo = await currentLoggedInUserInfo()
    if(!userInfo){
    return <div>Access Denied</div>
  }
  const user = await prisma.user.findUnique({
    where: {
      username: username,
    },
    include: {
        creditUsages: true,
        Profile: true,
        notifications: true,
        payments: true,
        Onboarding: true,
        Timeline: true,
        MileStone: true,
    }
  });

  if(!user){
    return <div>User Not Found</div>
  }
  return (
    <>
        <ViewSpecificUser />
    </>
  )
}

export default page