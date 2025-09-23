"use client"

import React, { useState } from 'react'
import axios from 'axios'
import { Button } from '@/components/ui/button';
import { Loader, X } from 'lucide-react';
import Swal from 'sweetalert2';
import { useRouter } from 'next/navigation';


const AISuggestions = ({ suggestions, timelineID }: { suggestions: any[], timelineID: string }) => {


    const [isModalOpen, setIsModalOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [additionalContext, setAdditionalContext] = useState('');
    const [viewMoreModalOpen, setViewMoreModalOpen] = useState(false);
    const [selectedSuggestion, setSelectedSuggestion] = useState<any>(null);
    const router = useRouter();

    const handleGenerateSuggestions = async () => {
        setLoading(true);
        try {
            const response = await axios.post('/api/dashboard/timelines/AISuggestions', {
                timelineID, additionalContext

            })

            if (response.status === 201) {
                Swal.fire({
                    icon: 'success',
                    title: 'AI Suggestions Generated',
                    text: response.data.message,
                });
                router.refresh();
                setIsModalOpen(false);
                setLoading(false);
                setAdditionalContext('');
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: response.data.error || 'Something went wrong!',
                });
                setLoading(false);
            }

        } catch (error:any) {
            console.error('Error generating AI suggestions:', error);
            if(error.response.data.error === 'Sorry Dear! You can only generate one AI suggestion per day. Please try again tomorrow.'){
                Swal.fire({
                    icon: 'info',
                    title: 'Daily Limit Reached',
                    text: error.response.data.error,
                    
                }).then(() => {
                    setIsModalOpen(false);
                });
            }else{
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: error.response?.data?.error || 'Something went wrong!',
            });
        }
        }finally{
            setLoading(false);
        }
    }

    const handleViewMore = (suggestion: any) => {
        setSelectedSuggestion(suggestion);
        setViewMoreModalOpen(true);
    }

    return (
        <>
            <div className="lg:col-span-1">
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 sticky top-20">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-lg font-semibold text-gray-900">AI Suggestions</h2>
                        <Button variant={'outline'} className='border-primary' onClick={() => setIsModalOpen(true)}>
                            Generate New Suggestion
                        </Button>
                    </div>
                    <div className="space-y-3">
                        {suggestions && suggestions.length > 0 ? (
                            suggestions.map((suggestion: any, index) => (
                                <div
                                    key={index}
                                    className="p-4 bg-blue-50 border border-blue-200 rounded-lg shadow-sm space-y-2"
                                >
                                    <p className="text-blue-800 text-sm font-medium">
                                        {suggestion.content}
                                    </p>
                                    <div className="flex justify-between items-center">
                                        <span className="text-gray-500 text-xs">
                                            {suggestion.date}
                                        </span>
                                          <button
                                        className="text-blue-600 text-xs hover:underline focus:outline-none"
                                        onClick={() => handleViewMore(suggestion)}
                                        aria-label={`View more about suggestion ${index + 1}`}
                                    >
                                        View More
                                    </button>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="text-center py-4">
                                <div className="mx-auto h-8 w-8 text-gray-400 mb-2">
                                    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                                    </svg>
                                </div>
                                <h3 className="text-sm font-medium text-gray-900 mb-1">No suggestions yet</h3>
                                <p className="text-gray-500 text-xs mb-3">Get started by requesting AI suggestions.</p>
                                <div>
                                    <Button className="bg-secondary hover:bg-secondary/90 text-white" onClick={() => setIsModalOpen(true)}>
                                        Generate Suggestions
                                    </Button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-lg max-w-md w-full p-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Generate AI Suggestions</h3>
                        <p className="text-sm text-gray-600 mb-4">If you want to add any additional context to your timeline, you can add it below. This will help the AI provide more tailored suggestions.</p>
                        <textarea onChange={(e) => setAdditionalContext(e.target.value)} value={additionalContext} name="additionalContext" id="additionalContext"
                            className="w-full border border-gray-300 rounded-md p-2" rows={4} placeholder="Any Additional Information you want to add?"></textarea>
                        <div className="mt-4 flex justify-end gap-2">
                            <Button className="bg-gray-200 hover:bg-gray-300 text-gray-800" onClick={() => setIsModalOpen(false)}>
                                Cancel
                            </Button>
                            <Button onClick={handleGenerateSuggestions} className="bg-secondary hover:bg-secondary/90 text-white" disabled={loading}>
                                {loading ? <Loader className='animate-spin' /> : <span>Generate</span>}
                            </Button>
                        </div>
                    </div>
                </div>
            )}

{viewMoreModalOpen && selectedSuggestion && (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
        <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[85vh] flex flex-col">
            <div className="bg-primary px-6 py-4 rounded-t-2xl">
                <div className="flex justify-between items-center">
                    <h3 className="text-xl font-bold text-white">Suggestion Details</h3>
                    <Button variant={'destructive'}
                        onClick={() => setViewMoreModalOpen(false)}
                    >
                        Close
                    </Button>
                </div>
            </div>
            
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
                <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                        Content
                    </h4>
                    <p className="text-gray-700 bg-gray-50 p-4 rounded-lg border text-sm leading-relaxed">
                        {selectedSuggestion.content}
                    </p>
                </div>
                <div className='flex flex-col md:flex-row gap-6'>

                <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                        What To Do
                    </h4>
                    <ul className="space-y-2 bg-green-50 p-4 rounded-lg border">
                        {selectedSuggestion.whatToDo.map((point: string, idx: number) => (
                            <li key={idx} className="flex items-start">
                                <span className="bg-green-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs mr-3 mt-0.5 flex-shrink-0">✓</span>
                                <span className="text-gray-700 text-sm">{point}</span>
                            </li>
                        ))}
                    </ul>
                </div>

                <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                        What Not To Do
                    </h4>
                    <ul className="space-y-2 bg-red-50 p-4 rounded-lg border">
                        {selectedSuggestion.whatNotToDo.map((point: string, idx: number) => (
                            <li key={idx} className="flex items-start">
                                <span className="bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs mr-3 mt-0.5 flex-shrink-0">✕</span>
                                <span className="text-gray-700 text-sm">{point}</span>
                            </li>
                        ))}
                    </ul>
                </div>
</div>
                <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                        My Personal Opinion
                    </h4>
                    <div className="bg-orange-50 border-l-4 border-primary p-4 rounded-r">
                        <p className="text-gray-700 text-sm italic leading-relaxed">{selectedSuggestion.personalOpinion}</p>
                    </div>
                </div>
            </div>

           
        </div>
    </div>
)}        </>
    )
}

export default AISuggestions