"use client";

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import Image from 'next/image';
import axios from 'axios';
import { useRouter } from 'next/navigation';

const SignupForm = () => {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [fullName, setFullName] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();

    const handleTogglePasswordVisibility = () => {
        setIsPasswordVisible(!isPasswordVisible);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await axios.post('/api/auth/register', {
                fullName,
                username,
                email,
                password,
            });
            if (response.status === 201) {
                localStorage.setItem('emailForVerification', email);
                router.push('/verify-email');
            }
            else {
                setError(response.data.error || 'An error occurred during signup. Please try again.');
            }
        } catch (error: any) {
            console.error('Signup error:', error);
            setError(error.response.data.error || 'An unexpected error occurred. Please try again.');
        }

    }

    return (
        <div className="min-h-screen flex flex-col md:flex-row bg-gray-50">
            <div className="w-full md:w-1/2 lg:w-2/5 flex items-center justify-center p-8 md:p-12 bg-white relative">
                <div className="max-w-md w-full text-center md:text-left">
                   <div className="flex items-center space-x-2">
                        <Link href="/" className="flex items-center space-x-2">
                            <Image src="/final_logo.png" alt="ChronoVue Logo"
                                width={50}
                                height={40}
                            />
                            <span className="font-bold text-2xl">Chrono<span className="text-primary">Vue</span></span>
                        </Link>
                    </div>

                    <h1 className="mt-12 text-3xl md:text-4xl font-bold text-gray-900 tracking-tight font-rajdhani">
                        Plan Your Future, Achieve Your Goals.
                    </h1>
                    <p className="mt-4 text-lg text-gray-600">
                        Join thousands of innovators who use ChronoVue to turn their vision into reality.
                    </p>

                    <div className="mt-12 max-w-md mx-auto">
                        <div className="relative">
                            <Image
                                src="/signup_page_illustration.svg"
                                alt="Signup Illustration"
                                width={400}
                                height={400}
                                className="w-full h-auto"
                            />

                        </div>
                    </div>
                </div>
            </div>

            <div className="w-full md:w-1/2 lg:w-3/5 flex items-center justify-center p-8 md:p-12">
                <div className="max-w-md w-full">
                    <div className="text-right mb-8">
                        <span className="text-gray-600">Already a member?</span>
                        <Link href="/signin" className="text-teal-600 font-semibold ml-2 hover:underline">
                            Sign In
                        </Link>
                    </div>

                    <h2 className="text-3xl font-bold text-gray-900 font-rajdhani">Create an Account</h2>

                    {error && (
                        <div className="mt-4 p-4 bg-red-100 text-red-700 border border-red-400 rounded">
                            {error}
                        </div>
                    )}

                    <form className="space-y-6 mt-6" onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="fullname" className="block text-sm font-medium text-gray-700 mb-1">
                                Full Name
                            </label>
                            <div className="relative">
                                <Input
                                    id="fullname"
                                    name="fullname"
                                    type="text"
                                    value={fullName}
                                    onChange={(e) => setFullName(e.target.value)}
                                    placeholder="Enter your full name"
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
                                Username
                            </label>
                            <div className="relative">
                                <Input
                                    id="username"
                                    name="username"
                                    type="text"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    placeholder="Choose a username"
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                                Email address
                            </label>
                            <div className="relative">
                                <Input
                                    id="email"
                                    name="email"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="you@example.com"
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                                Password
                            </label>
                            <div className="relative">
                                <Input
                                    id="password"
                                    name="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    type={isPasswordVisible ? 'text' : 'password'}
                                    placeholder="••••••••"
                                />
                                <button
                                    type="button"
                                    onClick={handleTogglePasswordVisibility}
                                    className="absolute inset-y-0 right-3 flex items-center text-gray-500"
                                >
                                    {isPasswordVisible ? <EyeOff /> : <Eye />}
                                </button>
                            </div>
                        </div>

                        <div>
                            <Button className="w-full py-3 px-6 rounded-full font-medium transition-all duration-200">
                                Create Account
                            </Button>
                        </div>
                    </form>


                    <p className="mt-8 text-xs text-gray-500 text-center">
                        By creating an account, you agree to our{' '}
                        <Link href="#" className="text-teal-600 hover:underline">
                            Terms of Service
                        </Link>{' '}
                        and{' '}
                        <Link href="#" className="text-teal-600 hover:underline">
                            Privacy Policy
                        </Link>.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default SignupForm;