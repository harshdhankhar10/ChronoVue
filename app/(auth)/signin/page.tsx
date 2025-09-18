"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import axios from 'axios';
import { signIn } from 'next-auth/react';
import { Loader } from 'lucide-react';
import { useRouter } from 'next/navigation';

const SignInForm = () => {
    const [loading, setLoading] = useState(false)
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState<String | null>(null)
    const [message, setMessage] = useState<String | null>(null)
    const router = useRouter();

    const handleSignIn = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            setLoading(true)
            const response = await signIn('credentials', {
                email, password, redirect: false
            })
            if (response?.error) {
                setError(response.error);
                setTimeout(() => {
                    if (response.error === "Please verify your email before logging in.") {
                        localStorage.setItem('emailForVerification', email);
                        router.push("/verify-email")
                    }
                }, 1500)
            } else {
                setMessage("Login Sucessfull. Redirecting to Dashboard...")
                setTimeout(() => {
                    router.push("/dashboard")
                }, 1500)
            }
        } catch (error) {
            console.log(error)
            setError("An error occurred during login");
        } finally {
            setLoading(false)
        }
    }

    const handleLoginWithGoogle = async () => {
        try {
            setLoading(true);
            await signIn('google', {
                redirect: false,
                callbackUrl: "/"
            })
        } catch (error) {
            console.log(error);
            setError("Failed to sign in with Google");
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen flex justify-center items-center bg-gray-50">
            <Navbar />
            <div className="flex mt-12 items-center p-8 justify-center bordered-500 rounded-lg shadow-lg bg-white mx-4">
                <div className="max-w-md w-full">


                    <h2 className="text-3xl font-bold text-gray-900 font-rajdhani">Sign In to Your Account</h2>
                    {error && (
                        <div className="mt-4 p-4 bg-red-100 text-red-700 border border-red-400 rounded">
                            {error}
                        </div>
                    )}
                    {message && (
                        <div className="mt-4 p-3 bg-green-100 text-green-700 border border-green-400 rounded">
                            {message}
                        </div>
                    )}


                    <form className="space-y-6 mt-6" onSubmit={handleSignIn}>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                                Email address
                            </label>
                            <Input
                                id="email"
                                name="email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="you@example.com"
                            />
                        </div>

                        <div>
                            <div className="flex items-center justify-between">
                                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                                    Password
                                </label>

                            </div>
                            <Input
                                id="password"
                                name="password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="••••••••"
                            />
                            <Link href="/forgot-password" className="text-sm text-teal-600 font-semibold hover:underline text-right mt-2 block">
                                Forgot password?
                            </Link>

                        </div>

                        <div>
                            <Button disabled={loading} className="w-full py-3 px-6 rounded-full font-medium">
                                {loading ? <Loader className='animate-spin' /> : <span>Log In</span>}
                            </Button>
                        </div>
                    </form>
                    <div className="mt-8">
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-gray-300"></div>
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="px-2 bg-gray-50 text-gray-500">Or continue with</span>
                            </div>
                        </div>

                        <div className="mt-6 grid grid-cols-2 gap-3">
                            <div>
                                <Button disabled variant="outline" className="w-full py-3 px-4 rounded-full">
                                    <img src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png" alt="GitHub Logo" className="w-5 h-5 mr-2 inline-block" />
                                    GitHub
                                </Button>
                            </div>

                            <div>
                                <Button onClick={handleLoginWithGoogle}
                                    disabled={loading}
                                    variant="outline" className="w-full py-3 px-4 rounded-full">
                                    <img src="https://static.vecteezy.com/system/resources/thumbnails/046/861/647/small_2x/google-logo-transparent-background-free-png.png" alt="Google Logo" className="w-5 h-5 mr-2 inline-block" />
                                    Google
                                </Button>
                            </div>
                        </div>
                        <div>
                            <p className="mt-6 text-sm text-center text-gray-500">
                                Don't have an account?{' '}
                                <Link href="/signup" className="text-teal-600 font-semibold hover:underline">
                                    Sign Up
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignInForm;