"use client"
import React, { useState } from 'react'
import { TrendingUp, DollarSign, Calendar, Download, Filter } from 'lucide-react'

const EarningsPage = () => {
    const [timeRange, setTimeRange] = useState('month')
    
    const earningsData = {
        totalEarnings: 125400,
        sessionsCompleted: 42,
        averageSessionPrice: 2985,
        upcomingPayout: 35600
    }

    const transactions = [
        {
            id: 1,
            date: new Date(2024, 0, 26),
            student: "Alice Johnson",
            session: "React Fundamentals",
            amount: 1200,
            status: "completed",
            type: "ONE_ON_ONE"
        },
        {
            id: 2,
            date: new Date(2024, 0, 25),
            student: "Group Session",
            session: "Advanced JavaScript",
            amount: 3000,
            status: "completed", 
            type: "GROUP"
        },
        {
            id: 3,
            date: new Date(2024, 0, 24),
            student: "Bob Smith",
            session: "System Design",
            amount: 1800,
            status: "pending",
            type: "ONE_ON_ONE"
        },
        {
            id: 4,
            date: new Date(2024, 0, 23),
            student: "Carol Davis",
            session: "Career Guidance",
            amount: 1200,
            status: "completed",
            type: "ONE_ON_ONE"
        },
        {
            id: 5,
            date: new Date(2024, 0, 22),
            student: "Group Session", 
            session: "Node.js Workshop",
            amount: 2700,
            status: "completed",
            type: "GROUP"
        }
    ]

    const monthlyEarnings = [
        { month: 'Jan', earnings: 125400 },
        { month: 'Dec', earnings: 118200 },
        { month: 'Nov', earnings: 109800 },
        { month: 'Oct', earnings: 95600 },
        { month: 'Sep', earnings: 87400 },
        { month: 'Aug', earnings: 78900 }
    ]

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="max-w-7xl mx-auto">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">Earnings</h1>
                    <p className="text-gray-600 mt-2">Track your earnings and financial performance</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
                    <div className="bg-white rounded-xl border p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600">Total Earnings</p>
                                <p className="text-2xl font-bold text-gray-900">₹1,25,400</p>
                            </div>
                            <DollarSign className="h-8 w-8 text-green-600" />
                        </div>
                        <div className="flex items-center mt-2 text-green-600 text-sm">
                            <TrendingUp className="h-4 w-4 mr-1" />
                            <span>+12% from last month</span>
                        </div>
                    </div>
                    <div className="bg-white rounded-xl border p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600">Sessions Completed</p>
                                <p className="text-2xl font-bold text-gray-900">42</p>
                            </div>
                            <Calendar className="h-8 w-8 text-blue-600" />
                        </div>
                    </div>
                    <div className="bg-white rounded-xl border p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600">Avg Session Price</p>
                                <p className="text-2xl font-bold text-gray-900">₹2,985</p>
                            </div>
                            <TrendingUp className="h-8 w-8 text-purple-600" />
                        </div>
                    </div>
                    <div className="bg-white rounded-xl border p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600">Upcoming Payout</p>
                                <p className="text-2xl font-bold text-gray-900">₹35,600</p>
                            </div>
                            <DollarSign className="h-8 w-8 text-orange-600" />
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                    <div className="lg:col-span-2 bg-white rounded-xl border shadow-sm p-6">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-xl font-semibold text-gray-900">Earnings Overview</h2>
                            <div className="flex space-x-2">
                                <select 
                                    value={timeRange}
                                    onChange={(e) => setTimeRange(e.target.value)}
                                    className="border border-gray-300 rounded-lg px-3 py-2 text-sm"
                                >
                                    <option value="week">This Week</option>
                                    <option value="month">This Month</option>
                                    <option value="quarter">This Quarter</option>
                                    <option value="year">This Year</option>
                                </select>
                                <button className="flex items-center space-x-2 border border-gray-300 rounded-lg px-3 py-2 text-sm hover:bg-gray-50">
                                    <Download className="h-4 w-4" />
                                    <span>Export</span>
                                </button>
                            </div>
                        </div>
                        <div className="space-y-4">
                            {monthlyEarnings.map((item, index) => (
                                <div key={index} className="flex items-center justify-between">
                                    <span className="font-medium text-gray-900">{item.month}</span>
                                    <div className="flex items-center space-x-4">
                                        <div className="w-48 bg-gray-200 rounded-full h-3">
                                            <div 
                                                className="bg-green-600 h-3 rounded-full"
                                                style={{ width: `${(item.earnings / 130000) * 100}%` }}
                                            ></div>
                                        </div>
                                        <span className="font-semibold text-gray-900 w-20 text-right">
                                            ₹{item.earnings.toLocaleString()}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="bg-white rounded-xl border shadow-sm p-6">
                        <h2 className="text-xl font-semibold text-gray-900 mb-6">Revenue Sources</h2>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-3">
                                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                                    <span className="text-sm text-gray-700">1-on-1 Sessions</span>
                                </div>
                                <span className="font-semibold">68%</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-3">
                                    <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                                    <span className="text-sm text-gray-700">Group Sessions</span>
                                </div>
                                <span className="font-semibold">24%</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-3">
                                    <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                                    <span className="text-sm text-gray-700">Workshops</span>
                                </div>
                                <span className="font-semibold">8%</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-xl border shadow-sm">
                    <div className="p-6 border-b">
                        <div className="flex items-center justify-between">
                            <h2 className="text-xl font-semibold text-gray-900">Recent Transactions</h2>
                            <button className="flex items-center space-x-2 border border-gray-300 rounded-lg px-3 py-2 text-sm hover:bg-gray-50">
                                <Filter className="h-4 w-4" />
                                <span>Filter</span>
                            </button>
                        </div>
                    </div>

                    <div className="p-6">
                        <div className="space-y-4">
                            {transactions.map((transaction) => (
                                <div key={transaction.id} className="flex items-center justify-between p-4 border rounded-lg">
                                    <div className="flex items-center space-x-4">
                                        <div className={`p-3 rounded-lg ${
                                            transaction.type === 'GROUP' ? 'bg-purple-100 text-purple-600' : 'bg-blue-100 text-blue-600'
                                        }`}>
                                            <DollarSign className="h-6 w-6" />
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-gray-900">{transaction.session}</h3>
                                            <p className="text-sm text-gray-600">{transaction.student}</p>
                                            <p className="text-xs text-gray-500">{transaction.date.toLocaleDateString()}</p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-lg font-bold text-gray-900">₹{transaction.amount}</p>
                                        <span className={`text-xs px-2 py-1 rounded-full ${
                                            transaction.status === 'completed' 
                                                ? 'bg-green-100 text-green-800' 
                                                : 'bg-yellow-100 text-yellow-800'
                                        }`}>
                                            {transaction.status}
                                        </span>
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

export default EarningsPage