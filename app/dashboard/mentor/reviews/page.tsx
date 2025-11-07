"use client"
import React, { useState } from 'react'
import { Star, Filter, TrendingUp, Users, MessageCircle, Calendar, ThumbsUp, ThumbsDown } from 'lucide-react'

const ReviewsPage = () => {
    const [filter, setFilter] = useState('all')
    const [timeRange, setTimeRange] = useState('all')

    const reviews = [
        {
            id: 1,
            student: "Alice Johnson",
            rating: 5,
            date: new Date(2024, 0, 26),
            session: "React Fundamentals Masterclass",
            comment: "Excellent session! John explained complex concepts in a very simple way. The hands-on examples were incredibly helpful for understanding React hooks.",
            likes: 3,
            studentLevel: "Intermediate",
            improvements: [],
            response: {
                date: new Date(2024, 0, 26),
                comment: "Thank you Alice! I'm glad you found the session helpful. You're making great progress with React!"
            }
        },
        {
            id: 2,
            student: "Bob Smith",
            rating: 4,
            date: new Date(2024, 0, 25),
            session: "System Design Interview Prep",
            comment: "Very knowledgeable mentor. Covered all the important system design concepts. Would have loved more real-world examples though.",
            likes: 1,
            studentLevel: "Advanced",
            improvements: ["More real-world examples"],
            response: null
        },
        {
            id: 3,
            student: "Carol Davis",
            rating: 5,
            date: new Date(2024, 0, 24),
            session: "JavaScript Advanced Patterns",
            comment: "Absolutely fantastic! The way John breaks down complex patterns into digestible parts is remarkable. Highly recommended!",
            likes: 5,
            studentLevel: "Intermediate",
            improvements: [],
            response: {
                date: new Date(2024, 0, 24),
                comment: "Thank you for the kind words Carol! You're doing amazing work with JavaScript patterns."
            }
        },
        {
            id: 4,
            student: "David Wilson",
            rating: 3,
            date: new Date(2024, 0, 23),
            session: "Career Transition Strategy",
            comment: "Good overall session but felt a bit rushed. Could use more structured approach for career guidance.",
            likes: 0,
            studentLevel: "Beginner",
            improvements: ["More structured approach", "Better pacing"],
            response: {
                date: new Date(2024, 0, 23),
                comment: "Thanks for the feedback David! I'll work on improving the structure and pacing for career sessions."
            }
        },
        {
            id: 5,
            student: "Emma Brown",
            rating: 5,
            date: new Date(2024, 0, 22),
            session: "Node.js Performance Optimization",
            comment: "Mind-blowing session! Learned so many practical optimization techniques that I implemented immediately in my project.",
            likes: 2,
            studentLevel: "Advanced",
            improvements: [],
            response: null
        },
        {
            id: 6,
            student: "Frank Miller",
            rating: 4,
            date: new Date(2024, 0, 21),
            session: "TypeScript Best Practices",
            comment: "Great content and delivery. The code examples were very relevant to real-world scenarios.",
            likes: 1,
            studentLevel: "Intermediate",
            improvements: ["More advanced TypeScript features"],
            response: null
        }
    ]

    const stats = {
        averageRating: 4.3,
        totalReviews: 42,
        fiveStar: 28,
        fourStar: 10,
        threeStar: 3,
        twoStar: 1,
        oneStar: 0,
        responseRate: 85
    }

    const ratingDistribution = [
        { stars: 5, count: 28, percentage: 67 },
        { stars: 4, count: 10, percentage: 24 },
        { stars: 3, count: 3, percentage: 7 },
        { stars: 2, count: 1, percentage: 2 },
        { stars: 1, count: 0, percentage: 0 }
    ]

    const filteredReviews = reviews.filter(review => {
        if (filter === 'all') return true
        if (filter === '5-star') return review.rating === 5
        if (filter === '4-star') return review.rating === 4
        if (filter === '3-star') return review.rating === 3
        if (filter === 'with-response') return review.response !== null
        return true
    })

    const getRatingColor = (rating: number) => {
        if (rating >= 4.5) return 'text-green-600'
        if (rating >= 4.0) return 'text-blue-600'
        if (rating >= 3.0) return 'text-yellow-600'
        return 'text-red-600'
    }

    const renderStars = (rating: number) => {
        return Array.from({ length: 5 }, (_, i) => (
            <Star
                key={i}
                className={`h-5 w-5 ${i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
            />
        ))
    }

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="max-w-7xl mx-auto">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">Reviews & Ratings</h1>
                    <p className="text-gray-600 mt-2">Analyze your performance and student feedback</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
                    <div className="bg-white rounded-xl border p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600">Average Rating</p>
                                <div className="flex items-center space-x-2">
                                    <p className={`text-2xl font-bold ${getRatingColor(stats.averageRating)}`}>
                                        {stats.averageRating}
                                    </p>
                                    <div className="flex">
                                        {renderStars(Math.round(stats.averageRating))}
                                    </div>
                                </div>
                            </div>
                            <TrendingUp className="h-8 w-8 text-green-600" />
                        </div>
                    </div>
                    <div className="bg-white rounded-xl border p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600">Total Reviews</p>
                                <p className="text-2xl font-bold text-gray-900">{stats.totalReviews}</p>
                            </div>
                            <Users className="h-8 w-8 text-blue-600" />
                        </div>
                    </div>
                    <div className="bg-white rounded-xl border p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600">Response Rate</p>
                                <p className="text-2xl font-bold text-gray-900">{stats.responseRate}%</p>
                            </div>
                            <MessageCircle className="h-8 w-8 text-purple-600" />
                        </div>
                    </div>
                    <div className="bg-white rounded-xl border p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600">5-Star Reviews</p>
                                <p className="text-2xl font-bold text-gray-900">{stats.fiveStar}</p>
                            </div>
                            <Star className="h-8 w-8 text-yellow-600 fill-current" />
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                    <div className="lg:col-span-2 bg-white rounded-xl border shadow-sm p-6">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-xl font-semibold text-gray-900">Rating Distribution</h2>
                            <select 
                                value={timeRange}
                                onChange={(e) => setTimeRange(e.target.value)}
                                className="border border-gray-300 rounded-lg px-3 py-2 text-sm"
                            >
                                <option value="all">All Time</option>
                                <option value="month">This Month</option>
                                <option value="quarter">This Quarter</option>
                                <option value="year">This Year</option>
                            </select>
                        </div>
                        <div className="space-y-4">
                            {ratingDistribution.map((item) => (
                                <div key={item.stars} className="flex items-center space-x-4">
                                    <div className="flex items-center space-x-2 w-20">
                                        <div className="flex">
                                            {renderStars(item.stars)}
                                        </div>
                                    </div>
                                    <div className="flex-1">
                                        <div className="w-full bg-gray-200 rounded-full h-3">
                                            <div 
                                                className="bg-yellow-400 h-3 rounded-full"
                                                style={{ width: `${item.percentage}%` }}
                                            ></div>
                                        </div>
                                    </div>
                                    <div className="text-right w-16">
                                        <span className="text-sm font-medium text-gray-900">
                                            {item.count}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="bg-white rounded-xl border shadow-sm p-6">
                        <h2 className="text-xl font-semibold text-gray-900 mb-6">Performance Insights</h2>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                                <div>
                                    <p className="font-medium text-green-800">Communication</p>
                                    <p className="text-sm text-green-600">Excellent</p>
                                </div>
                                <div className="flex">
                                    {renderStars(5)}
                                </div>
                            </div>
                            <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                                <div>
                                    <p className="font-medium text-blue-800">Knowledge</p>
                                    <p className="text-sm text-blue-600">Outstanding</p>
                                </div>
                                <div className="flex">
                                    {renderStars(5)}
                                </div>
                            </div>
                            <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                                <div>
                                    <p className="font-medium text-yellow-800">Pacing</p>
                                    <p className="text-sm text-yellow-600">Good</p>
                                </div>
                                <div className="flex">
                                    {renderStars(4)}
                                </div>
                            </div>
                            <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                                <div>
                                    <p className="font-medium text-purple-800">Materials</p>
                                    <p className="text-sm text-purple-600">Excellent</p>
                                </div>
                                <div className="flex">
                                    {renderStars(5)}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-xl border shadow-sm">
                    <div className="p-6 border-b">
                        <div className="flex items-center justify-between">
                            <h2 className="text-xl font-semibold text-gray-900">Student Reviews</h2>
                            <div className="flex items-center space-x-2">
                                <select 
                                    value={filter}
                                    onChange={(e) => setFilter(e.target.value)}
                                    className="border border-gray-300 rounded-lg px-3 py-2 text-sm"
                                >
                                    <option value="all">All Reviews</option>
                                    <option value="5-star">5 Stars</option>
                                    <option value="4-star">4 Stars</option>
                                    <option value="3-star">3 Stars</option>
                                    <option value="with-response">With Response</option>
                                </select>
                                <button className="flex items-center space-x-2 border border-gray-300 rounded-lg px-3 py-2 text-sm hover:bg-gray-50">
                                    <Filter className="h-4 w-4" />
                                    <span>Filter</span>
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="p-6">
                        <div className="space-y-6">
                            {filteredReviews.map((review) => (
                                <div key={review.id} className="border rounded-xl p-6">
                                    <div className="flex items-start justify-between mb-4">
                                        <div className="flex items-center space-x-3">
                                            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
                                                {review.student.charAt(0)}
                                            </div>
                                            <div>
                                                <h3 className="font-semibold text-gray-900">{review.student}</h3>
                                                <div className="flex items-center space-x-2 text-sm text-gray-600">
                                                    <span className="flex items-center">
                                                        {renderStars(review.rating)}
                                                    </span>
                                                    <span>•</span>
                                                    <span>{review.studentLevel}</span>
                                                    <span>•</span>
                                                    <span>{review.date.toLocaleDateString()}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <button className="flex items-center space-x-1 text-gray-500 hover:text-gray-700">
                                                <ThumbsUp className="h-4 w-4" />
                                                <span className="text-sm">{review.likes}</span>
                                            </button>
                                        </div>
                                    </div>

                                    <div className="mb-4">
                                        <h4 className="font-medium text-gray-900 mb-1">{review.session}</h4>
                                        <p className="text-gray-700 leading-relaxed">{review.comment}</p>
                                    </div>

                                    {review.improvements.length > 0 && (
                                        <div className="mb-4">
                                            <p className="text-sm font-medium text-gray-900 mb-2">Suggested Improvements:</p>
                                            <div className="flex flex-wrap gap-2">
                                                {review.improvements.map((improvement, index) => (
                                                    <span key={index} className="px-3 py-1 bg-yellow-100 text-yellow-800 text-sm rounded-full">
                                                        {improvement}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {review.response ? (
                                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                                            <div className="flex items-center space-x-2 mb-2">
                                                <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
                                                    Y
                                                </div>
                                                <span className="font-medium text-blue-900">Your Response</span>
                                                <span className="text-sm text-blue-700">
                                                    {review.response.date.toLocaleDateString()}
                                                </span>
                                            </div>
                                            <p className="text-blue-800">{review.response.comment}</p>
                                        </div>
                                    ) : (
                                        <div className="flex space-x-3">
                                            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700">
                                                Respond
                                            </button>
                                            <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50">
                                                Thank Student
                                            </button>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="mt-6 bg-white rounded-xl border shadow-sm p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Review Analytics</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        <div className="text-center p-4 bg-green-50 rounded-lg">
                            <p className="text-2xl font-bold text-gray-900">67%</p>
                            <p className="text-sm text-gray-600">5-Star Reviews</p>
                        </div>
                        <div className="text-center p-4 bg-blue-50 rounded-lg">
                            <p className="text-2xl font-bold text-gray-900">24%</p>
                            <p className="text-sm text-gray-600">4-Star Reviews</p>
                        </div>
                        <div className="text-center p-4 bg-yellow-50 rounded-lg">
                            <p className="text-2xl font-bold text-gray-900">7%</p>
                            <p className="text-sm text-gray-600">3-Star Reviews</p>
                        </div>
                        <div className="text-center p-4 bg-red-50 rounded-lg">
                            <p className="text-2xl font-bold text-gray-900">2%</p>
                            <p className="text-sm text-gray-600">Lower Ratings</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ReviewsPage