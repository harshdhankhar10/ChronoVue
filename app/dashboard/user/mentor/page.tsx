import React from 'react'
import prisma from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { NEXT_AUTH } from '@/utils/auth'
import Link from 'next/link'
import { CheckCircle, Users, Star, Award, Clock, Shield, AlertCircle, Wrench } from 'lucide-react'
import { Button } from '@/components/ui/button'
import RetryPayment from './RetryPayment'

const page = async () => {
  const isDisabled = true;

  if(isDisabled){
    return (
      <div className=" mt-12 bg-gray-50 flex items-center justify-center px-4">
        <div className="max-w-md w-full text-center">
          <div className="bg-white rounded-xl border shadow-sm p-8">
            
            <h1 className="text-2xl font-bold text-gray-900 mb-3">
              Feature Under Maintenance
            </h1>
            
            <p className="text-gray-600 mb-6 leading-relaxed">
              We're currently enhancing the mentor feature to provide you with a better experience. 
              This feature will be back soon with exciting new improvements.
            </p>

            <div className="bg-orange-50 border border-primary rounded-lg p-4 mb-6">
              <div className="flex items-start gap-3">
                <div className="text-left">
                  <p className="text-primary text-sm font-bold">
                    Expected Return
                  </p>
                  <p className="text-primary/95 font-semibold text-xs mt-1">
                    We're working to bring this feature back within the next 2 weeks.
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-3 text-sm text-gray-600">
              <p className='font-semibold'>In the meantime, you can:</p>
              <div className="flex flex-col  gap-2">
                  <span>Continue learning with our existing features</span>
                  <span>Explore community discussions</span>
                  <span>Access learning resources</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }


  const session = await getServerSession(NEXT_AUTH)

  const user = await prisma.user.findUnique({
    where: {
      email: session?.user?.email || '',
    },
  })

  const mentor = await prisma.mentorProfile.findUnique({
    where: {
      userId: user?.id || '',
    },
  })

  if(mentor?.paymentStatus === 'PENDING'){
    return(
      <RetryPayment/>
    )
  }

    

  if (!mentor?.isVerified && mentor) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="max-w-md w-full text-center">
          <div className="bg-white rounded-xl border shadow-sm p-8">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <AlertCircle className="h-8 w-8 text-red-600" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Application Under Review
            </h1>
            <p className="text-gray-600 mb-6">
              Your mentor application is currently under review. Please check back later for updates.
            </p>
            <p className="bg-gray-100 p-4 rounded-lg text-gray-700 text-sm">
              You will receive an email notification once a decision has been made regarding your application.
            </p>
          </div>
        </div>
      </div>
    )
  }


  const mentorBenefits = [
    {
      icon: Users,
      title: 'Reach More Students',
      description: 'Connect with motivated learners worldwide'
    },
    {
      icon: Star,
      title: 'Build Your Brand',
      description: 'Establish yourself as an industry expert'
    },
    {
      icon: Award,
      title: 'Earn Money',
      description: 'Set your own rates and schedule'
    },
    {
      icon: Clock,
      title: 'Flexible Hours',
      description: 'Work on your own time and terms'
    },
    {
      icon: Shield,
      title: 'Verified Profile',
      description: 'Gain trust with our verification badge'
    }
  ]

  const requirements = [
    'Minimum 2 years professional experience',
    'Proven expertise in your field',
    'Strong communication skills',
    'Commitment to student success',
    'Professional background verification'
  ]


  if (user?.isMentor) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="max-w-md w-full text-center">
          <div className="bg-white rounded-xl border shadow-sm p-8">
            <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="h-8 w-8 text-orange-600" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Mentor Verified
            </h1>
            <p className="text-gray-600 mb-6">
              You're approved as a mentor. Access your dedicated dashboard to manage sessions and students.
            </p>
            <Link
              href="/dashboard/mentor"
              className="w-full inline-block px-6 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors font-semibold"
            >
              Access Mentor Dashboard
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className=" px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Become a Mentor
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Share your expertise, guide aspiring professionals, and build your personal brand while earning income.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <div className="bg-white rounded-xl border shadow-sm p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Why Become a Mentor?</h2>
            <div className="space-y-4">
              {mentorBenefits.map((benefit, index) => (
                <div key={index} className="flex items-start gap-4">
                  <div className="p-2 bg-orange-100 rounded-lg">
                    <benefit.icon className="h-5 w-5 text-orange-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{benefit.title}</h3>
                    <p className="text-gray-600 text-sm">{benefit.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl border shadow-sm p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Mentor Requirements</h2>
            <div className="space-y-3">
              {requirements.map((requirement, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                  <span className="text-gray-700">{requirement}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border shadow-sm p-8 text-center">
          <div className="max-w-2xl mx-auto">
            <div className="mb-6">
              <div className="inline-flex items-center gap-2 bg-orange-100 text-orange-800 px-4 py-2 rounded-full text-sm font-semibold mb-4">
                <Shield className="h-4 w-4" />
                Verification Fee Required
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                ₹149 One-Time Verification
              </h2>
              <p className="text-gray-600">
                This fee ensures mentor authenticity and maintains platform quality for students.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <div className="text-center p-4 border rounded-lg">
                <div className="text-2xl font-bold text-gray-900">100%</div>
                <div className="text-sm text-gray-600">Platform Access</div>
              </div>
              <div className="text-center p-4 border border-primary rounded-lg">
                <div className="text-2xl font-bold text-gray-900">5%</div>
                <div className="text-sm text-gray-600">Platform Commission</div>
              </div>
              <div className="text-center p-4 border rounded-lg">
                <div className="text-2xl font-bold text-gray-900">Lifetime</div>
                <div className="text-sm text-gray-600">Mentor Status</div>
              </div>
            </div>

              <Link href="/dashboard/user/mentor/apply">
               <Button>
              Apply to Become a Mentor - ₹149
            </Button>
              </Link>

            <p className="text-sm text-gray-500 mt-4">
              Fee refunded if application is not approved
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default page