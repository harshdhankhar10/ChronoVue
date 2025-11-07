"use client"

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import axios from 'axios'
import { Loader } from 'lucide-react'
import Swal from 'sweetalert2'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

const moodOptions = [
    { value: 'HAPPY', label: 'Happy', emoji: '😀' },
    { value: 'SAD', label: 'Sad', emoji: '😔' },
    { value: 'NEUTRAL', label: 'Neutral', emoji: '😐' },
    { value: 'EXCITED', label: 'Excited', emoji: '🤩' },
    { value: 'ANXIOUS', label: 'Anxious', emoji: '😥' },
    { value: 'GRATEFUL', label: 'Grateful', emoji: '🙏' },
    { value: 'STRESSED', label: 'Stressed', emoji: '🤯' },
    { value: 'MOTIVATED', label: 'Motivated', emoji: '🚀' },
    { value: 'REFLECTIVE', label: 'Reflective', emoji: '🧐' }
];
export default function CreateJournalPage() {
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [mood, setMood] = useState('NEUTRAL')
    const [tags, setTags] = useState<string[]>([])
    const [newTag, setNewTag] = useState('')





    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            setLoading(true)
            const response = await axios.post("/api/dashboard/journal/new", {
                title, content, tags, mood
            })

            if (response.status === 201) {
                Swal.fire({
                    icon: "success",
                    title: 'Success',
                    text: response.data.message,
                    showConfirmButton: true
                }).then(() => {
                    router.push("/dashboard/user/journal")
                })
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: response.data.error || 'Something went wrong!',
                });
            }

        } catch (error:any) {
            console.log(error); console.log(error);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: error?.response?.data?.error || 'Something went wrong!',
            });
        }finally{
            setLoading(false)
        }

    }

    const removeTag = (tagToRemove: string) => {
        setTags(prev => prev.filter(tag => tag !== tagToRemove))
    }

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            e.preventDefault()
            setTags((prev)=> [...tags, newTag])
            setNewTag('')
        }
    }

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-4xl mx-auto px-4">
                <header className="mb-8">
                    <Link
                        href="/journal"
                        className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-4"
                    >
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                        </svg>
                        Back to Journals
                    </Link>
                    <h1 className="text-3xl font-bold text-gray-900">New Journal Entry</h1>
                    <p className="text-gray-600 mt-2">Write about your thoughts, experiences, and reflections</p>
                </header>

                <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    <div className="space-y-6">
                        <div>
                            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                                Title
                            </label>
                            <Input
                                type="text"
                                id="title"
                                required
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                placeholder="Give your journal entry a title"
                            />
                        </div>

                        <div>
                            <label htmlFor="mood" className="block text-sm font-medium text-gray-700 mb-2">
                                How are you feeling?
                            </label>
                            <select
                                id="mood"
                                value={mood}
                                onChange={(e) => setMood(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-600 focus:border-transparent"
                            >
                                {moodOptions.map(option => (
                                    <option key={option.value} value={option.value}>
                                        {option.emoji} {option.label}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-2">
                                Your Thoughts
                            </label>
                            <textarea
                                id="content"
                                required
                                rows={12}
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-600 focus:border-transparent resize-vertical"
                                placeholder="Write about your day, your thoughts, your experiences..."
                            />
                        </div>

                        <div>
                            <label htmlFor="tags" className="block text-sm font-medium text-gray-700 mb-2">
                                Tags
                            </label>
                            <div className="flex gap-2 mb-2">
                                <Input
                                    type="text"
                                    value={newTag}
                                    onChange={(e) => setNewTag(e.target.value)}
                                    onKeyPress={handleKeyPress}
                                    placeholder="Add a tag and press Enter"
                                />
                            </div>

                            {tags.length > 0 && (
                                <div className="flex flex-wrap gap-2">
                                    {tags.map((tag, index) => (
                                        <span key={index} className="inline-flex items-center px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
                                            {tag}
                                            <button
                                                type="button"
                                                onClick={() => removeTag(tag)}
                                                className="ml-2 hover:text-blue-900"
                                            >
                                                ×
                                            </button>
                                        </span>
                                    ))}
                                </div>
                            )}
                        </div>

                        <div className="flex justify-end gap-4 pt-4 border-t">
                            <Button
                                type="submit"
                                disabled={loading}
                            >
                                {loading ? <Loader className='animate-spin' /> : "Save Journal Entry"}
                            </Button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}