"use client"
import AIChatbotModal from '@/components/Dashboard/AI Assistant/AssistantHomepage'
import React, { useState } from 'react'

const page = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
    <AIChatbotModal isOpen={isOpen} onClose={() => setIsOpen(false)}/>

    </>
  )
}

export default page