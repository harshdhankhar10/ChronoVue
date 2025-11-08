import CreditsBuyHomepage from '@/components/Dashboard/Credits/CreditsBuyHomepage'
import React from 'react'
import { currentLoggedInUserInfo } from '@/lib/currentLoggedInUserInfo'

interface User {
    credits : number;
}

const page = async () => {
    const user = await currentLoggedInUserInfo();
  return (
    <>
        <CreditsBuyHomepage user = {user as User}/>
    </>
  )
}

export default page