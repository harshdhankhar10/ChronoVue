import React from 'react'
import { getServerSession } from 'next-auth'
import { NEXT_AUTH } from '@/utils/auth'
import prisma from '@/lib/prisma'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

const page = async () => {
  const session = await getServerSession(NEXT_AUTH)

  const journals = await prisma.journal.findMany({
    where: { userId: session?.user?.id }
  })

  const formatDate = (date: Date) => {
    return date.toISOString().split('T')[0]
  }

const moodColors = {
  HAPPY: 'bg-yellow-100 text-yellow-800 border-yellow-200',
  SAD: 'bg-blue-100 text-blue-800 border-blue-200',
  NEUTRAL: 'bg-gray-100 text-gray-800 border-gray-200',
  EXCITED: 'bg-orange-100 text-orange-800 border-orange-200',
  ANXIOUS: 'bg-pink-100 text-pink-800 border-pink-200',
  GRATEFUL: 'bg-green-100 text-green-800 border-green-200',
  STRESSED: 'bg-red-100 text-red-800 border-red-200',
  MOTIVATED: 'bg-teal-100 text-teal-800 border-teal-200',
  REFLECTIVE: 'bg-purple-100 text-purple-800 border-purple-200'
};



  return (
    <>
          <div className="min-h-screen bg-gray-50 py-2">
      <div className="">
        <header className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">My Journal</h1>
            <p className="text-gray-600 mt-2">Reflect on your thoughts and experiences</p>
          </div>
         <Link href="/dashboard/user/journal/new">
          <Button >
            New Journal Entry
          </Button>
         </Link>
        </header>

        {journals.length === 0 ? (
          <div className="text-center py-16 border-2 border-dashed border-gray-300 rounded-lg bg-white">
            <div className="max-w-md mx-auto">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No journal entries yet</h3>
              <p className="text-gray-500 mb-6">Start writing your first journal entry to reflect on your thoughts and experiences.</p>
              <Link 
                href="/dashboard/user/journal/new"
                className="bg-secondary hover:bg-secondary/90 text-white px-6 py-2 rounded-lg font-medium transition-colors"
              >
                Create Your First Entry
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {journals.map((journal) => (
              <div key={journal.id} className="bg-white rounded-lg  border border-gray-200 p-6 ">
                <div className="flex justify-between items-start mb-3">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${moodColors[journal.mood]}`}>
                    {journal.mood.charAt(0).toUpperCase() + journal.mood.slice(1).toLowerCase()}
                  </span>
                  <span className="text-xs text-gray-500">{formatDate(journal.updatedAt)}</span>
                </div>
                
                <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">{journal.title}</h3>
                
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">{journal.content}</p>
                
                {journal.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1 mb-4">
                    {journal.tags.map((tag, index) => (
                      <span key={index} className="inline-flex items-center px-2 py-1 rounded text-xs bg-gray-100 text-gray-700">
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
                
                <div className="flex justify-between items-center">
                  <Link 
                    href={`/dashboard/user/journal/${journal.id}`}
                    className="text-secondary hover:text-secondary/900 text-sm font-medium"
                  >
                    Read more →
                  </Link>
                  
                  {journal.ai_suggestions && journal.ai_suggestions.length > 0 && (
                    <span className="inline-flex items-center px-2 py-1 rounded text-xs bg-green-100 text-green-700">
                      AI Insights
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
    </>
  )
}

export default page