import React from 'react'
import { currentLoggedInUserInfo } from '@/lib/currentLoggedInUserInfo'
import { isAdmin } from '@/lib/isAdmin'
import prisma from '@/lib/prisma'
import AllUsers from '@/components/Admin/Users/AllUsers'
const page = async ({searchParams}:any) => {
    const {page} = searchParams;
    const user = await currentLoggedInUserInfo()
    if(!user || !await isAdmin()){
    return <div>Access Denied</div>
  }

  const allUsers  = await prisma.user.findMany({
    select:{
      fullName:true,
      email:true,
      isVerified:true,
      isMentor:true,
      createdAt:true,
      role:true,
      status:true,
      username:true,
    },
    orderBy:{
      createdAt:'desc'
    },
    skip: page ? (Number(page) - 1) * 10 : 0,
    take: 10,
  })

  const totalUsers = await prisma.user.count();

    return <>
        <AllUsers allUsers={allUsers} currentPage={page ? Number(page) : 1} totalPages={Math.ceil(totalUsers/10)} totalUsers={totalUsers}/>
    </>
}

export default page