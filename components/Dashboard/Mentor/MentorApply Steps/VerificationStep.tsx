"use client"
import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSeparator,
    InputOTPSlot,
} from "@/components/ui/input-otp"
import axios from 'axios'

interface User {
    email: string;
}

interface VerificationStepProps {
    user: User;
    setIsInitialVerifiedState: (value: boolean) => void;
}

const VerificationStep = ({ user, setIsInitialVerifiedState }: VerificationStepProps) => {
    const [isOtpSent, setIsOtpSent] = useState(false)
    const [loading, setLoading] = useState(false)
    const [otpCode, setOtpCode] = useState('')

    const handleSendOTP = async () => {
        setLoading(true)
        try {
            const response = await axios.post('/api/dashboard/mentor/verification', {
                email: user.email
            })
            if (response.status === 200) {
                setIsOtpSent(true)
            }
        } catch (error) {
            console.error("Error sending OTP:", error)
        } finally {
            setLoading(false)
        }
    }

    const handleVerifyOTP = async () => {
        setLoading(true)
        try {
            const response = await axios.patch('/api/dashboard/mentor/verification', {
                email: user.email,
                otp: otpCode
            })
            if (response.status === 201) {
                localStorage.setItem('isInitialVerifiedState', 'true')
                setIsInitialVerifiedState(true)
            }
        } catch (error) {
            console.error("Error verifying OTP:", error)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="max-w-md mx-auto">
            <div className="bg-white rounded-xl border shadow-sm p-6">
                <div className="text-center mb-6">
                    <h1 className="text-2xl font-bold text-gray-900 mb-2">
                        Verify Your Account
                    </h1>
                    <p className="text-gray-600 text-sm">
                        To prevent fraudulent applications, we require account verification before you can apply as a mentor.
                    </p>
                </div>

                <div className="space-y-4">
                    <div>
                        {isOtpSent && (
                            <p className="border-l-4 border-teal-600 bg-teal-50 text-teal-600 px-4 py-2 mb-4">
                                A verification code has been sent to your email.
                            </p>
                        )}
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Email Address
                        </label>
                        <Input type="email" value={user.email || ''} readOnly />
                    </div>
                    {isOtpSent ? (
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Verification Code
                            </label>
                            <InputOTP maxLength={6} value={otpCode} onChange={setOtpCode}>
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

                            <p className="text-xs text-gray-500 mt-1 mb-4">
                                If you didn't receive a code, please check your spam folder or
                                <button className="text-primary underline ml-1" onClick={handleSendOTP} disabled={loading}>
                                    {loading ? 'Resending...' : 'resend the code'}
                                </button>
                            </p>
                            <Button className='w-full' onClick={handleVerifyOTP} disabled={loading}>
                                {loading ? 'Verifying...' : 'Verify Account'}
                            </Button>
                        </div>
                    ) : (
                        <Button className='w-full' onClick={handleSendOTP} disabled={loading}>
                            {loading ? 'Sending OTP...' : 'Send Verification Code'}
                        </Button>
                    )}
                </div>
            </div>
        </div>
    )
}

export default VerificationStep