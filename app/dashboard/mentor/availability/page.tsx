"use client"
import React, { useState } from 'react'
import { Clock, Calendar, Plus, Trash2, Save } from 'lucide-react'

const AvailabilityPage = () => {
    const [availability, setAvailability] = useState([
        { id: 1, day: 'Monday', startTime: '09:00', endTime: '17:00', enabled: true },
        { id: 2, day: 'Tuesday', startTime: '09:00', endTime: '17:00', enabled: true },
        { id: 3, day: 'Wednesday', startTime: '09:00', endTime: '17:00', enabled: true },
        { id: 4, day: 'Thursday', startTime: '09:00', endTime: '17:00', enabled: true },
        { id: 5, day: 'Friday', startTime: '09:00', endTime: '17:00', enabled: true },
        { id: 6, day: 'Saturday', startTime: '10:00', endTime: '14:00', enabled: false },
        { id: 7, day: 'Sunday', startTime: '00:00', endTime: '00:00', enabled: false }
    ])

    const updateAvailability = (id: number, field: string, value: any) => {
        setAvailability(prev => prev.map(item => 
            item.id === id ? { ...item, [field]: value } : item
        ))
    }

    const addSlot = () => {
        setAvailability(prev => [...prev, {
            id: prev.length + 1,
            day: 'Monday',
            startTime: '09:00',
            endTime: '17:00',
            enabled: true
        }])
    }

    const removeSlot = (id: number) => {
        setAvailability(prev => prev.filter(item => item.id !== id))
    }

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="max-w-4xl mx-auto">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">Availability</h1>
                    <p className="text-gray-600 mt-2">Set your available hours for mentoring sessions</p>
                </div>

                <div className="bg-white rounded-xl border shadow-sm">
                    <div className="p-6 border-b">
                        <div className="flex items-center justify-between">
                            <div>
                                <h2 className="text-xl font-semibold text-gray-900">Weekly Schedule</h2>
                                <p className="text-gray-600 mt-1">Students can book sessions during your available hours</p>
                            </div>
                            <button 
                                onClick={addSlot}
                                className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                            >
                                <Plus className="h-4 w-4" />
                                <span>Add Slot</span>
                            </button>
                        </div>
                    </div>

                    <div className="p-6">
                        <div className="space-y-4">
                            {availability.map((slot) => (
                                <div key={slot.id} className="flex items-center space-x-4 p-4 border rounded-lg">
                                    <div className="flex items-center space-x-3 flex-1">
                                        <input
                                            type="checkbox"
                                            checked={slot.enabled}
                                            onChange={(e) => updateAvailability(slot.id, 'enabled', e.target.checked)}
                                            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                        />
                                        <select
                                            value={slot.day}
                                            onChange={(e) => updateAvailability(slot.id, 'day', e.target.value)}
                                            className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        >
                                            <option value="Monday">Monday</option>
                                            <option value="Tuesday">Tuesday</option>
                                            <option value="Wednesday">Wednesday</option>
                                            <option value="Thursday">Thursday</option>
                                            <option value="Friday">Friday</option>
                                            <option value="Saturday">Saturday</option>
                                            <option value="Sunday">Sunday</option>
                                        </select>
                                        <div className="flex items-center space-x-2">
                                            <Clock className="h-4 w-4 text-gray-400" />
                                            <input
                                                type="time"
                                                value={slot.startTime}
                                                onChange={(e) => updateAvailability(slot.id, 'startTime', e.target.value)}
                                                className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                disabled={!slot.enabled}
                                            />
                                            <span className="text-gray-500">to</span>
                                            <input
                                                type="time"
                                                value={slot.endTime}
                                                onChange={(e) => updateAvailability(slot.id, 'endTime', e.target.value)}
                                                className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                disabled={!slot.enabled}
                                            />
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => removeSlot(slot.id)}
                                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                                    >
                                        <Trash2 className="h-4 w-4" />
                                    </button>
                                </div>
                            ))}
                        </div>

                        <div className="flex justify-end space-x-3 mt-6 pt-6 border-t">
                            <button className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50">
                                Cancel
                            </button>
                            <button className="flex items-center space-x-2 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">
                                <Save className="h-4 w-4" />
                                <span>Save Changes</span>
                            </button>
                        </div>
                    </div>
                </div>

                <div className="mt-6 bg-white rounded-xl border shadow-sm p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Stats</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="text-center p-4 bg-blue-50 rounded-lg">
                            <Calendar className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                            <p className="text-2xl font-bold text-gray-900">5</p>
                            <p className="text-sm text-gray-600">Available Days</p>
                        </div>
                        <div className="text-center p-4 bg-green-50 rounded-lg">
                            <Clock className="h-8 w-8 text-green-600 mx-auto mb-2" />
                            <p className="text-2xl font-bold text-gray-900">40</p>
                            <p className="text-sm text-gray-600">Weekly Hours</p>
                        </div>
                        <div className="text-center p-4 bg-purple-50 rounded-lg">
                            <p className="text-2xl font-bold text-gray-900">92%</p>
                            <p className="text-sm text-gray-600">Booking Rate</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AvailabilityPage