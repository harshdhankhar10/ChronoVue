"use client";

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Image from 'next/image';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSeparator,
    InputOTPSlot,
} from "@/components/ui/input-otp"
import { Loader, X } from 'lucide-react';
import axios from 'axios';


const ForgotPasswordForm = () => {
    const [error, setError] = useState<String | null>(null)
    const [message, setMessage] = useState<String | null>(null)
    const [otp, setOtp] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [loading, setLoading] = useState(false)
    const [email, setEmail] = useState("")
    const [newPassword, setNewPassword] = useState("")
    const router = useRouter()



    const handleSendOTP = async (e: React.FormEvent) => {
        e.preventDefault()
        setError('')
        setMessage('')
        try {
            setLoading(true)
            const response = await axios.post("/api/auth/reset-password", {
                email
            })
            if (response.status === 201) {
                setMessage(response.data.message);
                setTimeout(() => {
                    setIsModalOpen(true)
                }, 1500)
            } else {
                setError(response.data.error)
            }
        } catch (error: any) {
            console.log(error);
            setError(error.response.data.error);
        } finally {
            setLoading(false)
        }
    }

    const handleVerifyOTP = async () => {
        try {
            setLoading(true)
            const response = await axios.patch("/api/auth/reset-password", {
                email, otp, newPassword
            })
            if (response.status === 201) {
                setMessage(response.data.message)
                setTimeout(() => {
                    setIsModalOpen(false)
                    router.push("/signin")
                }, 3000)

            } else {
                setError(response.data.error);

            }
        } catch (error: any) {
            console.log(error);
            setError(error.response.data.error);
        } finally {
            setLoading(false)
        }
    }




    return (
        <>
            <div className="min-h-screen flex flex-col md:flex-row bg-gray-50">
                <div className="w-full md:w-1/2 lg:w-2/5 flex items-center justify-center p-8 md:p-12 bg-white relative">
                    <div className="max-w-md w-full text-center md:text-left">
                        <Link href="/" className="flex items-center space-x-3 group w-fit mx-auto md:mx-0">
                            <Image
                                src="/final_logo.png"
                                alt="ChronoVue Logo"
                                width={254}
                                height={54}
                                className='absolute -top-16 left-12 right-0 '

                            />
                        </Link>

                        <h1 className="mt-12 text-3xl md:text-4xl font-bold text-gray-900 tracking-tight font-rajdhani">
                            Reset Your Password
                        </h1>
                        <p className="mt-4 text-lg text-gray-600">
                            Enter your email address and we'll send you OTP to reset your password.
                        </p>

                        <div className="mt-12 max-w-md mx-auto">
                            <div className="mt-12 p-6 bg-gray-50 rounded-lg">
                                <h3 className="font-semibold text-gray-800 mb-2">Didn't receive the email?</h3>
                                <ul className="text-sm text-gray-600 space-y-1">
                                    <li>• Check your spam folder</li>
                                    <li>• Make sure you entered the correct email</li>
                                    <li>• Wait a few minutes and try again</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="w-full md:w-1/2 lg:w-3/5 flex items-center justify-center p-8 md:p-12">
                    <div className="max-w-md w-full">
                        <div className="text-right mb-8">
                            <span className="text-gray-600">Remember your password?</span>
                            <Link href="/signin" className="text-teal-600 font-semibold ml-2 hover:underline">
                                Sign In
                            </Link>
                        </div>

                        <h2 className="text-3xl font-bold text-gray-900 font-rajdhani">Reset Password</h2>
                        <p className="mt-2 text-gray-600">
                            Enter your email address associated with your account.
                        </p>

                        <form className="space-y-6 mt-6" onSubmit={handleSendOTP}>
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
                                <Button onClick={handleSendOTP} className="w-full py-3 px-6 rounded-full font-medium">
                                    {loading ? <Loader className='animate-spin' /> : <span>Send Reset OTP</span>}
                                </Button>
                            </div>
                        </form>

                        <div className="mt-8">
                            <div className="relative">
                                <div className="absolute inset-0 flex items-center">
                                    <div className="w-full border-t border-gray-300"></div>
                                </div>
                                <div className="relative flex justify-center text-sm">
                                    <span className="px-2 bg-gray-50 text-gray-500">Or try another way</span>
                                </div>
                            </div>

                            <div className="mt-6">
                                <Button variant="outline" className="w-full py-3 px-4 rounded-full">
                                    Contact Support
                                </Button>
                            </div>
                        </div>

                        <p className="mt-8 text-xs text-gray-500 text-center">
                            Need help? Contact our{' '}
                            <Link href="#" className="text-teal-600 hover:underline">
                                support team
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-8 max-w-md w-full">
                        <div className='flex justify-between items-center mb-4'>
                            <h2 className="text-2xl font-bold text-gray-900 ">Enter OTP</h2>
                            <X className=" cursor-pointer hover:text-gray-800" onClick={() => setIsModalOpen(false)} />
                        </div>

                        <p className="text-sm text-gray-600 mb-4">
                            We've sent a 6-digit OTP to your email. Please enter it below to reset your password.
                        </p>
                        {message && (
                            <div className="my-4 p-2 bg-green-100 text-green-700 border border-green-400 rounded">
                                {message}
                            </div>
                        )}
                        {error && (
                            <div className="my-4 p-4 bg-red-100 text-red-700 border border-red-400 rounded">
                                {error}
                            </div>
                        )}

                        <InputOTP maxLength={6} className='mt-6' value={otp}
                            onChange={(e) => setOtp(e)}>
                            <InputOTPGroup>
                                <InputOTPSlot index={0} />
                                <InputOTPSlot index={1} />
                                <InputOTPSlot index={2} />
                            </InputOTPGroup>
                            <InputOTPSeparator />
                            <InputOTPGroup>
                                <InputOTPSlot index={3} />
                                <InputOTPSlot index={4} />
                                <InputOTPSlot index={5} />
                            </InputOTPGroup>
                        </InputOTP>
                        <div className="space-y-6 mt-6">
                            <Input
                                id="password"
                                name="password"
                                type="password"
                                placeholder="Enter New Password"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                            />
                        </div>
                        <span>
                            <p className="text-sm text-gray-600 mt-4 ">Didn't receive the code? <button onClick={handleSendOTP} className="text-teal-600 font-semibold hover:underline">Resend OTP</button></p>
                        </span>
                        <div className="mt-4">

                            <Button onClick={handleVerifyOTP}
                                className="w-full mt-2 py-3 px-6 rounded-full font-medium"

                            >
                                {loading ? <Loader className='animate-spin' /> : <span>Verify OTP</span>}
                            </Button>
                        </div>
                    </div>

                </div>
            )}

        </>
    );
};

export default ForgotPasswordForm;