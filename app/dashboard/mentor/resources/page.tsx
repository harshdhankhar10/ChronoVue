"use client"
import React, { useState } from 'react'
import { FileText, Video, Link, Download, Plus, Search, Filter } from 'lucide-react'

const ResourcesPage = () => {
    const [searchTerm, setSearchTerm] = useState('')
    const [filter, setFilter] = useState('all')
    
    const resources = [
        {
            id: 1,
            title: "React Hooks Cheat Sheet",
            type: "pdf",
            category: "Frontend",
            size: "2.4 MB",
            downloads: 142,
            created: new Date(2024, 0, 15),
            description: "Comprehensive guide to React Hooks with examples and best practices",
            tags: ["React", "Hooks", "JavaScript"]
        },
        {
            id: 2,
            title: "System Design Fundamentals",
            type: "video",
            category: "Backend",
            size: "45.2 MB",
            downloads: 89,
            created: new Date(2024, 0, 10),
            description: "Video tutorial covering basic system design principles and patterns",
            tags: ["System Design", "Architecture", "Scalability"]
        },
        {
            id: 3,
            title: "JavaScript Interview Questions",
            type: "pdf",
            category: "Interview",
            size: "1.8 MB",
            downloads: 203,
            created: new Date(2024, 0, 5),
            description: "Curated list of JavaScript interview questions with detailed answers",
            tags: ["JavaScript", "Interview", "Questions"]
        },
        {
            id: 4,
            title: "Node.js Performance Guide",
            type: "link",
            category: "Backend",
            size: "-",
            downloads: 67,
            created: new Date(2024, 0, 1),
            description: "External resource on optimizing Node.js application performance",
            tags: ["Node.js", "Performance", "Optimization"]
        },
        {
            id: 5,
            title: "CSS Grid Layout Tutorial",
            type: "video",
            category: "Frontend",
            size: "38.7 MB",
            downloads: 118,
            created: new Date(2023, 11, 28),
            description: "Step-by-step tutorial on mastering CSS Grid layout system",
            tags: ["CSS", "Grid", "Layout"]
        }
    ]

    const getTypeIcon = (type: string) => {
        switch (type) {
            case 'pdf': return <FileText className="h-6 w-6 text-red-600" />
            case 'video': return <Video className="h-6 w-6 text-blue-600" />
            case 'link': return <Link className="h-6 w-6 text-green-600" />
            default: return <FileText className="h-6 w-6 text-gray-600" />
        }
    }

    const filteredResources = resources.filter(resource => 
        (filter === 'all' || resource.category.toLowerCase() === filter) &&
        (resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
         resource.description.toLowerCase().includes(searchTerm.toLowerCase()))
    )

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="max-w-7xl mx-auto">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">Resources</h1>
                    <p className="text-gray-600 mt-2">Share learning materials and resources with your students</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
                    <div className="bg-white rounded-xl border p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600">Total Resources</p>
                                <p className="text-2xl font-bold text-gray-900">24</p>
                            </div>
                            <FileText className="h-8 w-8 text-blue-600" />
                        </div>
                    </div>
                    <div className="bg-white rounded-xl border p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600">Total Downloads</p>
                                <p className="text-2xl font-bold text-gray-900">1,248</p>
                            </div>
                            <Download className="h-8 w-8 text-green-600" />
                        </div>
                    </div>
                    <div className="bg-white rounded-xl border p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600">PDF Resources</p>
                                <p className="text-2xl font-bold text-gray-900">12</p>
                            </div>
                            <FileText className="h-8 w-8 text-red-600" />
                        </div>
                    </div>
                    <div className="bg-white rounded-xl border p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600">Video Resources</p>
                                <p className="text-2xl font-bold text-gray-900">8</p>
                            </div>
                            <Video className="h-8 w-8 text-purple-600" />
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-xl border shadow-sm">
                    <div className="p-6 border-b">
                        <div className="flex items-center justify-between">
                            <h2 className="text-xl font-semibold text-gray-900">Resource Library</h2>
                            <button className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                                <Plus className="h-4 w-4" />
                                <span>Add Resource</span>
                            </button>
                        </div>
                        
                        <div className="flex items-center space-x-4 mt-4">
                            <div className="flex-1 relative">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                                <input
                                    type="text"
                                    placeholder="Search resources..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            <div className="flex space-x-2">
                                <button 
                                    onClick={() => setFilter('all')}
                                    className={`px-4 py-2 rounded-lg text-sm font-medium ${filter === 'all' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700'}`}
                                >
                                    All
                                </button>
                                <button 
                                    onClick={() => setFilter('frontend')}
                                    className={`px-4 py-2 rounded-lg text-sm font-medium ${filter === 'frontend' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700'}`}
                                >
                                    Frontend
                                </button>
                                <button 
                                    onClick={() => setFilter('backend')}
                                    className={`px-4 py-2 rounded-lg text-sm font-medium ${filter === 'backend' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700'}`}
                                >
                                    Backend
                                </button>
                                <button 
                                    onClick={() => setFilter('interview')}
                                    className={`px-4 py-2 rounded-lg text-sm font-medium ${filter === 'interview' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700'}`}
                                >
                                    Interview
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="p-6">
                        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                            {filteredResources.map((resource) => (
                                <div key={resource.id} className="border rounded-xl p-6 hover:shadow-md transition-shadow">
                                    <div className="flex items-start justify-between mb-4">
                                        <div className="flex items-center space-x-3">
                                            {getTypeIcon(resource.type)}
                                            <div>
                                                <h3 className="font-semibold text-gray-900">{resource.title}</h3>
                                                <span className="text-sm text-gray-600">{resource.category}</span>
                                            </div>
                                        </div>
                                        <button className="p-2 hover:bg-gray-100 rounded-lg">
                                            <Download className="h-4 w-4 text-gray-400" />
                                        </button>
                                    </div>

                                    <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                                        {resource.description}
                                    </p>

                                    <div className="flex flex-wrap gap-1 mb-4">
                                        {resource.tags.map((tag, index) => (
                                            <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>

                                    <div className="flex items-center justify-between text-sm text-gray-500">
                                        <span>{resource.size}</span>
                                        <span>{resource.downloads} downloads</span>
                                        <span>{resource.created.toLocaleDateString()}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ResourcesPage