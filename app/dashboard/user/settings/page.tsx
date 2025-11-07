"use client"
import React, { useState } from 'react'
import { User, CreditCard, Settings, Bell, Shield, HelpCircle, LogOut } from 'lucide-react'

const SettingsSidebar = () => {
    const [activeTab, setActiveTab] = useState('profile')

    const menuItems = [
        { id: 'profile', label: 'Profile', icon: User },
        { id: 'transactions', label: 'Transactions', icon: CreditCard },
        { id: 'notifications', label: 'Notifications', icon: Bell },
        { id: 'security', label: 'Security', icon: Shield },
        { id: 'preferences', label: 'Preferences', icon: Settings },
        { id: 'help', label: 'Help & Support', icon: HelpCircle },
    ]

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 py-8">
                <div className="flex gap-8">
                    {/* Sidebar */}
                    <div className="w-64 flex-shrink-0">
                        <div className="bg-white rounded-lg border shadow-sm">
                            <div className="p-6 border-b">
                                <h2 className="text-lg font-semibold text-gray-900">Settings</h2>
                            </div>
                            <nav className="p-2">
                                {menuItems.map((item) => {
                                    const Icon = item.icon
                                    return (
                                        <button
                                            key={item.id}
                                            onClick={() => setActiveTab(item.id)}
                                            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${
                                                activeTab === item.id
                                                    ? 'bg-blue-50 text-blue-700 border border-blue-200'
                                                    : 'text-gray-700 hover:bg-gray-50'
                                            }`}
                                        >
                                            <Icon className="h-5 w-5" />
                                            <span className="font-medium">{item.label}</span>
                                        </button>
                                    )
                                })}
                                <div className="border-t mt-4 pt-4">
                                    <button className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left text-red-600 hover:bg-red-50 transition-colors">
                                        <LogOut className="h-5 w-5" />
                                        <span className="font-medium">Logout</span>
                                    </button>
                                </div>
                            </nav>
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="flex-1">
                        {activeTab === 'profile' && <ProfileContent />}
                        {activeTab === 'transactions' && <TransactionsContent />}
                        {activeTab === 'notifications' && <NotificationsContent />}
                        {activeTab === 'security' && <SecurityContent />}
                        {activeTab === 'preferences' && <PreferencesContent />}
                        {activeTab === 'help' && <HelpContent />}
                    </div>
                </div>
            </div>
        </div>
    )
}

// Profile Content Component
const ProfileContent = () => {
    return (
        <div className="bg-white rounded-lg border shadow-sm">
            <div className="p-6 border-b">
                <h1 className="text-2xl font-bold text-gray-900">Profile Settings</h1>
                <p className="text-gray-600 mt-1">Manage your personal information</p>
            </div>
            <div className="p-6">
                <div className="max-w-2xl space-y-6">
                    <div className="flex items-center space-x-6">
                        <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-xl font-bold">
                            JD
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold text-gray-900">John Doe</h3>
                            <p className="text-gray-600">Senior Software Engineer</p>
                            <button className="text-blue-600 text-sm font-medium mt-2">Change Photo</button>
                        </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                            <input 
                                type="text" 
                                defaultValue="John Doe"
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                            <input 
                                type="email" 
                                defaultValue="john.doe@example.com"
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                            <input 
                                type="tel" 
                                defaultValue="+91 98765 43210"
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                            <input 
                                type="text" 
                                defaultValue="Mumbai, India"
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                    </div>
                    
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Bio</label>
                        <textarea 
                            rows={4}
                            defaultValue="Passionate software developer with 5+ years of experience in web development."
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    
                    <div className="flex justify-end">
                        <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                            Save Changes
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

// Transactions Content Component
const TransactionsContent = () => {
    const transactions = [
        { id: 'pay_RY5YWUyvGdaVcf', amount: 499, status: 'COMPLETED', date: '2025-10-26', type: 'MENTOR_APPLICATION' },
        { id: 'pay_ABC123xyz456', amount: 299, status: 'PENDING', date: '2025-10-25', type: 'PREMIUM_SUBSCRIPTION' },
        { id: 'pay_DEF789uvw012', amount: 199, status: 'COMPLETED', date: '2025-10-20', type: 'WORKSHOP' },
    ]

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'COMPLETED': return 'bg-green-100 text-green-800'
            case 'PENDING': return 'bg-yellow-100 text-yellow-800'
            case 'FAILED': return 'bg-red-100 text-red-800'
            default: return 'bg-gray-100 text-gray-800'
        }
    }

    return (
        <div className="bg-white rounded-lg border shadow-sm">
            <div className="p-6 border-b">
                <h1 className="text-2xl font-bold text-gray-900">Transaction History</h1>
                <p className="text-gray-600 mt-1">View all your payment transactions</p>
            </div>
            <div className="p-6">
                <div className="space-y-4">
                    {transactions.map((transaction) => (
                        <div key={transaction.id} className="flex items-center justify-between p-4 border rounded-lg">
                            <div>
                                <h3 className="font-medium text-gray-900">
                                    {transaction.type.replace('_', ' ')}
                                </h3>
                                <p className="text-sm text-gray-600">ID: {transaction.id}</p>
                                <p className="text-xs text-gray-500">{transaction.date}</p>
                            </div>
                            <div className="text-right">
                                <p className="text-lg font-semibold text-gray-900">₹{transaction.amount}</p>
                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(transaction.status)}`}>
                                    {transaction.status}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

// Notifications Content Component
const NotificationsContent = () => {
    return (
        <div className="bg-white rounded-lg border shadow-sm">
            <div className="p-6 border-b">
                <h1 className="text-2xl font-bold text-gray-900">Notification Settings</h1>
                <p className="text-gray-600 mt-1">Manage your notification preferences</p>
            </div>
            <div className="p-6">
                <div className="max-w-2xl space-y-6">
                    {['Email Notifications', 'Push Notifications', 'SMS Alerts', 'Mentor Requests', 'Community Updates'].map((item) => (
                        <div key={item} className="flex items-center justify-between">
                            <div>
                                <h3 className="font-medium text-gray-900">{item}</h3>
                                <p className="text-sm text-gray-600">Receive {item.toLowerCase()}</p>
                            </div>
                            <button className="w-12 h-6 bg-blue-600 rounded-full relative">
                                <span className="absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform"></span>
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

// Security Content Component
const SecurityContent = () => {
    return (
        <div className="bg-white rounded-lg border shadow-sm">
            <div className="p-6 border-b">
                <h1 className="text-2xl font-bold text-gray-900">Security Settings</h1>
                <p className="text-gray-600 mt-1">Manage your account security</p>
            </div>
            <div className="p-6">
                <div className="max-w-2xl space-y-6">
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                        <div>
                            <h3 className="font-medium text-gray-900">Change Password</h3>
                            <p className="text-sm text-gray-600">Update your password regularly</p>
                        </div>
                        <button className="text-blue-600 font-medium">Change</button>
                    </div>
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                        <div>
                            <h3 className="font-medium text-gray-900">Two-Factor Authentication</h3>
                            <p className="text-sm text-gray-600">Add an extra layer of security</p>
                        </div>
                        <button className="text-blue-600 font-medium">Enable</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

// Preferences Content Component
const PreferencesContent = () => {
    return (
        <div className="bg-white rounded-lg border shadow-sm">
            <div className="p-6 border-b">
                <h1 className="text-2xl font-bold text-gray-900">Preferences</h1>
                <p className="text-gray-600 mt-1">Customize your experience</p>
            </div>
            <div className="p-6">
                <div className="max-w-2xl space-y-6">
                    {['Language', 'Timezone', 'Theme', 'Privacy Settings'].map((item) => (
                        <div key={item} className="flex items-center justify-between p-4 border rounded-lg">
                            <div>
                                <h3 className="font-medium text-gray-900">{item}</h3>
                                <p className="text-sm text-gray-600">Configure {item.toLowerCase()} preferences</p>
                            </div>
                            <button className="text-blue-600 font-medium">Configure</button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

// Help Content Component
const HelpContent = () => {
    return (
        <div className="bg-white rounded-lg border shadow-sm">
            <div className="p-6 border-b">
                <h1 className="text-2xl font-bold text-gray-900">Help & Support</h1>
                <p className="text-gray-600 mt-1">Get help with your account</p>
            </div>
            <div className="p-6">
                <div className="max-w-2xl space-y-6">
                    {['Contact Support', 'Help Center', 'Report a Problem', 'FAQs'].map((item) => (
                        <div key={item} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 cursor-pointer">
                            <div>
                                <h3 className="font-medium text-gray-900">{item}</h3>
                                <p className="text-sm text-gray-600">Get assistance with {item.toLowerCase()}</p>
                            </div>
                            <button className="text-gray-400">→</button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default SettingsSidebar