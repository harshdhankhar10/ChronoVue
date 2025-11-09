import UserSettings from '@/components/Dashboard/User/UserSettings'
import prisma from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { NEXT_AUTH } from '@/utils/auth'
const page = async () => {
  const session = await getServerSession(NEXT_AUTH)
  const user = await prisma.user.findUnique({
    where: {
      email: session?.user?.email || ''
    }
  })
    
  const userData = {
    id: user?.id || '',
    fullName: user?.fullName || '',
    email: user?.email || '',
    username: user?.username || '',
    profilePicture: user?.profilePicture || '',
    phoneNumber: user?.phoneNumber || '',
    credits: user?.credits || 0
  }

  return <UserSettings user={userData} />
}

export default page