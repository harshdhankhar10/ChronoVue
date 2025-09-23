"use client"

import React, { useState } from 'react'
import { Timeline, MileStone, SubTask, Reflection, TimelineCategory, Priority, Status } from '@prisma/client'
import AllMilestones from './AllMilestones'
import AISuggestions from './AISuggestions'
import AddMilestoneModal from './AddMilestoneModal'
import jsPDF from 'jspdf'

interface TimelineWithMilestones extends Timeline {
  milestones: (MileStone & {
    SubTask: SubTask[]
    Reflection: Reflection[]
  })[]
}

const ViewTimelineInfo = ({ timeline }: { timeline: TimelineWithMilestones }) => {
  const [showAddMilestone, setShowAddMilestone] = useState(false)
  const [showMenu, setShowMenu] = useState(false)

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  const exportToPDF = () => {
    const doc = new jsPDF()
    let yPosition = 20

    doc.setFontSize(20)
    doc.setTextColor(40, 40, 40)
    doc.text('Timeline Report', 105, yPosition, { align: 'center' })
    yPosition += 15

    doc.setFontSize(12)
    doc.setTextColor(100, 100, 100)
    doc.text(`Generated on ${new Date().toLocaleDateString()}`, 105, yPosition, { align: 'center' })
    yPosition += 20

    doc.setFontSize(16)
    doc.setTextColor(30, 30, 30)
    doc.text(`Timeline: ${timeline.name}`, 20, yPosition)
    yPosition += 10

    doc.setFontSize(10)
    doc.setTextColor(80, 80, 80)
    doc.text(`Category: ${timeline.category} | ${formatDate(timeline.startDate)} - ${formatDate(timeline.endDate)}`, 20, yPosition)
    yPosition += 15

    if (timeline.risk_challanges && timeline.risk_challanges.length > 0) {
      doc.setFontSize(12)
      doc.setTextColor(30, 30, 30)
      doc.text('Risks & Challenges:', 20, yPosition)
      yPosition += 8
      
      timeline.risk_challanges.forEach(risk => {
        if (yPosition > 270) {
          doc.addPage()
          yPosition = 20
        }
        doc.setFontSize(10)
        doc.setTextColor(60, 60, 60)
        doc.text(`• ${risk}`, 25, yPosition)
        yPosition += 6
      })
      yPosition += 10
    }

    if (timeline.resources_needed && timeline.resources_needed.length > 0) {
      doc.setFontSize(12)
      doc.setTextColor(30, 30, 30)
      doc.text('Resources Needed:', 20, yPosition)
      yPosition += 8
      
      timeline.resources_needed.forEach(resource => {
        if (yPosition > 270) {
          doc.addPage()
          yPosition = 20
        }
        doc.setFontSize(10)
        doc.setTextColor(60, 60, 60)
        doc.text(`• ${resource}`, 25, yPosition)
        yPosition += 6
      })
      yPosition += 15
    }

    doc.setFontSize(14)
    doc.setTextColor(30, 30, 30)
    doc.text('Milestones:', 20, yPosition)
    yPosition += 10

    timeline.milestones.forEach((milestone, index) => {
      if (yPosition > 250) {
        doc.addPage()
        yPosition = 20
      }

      doc.setFontSize(12)
      doc.setTextColor(40, 40, 40)
      doc.text(`${index + 1}. ${milestone.title}`, 20, yPosition)
      yPosition += 7

      doc.setFontSize(10)
      doc.setTextColor(80, 80, 80)
      doc.text(`Status: ${milestone.status} | Priority: ${milestone.priority} | Due: ${formatDate(milestone.targetDate)}`, 25, yPosition)
      yPosition += 6

      doc.text(`Description: ${milestone.description}`, 25, yPosition)
      yPosition += 10

      if (milestone.SubTask.length > 0) {
        doc.setFontSize(10)
        doc.setTextColor(60, 60, 60)
        doc.text('Subtasks:', 30, yPosition)
        yPosition += 6
        
        milestone.SubTask.forEach(subtask => {
          if (yPosition > 270) {
            doc.addPage()
            yPosition = 20
          }
          doc.text(`${subtask.title} `, 35, yPosition)
          yPosition += 5
        })
        yPosition += 5
      }

      if (milestone.Reflection.length > 0) {
        doc.setFontSize(10)
        doc.setTextColor(60, 60, 60)
        doc.text('Reflections:', 30, yPosition)
        yPosition += 6
        
        milestone.Reflection.forEach(reflection => {
          if (yPosition > 270) {
            doc.addPage()
            yPosition = 20
          }
          doc.text(`• ${reflection.note}`, 35, yPosition)
          yPosition += 5
          doc.text(`  Date: ${formatDate(reflection.createdAt)}`, 35, yPosition)
          yPosition += 5
        })
        yPosition += 5
      }
      yPosition += 10
    })

    if (timeline.ai_suggestions && timeline.ai_suggestions.length > 0) {
      if (yPosition > 250) {
        doc.addPage()
        yPosition = 20
      }

      doc.setFontSize(14)
      doc.setTextColor(30, 30, 30)
      doc.text('AI Suggestions:', 20, yPosition)
      yPosition += 10

      timeline.ai_suggestions.forEach((suggestion: any) => {
        if (yPosition > 270) {
          doc.addPage()
          yPosition = 20
        }
        doc.setFontSize(10)
        doc.setTextColor(60, 60, 60)
        const suggestionText = typeof suggestion === 'string' ? suggestion : suggestion.message || suggestion.content
        doc.text(`• ${suggestionText}`, 25, yPosition, { maxWidth: 165 })
        yPosition += 15
      })
    }

    doc.setFontSize(8)
    doc.setTextColor(150, 150, 150)
    doc.text(`Generated from Timeline Management System - Chronovue`, 105, 290, { align: 'center' })

    doc.save(`${timeline.name.replace(/[^a-zA-Z0-9]/g, '_')}_timeline.pdf`)
    setShowMenu(false)
  }

  return (
    <div className="min-h-screen bg-gray-50 ">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
            <div className="space-y-3 flex-1">
              <div className="flex items-center gap-3 flex-wrap">
                <h1 className="text-2xl font-semibold text-gray-900">{timeline.name}</h1>
                <span className="inline-flex items-center px-3 py-1 rounded-md text-sm font-medium bg-gray-100 text-gray-700 border">
                  {timeline.category}
                </span>
              </div>
              
              <div className="flex flex-wrap gap-4 text-gray-600 text-sm">
                <div className="flex items-center">
                  <svg className="h-4 w-4 mr-1 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span>{formatDate(timeline.startDate)} - {formatDate(timeline.endDate)}</span>
                </div>
                
                <div className="flex items-center">
                  <svg className="h-4 w-4 mr-1 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                  <span>{timeline.isPublic ? 'Public' : 'Private'}</span>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-2">
              <div className="relative">
                <button 
                  onClick={() => setShowMenu(!showMenu)}
                  className="p-2 rounded-md bg-gray-100 hover:bg-gray-200 transition-colors border"
                >
                  <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                  </svg>
                </button>
                
                {showMenu && (
                  <div className="absolute right-0 mt-1 w-40 bg-white rounded-md shadow-lg border z-10 py-1">
                    <button 
                      onClick={exportToPDF}
                      className="block w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50"
                    >
                      Export Timeline
                    </button>
                  </div>
                )}
              </div>
              
              <button 
                onClick={() => setShowAddMilestone(true)}
                className="px-4 py-2 rounded-md bg-blue-600 text-white font-medium hover:bg-blue-700 transition-colors text-sm"
              >
                Add Milestone
              </button>
            </div>
          </div>
          
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <h3 className="text-base font-medium text-gray-900">Risk & Challenges</h3>
              <ul className="space-y-2">
                {timeline.risk_challanges && timeline.risk_challanges.length > 0 ? (
                  timeline.risk_challanges.map((risk, index) => (
                    <li key={index} className="flex items-start p-3 bg-red-50 rounded-md border-l-2 border-red-400">
                      <span className="text-red-700 text-sm">{risk}</span>
                    </li>
                  ))
                ) : (
                  <p className="text-gray-500 text-sm p-3 bg-gray-50 rounded-md text-center">No risks or challenges defined</p>
                )}
              </ul>
            </div>
            
            <div className="space-y-3">
              <h3 className="text-base font-medium text-gray-900">Resources Needed</h3>
              <ul className="space-y-2">
                {timeline.resources_needed && timeline.resources_needed.length > 0 ? (
                  timeline.resources_needed.map((resource, index) => (
                    <li key={index} className="flex items-start p-3 bg-blue-50 rounded-md border-l-2 border-blue-400">
                      <span className="text-blue-700 text-sm">{resource}</span>
                    </li>
                  ))
                ) : (
                  <p className="text-gray-500 text-sm p-3 bg-gray-50 rounded-md text-center">No resources needed defined</p>
                )}
              </ul>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <AllMilestones milestones={timeline.milestones} />
          <AISuggestions suggestions={timeline.ai_suggestions} timelineID={timeline.id} />
        </div>
      </div>

      <AddMilestoneModal 
        showAddMilestone={showAddMilestone}
        setShowAddMilestone={setShowAddMilestone}
        timelineID={timeline.id}
      />
    </div>
  )
}

export default ViewTimelineInfo