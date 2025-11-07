"use client"
import React from 'react'
import { BookOpen, Video, FileText, ExternalLink, Clock, Users, Star } from 'lucide-react'
import { Button } from '@/components/ui/button'

const AICuratedResources = () => {
  const curatedResources = [
    {
      id: 1,
      title: "Machine Learning Roadmap 2024",
      type: "roadmap",
      description: "Complete learning path from beginner to advanced ML concepts",
      duration: "6 months",
      level: "Beginner",
      rating: 4.8,
      url: "#",
      icon: BookOpen,
      color: "bg-blue-100 text-blue-600"
    },
    {
      id: 2,
      title: "React Master Class",
      type: "course",
      description: "Advanced React patterns and best practices",
      duration: "8 hours",
      level: "Intermediate",
      rating: 4.9,
      url: "#",
      icon: Video,
      color: "bg-green-100 text-green-600"
    },
    {
      id: 3,
      title: "System Design Fundamentals",
      type: "article",
      description: "Learn how to design scalable systems",
      duration: "45 min read",
      level: "Advanced",
      rating: 4.7,
      url: "#",
      icon: FileText,
      color: "bg-purple-100 text-purple-600"
    },
    {
      id: 4,
      title: "Data Structures Crash Course",
      type: "course",
      description: "Essential data structures for technical interviews",
      duration: "12 hours",
      level: "Beginner",
      rating: 4.6,
      url: "#",
      icon: Video,
      color: "bg-orange-100 text-orange-600"
    }
  ]

  const recommendedForYou = [
    {
      goal: "Learn Machine Learning",
      resources: ["Machine Learning Roadmap", "Python for Data Science"]
    },
    {
      goal: "Improve React Skills", 
      resources: ["React Master Class", "Advanced Hooks Guide"]
    },
    {
      goal: "System Design Prep",
      resources: ["System Design Fundamentals", "Database Design Patterns"]
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            AI Curated Resources
          </h1>
          <p className="text-gray-600 text-lg">
            Personalized learning recommendations based on your goals and timelines
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl border shadow-sm">
              <div className="p-6 border-b">
                <h2 className="text-xl font-semibold text-gray-900">
                  Recommended Resources
                </h2>
                <p className="text-gray-600 text-sm mt-1">
                  Based on your active timelines and learning goals
                </p>
              </div>
              
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {curatedResources.map((resource) => (
                    <div key={resource.id} className="border rounded-xl p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className={`p-3 rounded-lg ${resource.color}`}>
                          <resource.icon className="h-6 w-6" />
                        </div>
                        <div className="flex items-center gap-1 text-sm text-gray-500">
                          <Star className="h-4 w-4 text-yellow-500" />
                          <span>{resource.rating}</span>
                        </div>
                      </div>

                      <h3 className="font-semibold text-gray-900 text-lg mb-2">
                        {resource.title}
                      </h3>
                      
                      <p className="text-gray-600 text-sm mb-4">
                        {resource.description}
                      </p>

                      <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          <span>{resource.duration}</span>
                        </div>
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          resource.level === 'Beginner' ? 'bg-green-100 text-green-800' :
                          resource.level === 'Intermediate' ? 'bg-blue-100 text-blue-800' :
                          'bg-purple-100 text-purple-800'
                        }`}>
                          {resource.level}
                        </span>
                      </div>

                      <Button className="w-full">
                        <ExternalLink className="h-4 w-4" />
                        Explore Resource
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-xl border shadow-sm">
              <div className="p-6 border-b">
                <h3 className="text-lg font-semibold text-gray-900">
                  Based on Your Goals
                </h3>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {recommendedForYou.map((item, index) => (
                    <div key={index} className="border rounded-lg p-4">
                      <h4 className="font-semibold text-gray-900 mb-2">
                        {item.goal}
                      </h4>
                      <div className="space-y-1">
                        {item.resources.map((resource, resIndex) => (
                          <div key={resIndex} className="flex items-center gap-2 text-sm text-gray-600">
                            <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                            <span>{resource}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl border shadow-sm">
              <div className="p-6 border-b">
                <h3 className="text-lg font-semibold text-gray-900">
                  Learning Stats
                </h3>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Resources Viewed</span>
                    <span className="font-semibold">12</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Completed</span>
                    <span className="font-semibold">8</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Time Saved</span>
                    <span className="font-semibold">15+ hours</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 rounded-xl border border-blue-200 p-6">
              <h3 className="font-semibold text-blue-900 mb-2">
                Need Specific Help?
              </h3>
              <p className="text-blue-700 text-sm mb-4">
                Tell us what you're working on and get personalized recommendations
              </p>
              <Button className="w-full">
                Get AI Recommendations
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AICuratedResources