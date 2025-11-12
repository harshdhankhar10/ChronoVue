"use client";

import { Button } from '@/components/ui/button';
import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import Swal from 'sweetalert2';
import { Loader } from 'lucide-react';

interface Credits {
  credits: number;
}

export const stepperLoader = () => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-32 w-32 mx-auto mb-4"></div>
        <h2 className="text-xl font-semibold">Preparing your Career Path Setup...</h2>
        <p className="text-gray-600 mt-2">This may take a few moments. Thank you for your patience!</p>
      </div>
    </div>
  );
};

const OnboardingPage = ({credits}: Credits) => {
  const [step, setStep] = useState(1);
  const [careerGoal, setCareerGoal] = useState('');
  const [programmingLevel, setProgrammingLevel] = useState(0);
  const [frontendLevel, setFrontendLevel] = useState(0);
  const [backendLevel, setBackendLevel] = useState(0);
  const [weeklyHours, setWeeklyHours] = useState('');
  const [learningStyle, setLearningStyle] = useState('');
  const [timeline, setTimeline] = useState('');
  const [targetRoles, setTargetRoles] = useState<string[]>([]);
  const [companyPreference, setCompanyPreference] = useState('');
  const [salaryExpectation, setSalaryExpectation] = useState('');
  const [additionalInfo, setAdditionalInfo] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleNext = () => {
    if (step < 7) {
      setStep(step + 1);
    } 
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleRoleToggle = (role: string) => {
    if (targetRoles.includes(role)) {
      setTargetRoles(targetRoles.filter(r => r !== role));
    } else {
      setTargetRoles([...targetRoles, role]);
    }
  };

  const handleSubmit = async()=>{
    setLoading(true);
    try {
      const response = await axios.post("/api/dashboard/career-predictor", {
        careerGoal,
        programmingLevel,
        frontendLevel,
        backendLevel,
        weeklyHours,
        learningStyle,
        timeline,
        targetRoles,
        companyPreference,
        salaryExpectation,
        additionalInfo
      })
      if(response.status === 201){
        Swal.fire({
          icon: 'success',
          title: 'Congratulations!',
          text: response.data.message || 'Career path prediction generated successfully!',
        }).then(() => {
          router.refresh();
        })
      }
    } catch (error:any) {
      console.log("error", error)
      Swal.fire({
        title: 'Error',
        text: error.response?.data?.error || 'Something went wrong. Please try again.',
        icon: 'error'
      })
    }finally{
      setLoading(false);
    }
  }

  if (credits <= 100) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-sm border border-gray-200 p-8 text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Insufficient Credits</h1>
        <p className="text-gray-600 mb-6">
          You need 100 credits to access the Career Path Setup.
          <span className="block mt-2 font-medium text-gray-900">
            You currently have {credits} credits.
          </span>
        </p>
      <Link href="/dashboard/user/settings/credits">
        <Button>
        Buy Credits
      </Button>
      </Link>
      </div>
    </div>
  );
}

  return (
    <>
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full bg-white rounded-2xl shadow-sm border border-gray-200">
        
        <div className="p-6 border-b border-gray-200">
         
          <div className="flex items-center justify-between mb-4">
            
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Career Path Setup</h1>
              <p className="text-gray-600 mt-1">Step {step} of 7</p>
            </div>
            <div className="text-lg font-bold text-orange-600">
              {Math.round((step / 7) * 100)}%
            </div>
          </div>

          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-orange-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(step / 7) * 100}%` }}
            ></div>
          </div>
        </div>

        <div className="p-8">
          {step === 1 && (
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Career Goals</h2>
              <div className="space-y-3">
                {[
                  "Get first tech job ASAP",
                  "Switch to better paying role", 
                  "Learn specific technology stack",
                  "Prepare for higher education",
                  "Build startup/freelance career"
                ].map((goal) => (
                  <label key={goal} className="flex items-center gap-3 p-4 border border-gray-300 rounded-lg hover:bg-gray-50 cursor-pointer">
                    <input
                      type="radio"
                      name="careerGoal"
                      checked={careerGoal === goal}
                      onChange={() => setCareerGoal(goal)}
                      className="text-orange-600 focus:ring-orange-500"
                    />
                    <span>{goal}</span>
                  </label>
                ))}
              </div>
            </div>
          )}

          {step === 2 && (
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Current Skills</h2>
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Programming Fundamentals</h3>
                  <div className="flex justify-between gap-2">
                    {[1, 2, 3, 4, 5].map((rating) => (
                      <button
                        key={rating}
                        onClick={() => setProgrammingLevel(rating)}
                        className={`flex-1 p-4 border rounded-lg transition-all ${
                          programmingLevel === rating
                            ? 'border-orange-600 bg-orange-50 text-orange-600'
                            : 'border-gray-300 hover:border-gray-400'
                        }`}
                      >
                        <div className="text-2xl font-bold">{rating}</div>
                        <div className="text-xs text-gray-500">
                          {rating === 1 && 'Beginner'}
                          {rating === 2 && 'Basic'}
                          {rating === 3 && 'Intermediate'}
                          {rating === 4 && 'Advanced'}
                          {rating === 5 && 'Expert'}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Frontend Development</h3>
                  <div className="flex justify-between gap-2">
                    {[1, 2, 3, 4, 5].map((rating) => (
                      <button
                        key={rating}
                        onClick={() => setFrontendLevel(rating)}
                        className={`flex-1 p-4 border rounded-lg transition-all ${
                          frontendLevel === rating
                            ? 'border-orange-600 bg-orange-50 text-orange-600'
                            : 'border-gray-300 hover:border-gray-400'
                        }`}
                      >
                        <div className="text-2xl font-bold">{rating}</div>
                        <div className="text-xs text-gray-500">
                          {rating === 1 && 'Beginner'}
                          {rating === 2 && 'Basic'}
                          {rating === 3 && 'Intermediate'}
                          {rating === 4 && 'Advanced'}
                          {rating === 5 && 'Expert'}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Backend Development</h3>
                  <div className="flex justify-between gap-2">
                    {[1, 2, 3, 4, 5].map((rating) => (
                      <button
                        key={rating}
                        onClick={() => setBackendLevel(rating)}
                        className={`flex-1 p-4 border rounded-lg transition-all ${
                          backendLevel === rating
                            ? 'border-orange-600 bg-orange-50 text-orange-600'
                            : 'border-gray-300 hover:border-gray-400'
                        }`}
                      >
                        <div className="text-2xl font-bold">{rating}</div>
                        <div className="text-xs text-gray-500">
                          {rating === 1 && 'Beginner'}
                          {rating === 2 && 'Basic'}
                          {rating === 3 && 'Intermediate'}
                          {rating === 4 && 'Advanced'}
                          {rating === 5 && 'Expert'}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Availability</h2>
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Weekly study hours available?</h3>
                  <div className="space-y-3">
                    {["5-10 hours", "10-20 hours", "20-30 hours", "30+ hours"].map((hours) => (
                      <label key={hours} className="flex items-center gap-3 p-4 border border-gray-300 rounded-lg hover:bg-gray-50 cursor-pointer">
                        <input
                          type="radio"
                          name="weeklyHours"
                          checked={weeklyHours === hours}
                          onChange={() => setWeeklyHours(hours)}
                          className="text-orange-600 focus:ring-orange-500"
                        />
                        <span>{hours}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">How do you learn best?</h3>
                  <div className="space-y-3">
                    {["Hands-on projects", "Video tutorials", "Reading documentation", "Structured courses"].map((style) => (
                      <label key={style} className="flex items-center gap-3 p-4 border border-gray-300 rounded-lg hover:bg-gray-50 cursor-pointer">
                        <input
                          type="radio"
                          name="learningStyle"
                          checked={learningStyle === style}
                          onChange={() => setLearningStyle(style)}
                          className="text-orange-600 focus:ring-orange-500"
                        />
                        <span>{style}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {step === 4 && (
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Timeline & Goals</h2>
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">When do you need to be job-ready?</h3>
                  <div className="space-y-3">
                    {["1-3 months", "3-6 months", "6-12 months", "Just exploring"].map((time) => (
                      <label key={time} className="flex items-center gap-3 p-4 border border-gray-300 rounded-lg hover:bg-gray-50 cursor-pointer">
                        <input
                          type="radio"
                          name="timeline"
                          checked={timeline === time}
                          onChange={() => setTimeline(time)}
                          className="text-orange-600 focus:ring-orange-500"
                        />
                        <span>{time}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Which roles interest you?</h3>
                  <div className="space-y-3">
                    {[
                      "Frontend Developer",
                      "Backend Developer", 
                      "Full Stack Developer",
                      "Mobile Developer",
                      "DevOps/Cloud Engineer",
                      "Data Scientist"
                    ].map((role) => (
                      <label key={role} className="flex items-center gap-3 p-4 border border-gray-300 rounded-lg hover:bg-gray-50 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={targetRoles.includes(role)}
                          onChange={() => handleRoleToggle(role)}
                          className="rounded text-orange-600 focus:ring-orange-500"
                        />
                        <span>{role}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {step === 5 && (
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Preferences</h2>
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Where do you want to work?</h3>
                  <div className="space-y-3">
                    {[
                      "FAANG/Big Tech",
                      "Startup/Early-stage",
                      "Product companies", 
                      "Service companies",
                      "Remote-first companies",
                      "Don't care, just want job"
                    ].map((company) => (
                      <label key={company} className="flex items-center gap-3 p-4 border border-gray-300 rounded-lg hover:bg-gray-50 cursor-pointer">
                        <input
                          type="radio"
                          name="companyPreference"
                          checked={companyPreference === company}
                          onChange={() => setCompanyPreference(company)}
                          className="text-orange-600 focus:ring-orange-500"
                        />
                        <span>{company}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Realistic salary expectations?</h3>
                  <div className="space-y-3">
                    {["₹6-12 LPA", "₹12-20 LPA", "₹20-30 LPA", "₹30L+"].map((salary) => (
                      <label key={salary} className="flex items-center gap-3 p-4 border border-gray-300 rounded-lg hover:bg-gray-50 cursor-pointer">
                        <input
                          type="radio"
                          name="salaryExpectation"
                          checked={salaryExpectation === salary}
                          onChange={() => setSalaryExpectation(salary)}
                          className="text-orange-600 focus:ring-orange-500"
                        />
                        <span>{salary}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {step === 6 && (
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Additional Info</h2>
              <textarea
                value={additionalInfo}
                onChange={(e) => setAdditionalInfo(e.target.value)}
                placeholder="Enter any other details here..."
                className="w-full p-4 border border-gray-300 rounded-lg h-32"
              />
            </div>
          )}
          {step === 7 && (
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Review & Submit</h2>
              <p className="text-gray-600">Click Finish to generate your personalized career path prediction based on the information provided.</p>

              <span className="mt-4 border-l-4 border-orange-600 pl-4 block text-sm text-gray-700 bg-orange-50 p-4 rounded-md">
                Make sure, Our system will analyze your carrer predicton on your data like timelines, milestones and more, <span className="font-medium text-gray-900">so be sure to provide accurate information for the best results.</span>
              </span>
            </div>
          )}

        </div>

        <div className="p-6 border-t border-gray-200 bg-gray-50 rounded-b-2xl">
          <div className="flex justify-between">
            <Button
              onClick={handleBack}
              disabled={step === 1}
              variant="outline"
            >
              Back
            </Button>
            
            {step < 7 ? ( <Button
              onClick={handleNext}
            >
              Continue
            </Button>) : (
               <Button
              onClick={() =>handleSubmit()}
              disabled = {loading}
            >
              {loading ? <Loader className="w-4 h-4 animate-spin"/> : "Finish"}
            </Button>
            )}
           
            
          </div>
        </div>
      </div>
    </div>

   
    </>
  );
};

export default OnboardingPage;