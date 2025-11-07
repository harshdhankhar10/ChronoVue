import React from 'react'
import prisma from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { NEXT_AUTH } from '@/utils/auth'
import { CheckCircle, Clock, XCircle, User, Mail, Calendar } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

const Page = async () => {
  const session = await getServerSession(NEXT_AUTH)
  
  const applications = await prisma.mentorProfile.findMany({
    include: {
      user: {
        select: {
          fullName: true,
          email: true,
          profilePicture: true
        }
      }
    },
    orderBy: {
      createdAt: 'desc'
    }
  })

  const getStatusIcon = (isVerified: boolean, isActive: boolean) => {
    if (!isActive) return <XCircle className="h-5 w-5 text-red-600" />
    if (isVerified) return <CheckCircle className="h-5 w-5 text-green-600" />
    return <Clock className="h-5 w-5 text-yellow-600" />
  }

  const getStatusText = (isVerified: boolean, isActive: boolean) => {
    if (!isActive) return 'Rejected'
    if (isVerified) return 'Approved'
    return 'Pending Review'
  }

  const getStatusColor = (isVerified: boolean, isActive: boolean) => {
    if (!isActive) return 'bg-red-100 text-red-800'
    if (isVerified) return 'bg-green-100 text-green-800'
    return 'bg-yellow-100 text-yellow-800'
  }

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Mentor Applications</h1>
        <p className="text-gray-600">Manage and review mentor applications</p>
      </div>

      <div className="bg-white rounded-lg border shadow-sm">
        {applications.length === 0 ? (
          <div className="text-center py-12">
            <User className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No Applications</h3>
            <p className="text-gray-600">No mentor applications found.</p>
          </div>
        ) : (
          <div className="divide-y">
            {applications.map((application) => (
              <div key={application.id} className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      {application.user.profilePicture ? (
                        <img 
                          src={application.user.profilePicture} 
                          alt={application.user.fullName || ''}
                          className="w-12 h-12 rounded-full"
                        />
                      ) : (
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
                          {application.user.fullName?.charAt(0) || 'U'}
                        </div>
                      )}
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-lg font-semibold text-gray-900">
                          {application.user.fullName}
                        </h3>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(application.isVerified, application.isActive)}`}>
                          {getStatusText(application.isVerified, application.isActive)}
                        </span>
                      </div>
                      
                      <div className="flex items-center space-x-4 text-sm text-gray-600">
                        <div className="flex items-center space-x-1">
                          <Mail className="h-4 w-4" />
                          <span>{application.user.email}</span>
                        </div>
                        
                        <div className="flex items-center space-x-1">
                          <Calendar className="h-4 w-4" />
                          <span>
                            Applied {new Date(application.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                      </div>


                      <div className="flex flex-wrap gap-2 mt-3">
                        {application.expertise.slice(0, 3).map((skill, index) => (
                          <span 
                            key={index}
                            className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-md"
                          >
                            {skill}
                          </span>
                        ))}
                        {application.expertise.length > 3 && (
                          <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-md">
                            +{application.expertise.length - 3} more
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    {getStatusIcon(application.isVerified, application.isActive)}
                    <div className="text-right">
                      <p className="text-sm font-medium text-gray-900">
                        {application.experienceYears} years
                      </p>
                      <p className="text-xs text-gray-600">Experience</p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between mt-4 pt-4 border-t">
                  <div className="flex items-center space-x-4 text-sm text-gray-600">
                    <span>Rate: ₹{application.rate}/hour</span>
                    <span>•</span>
                    <span>Timezone: {application.timezone}</span>
                    <span>•</span>
                    <span>{application.mentoringCategories.length} categories</span>
                  </div>
                  
                  <div className="flex space-x-2">
                     <Link href={`/dashboard/admin/mentor-applications/${application.id}`}>
                      <Button>
                          View Details
                    </Button>
                     </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="mt-4 text-sm text-gray-600">
        Showing {applications.length} mentor application{applications.length !== 1 ? 's' : ''}
      </div>
    </div>
  )
}

export default Page