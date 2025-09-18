"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSeparator,
    InputOTPSlot,
} from "@/components/ui/input-otp"
import { Loader, X } from 'lucide-react';
import Image from 'next/image';
import axios from 'axios';
import { useRouter } from 'next/navigation';

const VerifyEmail = () => {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<String | null>(null)
    const [message, setMessage] = useState<String | null>(null)
    const router = useRouter()

    useEffect(() => {
        let email = localStorage.getItem('emailForVerification') || '';
        setEmail(email)
    }, [])

    const [otp, setOtp] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleSendOTP = async () => {
        setError('')
        setMessage('')
        try {
            setLoading(true)
            const response = await axios.post("/api/auth/verify-email", {
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
            const response = await axios.patch("/api/auth/verify-email", {
                email, otp
            })
            if (response.status === 201) {
                setMessage(response.data.message)
                setTimeout(() => {
                    setIsModalOpen(false)
                    router.push("/signin")
                }, 3000)
                await axios.post("/api/auth/welcome-email", { email })

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
                            Verify Your Email
                        </h1>
                        <p className="mt-4 text-lg text-gray-600">
                            We've sent a verification link to your email address. Please check your inbox.
                        </p>

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

                <div className="w-full md:w-1/2 lg:w-3/5 flex items-center justify-center p-8 md:p-12">
                    <div className="max-w-md w-full">
                        <div className="text-center">


                            <h2 className="text-3xl font-bold text-gray-900 font-rajdhani">Check Your Email</h2>
                            <p className="mt-4 text-gray-600">
                                Click on the button to send verification code to your email address for verification.
                            </p>
                            {error && (
                                <div className="mt-4 p-4 bg-red-100 text-red-700 border border-red-400 rounded">
                                    {error}
                                </div>
                            )}
                            {message && (
                                <div className="mt-4 p-2 bg-green-100 text-green-700 border border-green-400 rounded">
                                    {message}
                                </div>
                            )}

                            <Input
                                className='mt-6'
                                id="email"
                                name="email"
                                type="email"
                                value={email}
                                disabled
                            />




                            <div className="mt-4 space-y-4">
                                <Button onClick={handleSendOTP} className="w-full py-3 px-6 rounded-full font-medium">
                                    {loading ? <Loader className='animate-spin' /> : <span>Send OTP</span>}
                                </Button>

                                <div className="text-center">
                                    <Link href="/signin" className="text-teal-600 font-semibold hover:underline">
                                        Back to Sign In
                                    </Link>
                                </div>
                            </div>


                        </div>
                    </div>
                </div>
            </div >

            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-8 max-w-md w-full">
                        <div className='flex justify-between items-center mb-4'>
                            <h2 className="text-2xl font-bold text-gray-900 ">Enter OTP</h2>
                            <X className=" cursor-pointer hover:text-gray-800" onClick={() => setIsModalOpen(false)} />
                        </div>

                        <p className="text-sm text-gray-600 mb-4">
                            We've sent a 6-digit OTP to your email. Please enter it below to verify your email address.
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
                        <span>
                            <p onClick={handleSendOTP} className="text-sm text-gray-600 mt-4 ">Didn't receive the code? <button className="text-teal-600 font-semibold hover:underline">Resend OTP</button></p>
                        </span>
                        <div className="mt-4">

                            <Button
                                className="w-full mt-2 py-3 px-6 rounded-full font-medium"
                                onClick={handleVerifyOTP}
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

export default VerifyEmail;