import UserSettings from '@/components/Dashboard/User/UserSettings'
import { currentLoggedInUserInfo } from '@/lib/currentLoggedInUserInfo'
import prisma from '@/lib/prisma'
const page = async () => {
  const userInfo = await currentLoggedInUserInfo();

  if (!userInfo) {
    return <div>Please log in to access your settings.</div>
  }

  const user = await prisma.user.findUnique({
    where: {
      email: userInfo?.email || ''
    },
    include: {
      Profile: true
    }
  })
    
  const userData = {
    id: user?.id || '',
    fullName: user?.fullName || '',
    email: user?.email || '',
    username: user?.username || '',
    profilePicture: user?.profilePicture || '',
    phoneNumber: user?.phoneNumber || '',
    credits: user?.credits || 0,
    profile: {
      bio: user?.Profile?.bio || '',
      location: user?.Profile?.location || '',
      carrerStage: user?.Profile?.careerStage || '',
      headline: user?.Profile?.headline || '',
      timezone: user?.Profile?.timezone || '',
    }
  }
  console.log(user)

  return <UserSettings user={userData} />
}

export default page