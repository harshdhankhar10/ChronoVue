"use client";

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';

const NotFound = () => {
    const params = useParams();
    const [requestedPath, setRequestedPath] = useState('');
    const router = useRouter();

    useEffect(() => {
        if (params) {
            const path = window.location.pathname;
            setRequestedPath(path);
        }
    }, [params]);

    return (
        <div className="min-h-screen  bg-gray-50 flex flex-col antialiased">
            <div className="absolute   top-0 left-0 right-0 p-6">
                <div className="flex items-center space-x-2">
                        <Link href="/" className="flex items-center space-x-2">
                            <Image src="/final_logo.png" alt="ChronoVue Logo"
                                width={50}
                                height={40}
                            />
                            <span className="font-bold text-2xl">Chrono<span className="text-primary">Vue</span></span>
                        </Link>
                    </div>
            </div>

            <main className="flex-grow flex items-center justify-center p-6 pt-20">
                <div className="container mx-auto max-w-6xl">
                    <div className="grid md:grid-cols-2 gap-12 items-center">

                        <div className="max-w-md mx-auto order-2 md:order-1">
                            <div className="relative">
                                <Image
                                    src="/page_not_found_error_illustration.svg"
                                    alt="404 Error Illustration"
                                    width={800}
                                    height={800}
                                    className=" "
                                />
                                <div className="absolute -inset-3 bg-gradient-to-r from-teal-400 to-purple-500 rounded-lg opacity-20 blur-lg -z-10"></div>
                            </div>
                        </div>

                        <div className="text-center md:text-left order-1 md:order-2">
                            <p className="text-lg font-semibold text-teal-600 mb-2">404 ERROR</p>
                            <h1 className="text-4xl md:text-5xl font-bold text-primary tracking-tight mb-4 font-rajdhani">
                                Page Not Found
                            </h1>

                            {requestedPath && (
                                <div className="mb-6 p-4 bg-red-50 rounded-lg border border-red-200">
                                    <p className="text-red-700 font-medium">
                                        The path <code className="bg-red-100 px-2 py-1 rounded text-red-800">{requestedPath}</code> was not found.
                                    </p>
                                </div>
                            )}

                            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                                The page you're looking for might have been moved, deleted, or maybe it never existed.
                                Don't worry, let's get you back on track.
                            </p>

                            <div className="mb-8">
                                <p className="font-semibold text-gray-700 mb-3">Try searching our site:</p>
                                <div className="relative max-w-sm mx-auto md:mx-0">
                                    <input
                                        type="text"
                                        placeholder="e.g., Pricing or Features"
                                        className="w-full border border-gray-300 rounded-full py-3 pl-5 pr-12 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200"
                                    />
                                    <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 " />
                                </div>
                            </div>

                            <div className="flex flex-col sm:flex-row gap-4">
                                <Button onClick={() => router.push('/')} >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                                    </svg>
                                    Go to Homepage
                                </Button>

                                <Button variant={'outline'}
                                    onClick={() => window.history.back()}                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                                    </svg>
                                    Go Back
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <footer className="py-6 text-center text-gray-500 text-sm">
                <p>© {new Date().getFullYear()} ChronoVue. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default NotFound;