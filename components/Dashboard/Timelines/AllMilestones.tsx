"use client"

import React, { useState } from 'react'
import { MileStone, SubTask, Reflection } from '@prisma/client'
import axios from 'axios'
import { Loader } from 'lucide-react'
import { useRouter } from 'next/navigation'

interface MilestoneWithDetails extends MileStone {
  SubTask: SubTask[]
  Reflection: Reflection[]
}

const AllMilestones = ({ milestones }: { milestones: MilestoneWithDetails[] }) => {
  const [showAddReflection, setShowAddReflection] = useState<string | null>(null)
  const [showAddSubtask, setShowAddSubtask] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [newSubtaskTitle, setNewSubtaskTitle] = useState('')
  const [newReflectionNote, setNewReflectionNote] = useState('')
  const router = useRouter()

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'COMPLETED': return 'bg-green-100 text-green-800 border border-green-200'
      case 'IN_PROGRESS': return 'bg-blue-100 text-blue-800 border border-blue-200'
      default: return 'bg-gray-100 text-gray-800 border border-gray-200'
    }
  }

  const getPriorityColor = (priority: string) => {
    switch(priority) {
      case 'HIGH': return 'bg-red-100 text-red-800 border border-red-200'
      case 'MEDIUM': return 'bg-yellow-100 text-yellow-800 border border-yellow-200'
      default: return 'bg-gray-100 text-gray-800 border border-gray-200'
    }
  }

  const handleAddReflection = async (milestoneId: string) => {
    try {
      setLoading(true);
      const response = await axios.post('/api/dashboard/timelines/addReflection', {
        note: newReflectionNote,
        milestoneId
      });
      if (response.status === 201) {
        router.refresh();
        setNewReflectionNote('');
        setShowAddReflection(null);
      }
    } catch (error) {
      console.log(error);
    }finally{
      setLoading(false);
    }
  }

  const handleAddSubtask = async(milestoneId: string) => {
    try {
      setLoading(true);
      const response = await axios.post('/api/dashboard/timelines/addSubtask', {
        title: newSubtaskTitle,
        milestoneId
      });
      if (response.status === 201) {
        router.refresh();
        setNewSubtaskTitle('');
        setShowAddSubtask(null);
      }
    } catch (error) {
      console.log(error);
    }finally{
      setLoading(false);
    }
  }

  const markMilestoneCompleted = async (milestoneId: string) => {
    try {
      setLoading(true);
      const response = await axios.post('/api/dashboard/timelines/markMilestoneCompleted', {
        milestoneId
      });
      if (response.status === 200) {
        router.refresh();
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }


  return (
    <div className="lg:col-span-2 space-y-4">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-900">Timeline Overview</h2>
          <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-md">
            {milestones.length} milestones
          </span>
        </div>
        
        <div className="relative">
          <div className="absolute left-6 h-full w-0.5 bg-gray-200"></div>
          
          <ul className="space-y-8">
            {milestones.map((milestone, index) => (
              <li key={milestone.id} className="relative pl-16">
                <div className="absolute left-2 rounded-full w-8 h-8 flex items-center justify-center bg-blue-600 text-white text-sm font-medium border-2 border-white">
                  {index + 1}
                </div>
                
                <div className={`p-6 rounded-lg border ${
                  milestone.status === 'COMPLETED' 
                    ? 'border-green-500 bg-green-50' 
                    : milestone.status === 'IN_PROGRESS'
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-300 bg-white'
                } border border-gray-200`}>
                  <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
                    <div className="flex-1">
                      <h3 className="text-lg font-medium text-gray-900 mb-2">{milestone.title}</h3>
                      <p className="text-gray-600 text-sm mb-4">{milestone.description}</p>
                      
                      <div className="flex flex-wrap gap-1 mb-4">
                        {milestone.tags.map((tag, i) => (
                          <span key={i} className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="flex flex-col items-start md:items-end space-y-2">
                      <div className="flex flex-wrap gap-1">
                        <span className={`px-2 py-0.5 rounded text-xs font-medium ${getStatusColor(milestone.status)}`}>
                          {milestone.status.replace('_', ' ')}
                        </span>
                        <span className={`px-2 py-0.5 rounded text-xs font-medium ${getPriorityColor(milestone.priority)}`}>
                          {milestone.priority}
                        </span>
                      </div>
                      <div className="text-xs text-gray-500 flex items-center">
                        <svg className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        Due: {formatDate(milestone.targetDate)}
                      </div>
                      {milestone.status !== 'COMPLETED' && (
                        <button 
                          onClick={() => markMilestoneCompleted(milestone.id)} disabled={loading}
                          className="text-xs text-green-600 hover:text-green-700 font-medium flex items-center"
                        >
                          <svg className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                          </svg>
                          {loading ? <Loader className="animate-spin" /> : 'Mark as Completed'}
                        </button>
                      )}
                    </div>
                  </div>
                  
                  <div className="mt-6 pt-4 border-t border-gray-200">
                    <div className="flex justify-between items-center mb-4">
                      <h4 className="text-base font-medium text-gray-900">Subtasks</h4>
                      {milestone.status !== 'COMPLETED' && (
                        <button 
                        onClick={() => setShowAddSubtask(milestone.id)}
                        className="text-xs text-blue-600 hover:text-blue-700 font-medium flex items-center"
                      >
                        <svg className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                        Add Subtask
                      </button>
                      )}
                    </div>
                    
                    {showAddSubtask === milestone.id && (
                      <div className="mb-4 p-3 bg-gray-50 rounded-md">
                        <div className="flex flex-col sm:flex-row gap-2">
                          <input
                            type="text"
                            placeholder="Subtask title"
                            value={newSubtaskTitle}
                            onChange={(e) => setNewSubtaskTitle(e.target.value)}
                            className="flex-1 border border-gray-300 rounded-md shadow-sm py-1.5 px-3 focus:outline-none focus:ring-1 focus:ring-teal-600 focus:border-blue-500 text-sm"
                          />
                          <div className="flex gap-1">
                            <button
                              onClick={() => handleAddSubtask(milestone.id)}
                              className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md text-white bg-secondary hover:bg-secondary/90"
                            >
                              {loading ? <Loader className="h-4 w-4 animate-spin" /> : 'Add Subtask'}
                            </button>
                            <button
                              onClick={() => setShowAddSubtask(null)}
                              className="inline-flex items-center px-3 py-1.5 border border-gray-300 text-xs font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                    
                    {milestone.SubTask.length > 0 ? (
                      <ul className="space-y-2">
                        {milestone.SubTask.map(subtask => (
                          <li key={subtask.id} className="flex items-center p-2 bg-white rounded-md border">
                            <span className={`ml-2 flex-1 text-sm `}>
                              {subtask.title}
                            </span>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-gray-500 text-xs text-center py-2 bg-gray-50 rounded-md">No subtasks yet</p>
                    )}
                  </div>
                  
                  <div className="mt-6 pt-4 border-t border-gray-200">
                    <div className="flex justify-between items-center mb-4">
                      <h4 className="text-base font-medium text-gray-900">Reflections</h4>
                      {milestone.status !== 'COMPLETED' && (
                         <button 
                        onClick={() => setShowAddReflection(milestone.id)}
                        className="text-xs text-blue-600 hover:text-blue-700 font-medium flex items-center"
                      >
                        <svg className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                        Add Reflection
                      </button>
                      )}
                    </div>
                    
                    {showAddReflection === milestone.id && (
                      <div className="mb-4 p-3 bg-gray-50 rounded-md">
                        <textarea
                          placeholder="Add your reflection notes"
                          rows={2}
                          value={newReflectionNote}
                          onChange={(e) => setNewReflectionNote(e.target.value)}
                          className="w-full border border-gray-300 rounded-md shadow-sm py-1.5 px-3 focus:outline-none focus:ring-1 focus:ring-teal-600  text-sm"
                        ></textarea>
                        <div className="mt-2 flex justify-end gap-2">
                          <button
                            onClick={() => handleAddReflection(milestone.id)}
                            className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md text-white bg-secondary hover:bg-secondary/90"
                          >
                            {loading ? <Loader className="h-4 w-4 animate-spin" /> : 'Add Reflection'}
                          </button>
                          <button
                            onClick={() => setShowAddReflection(null)}
                            className="inline-flex items-center px-3 py-1.5 border border-gray-300 text-xs font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    )}
                    
                    {milestone.Reflection.length > 0 ? (
                      <ul className="space-y-3">
                        {milestone.Reflection.map(reflection => (
                          <li key={reflection.id} className="bg-gray-50 p-3 rounded-md">
                            <p className="text-gray-700 text-sm">{reflection.note}</p>
                            <div className="mt-2 flex flex-wrap gap-1">
                            </div>
                            <p className="text-xs text-gray-500 mt-2">
                              {formatDate(reflection.createdAt)}
                            </p>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-gray-500 text-xs text-center py-2 bg-gray-50 rounded-md">No reflections yet</p>
                    )}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default AllMilestones