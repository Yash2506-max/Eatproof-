'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Header } from '@/components/header'
import { OnboardingForm } from '@/components/onboarding-form'

export default function SignupPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const handleComplete = async (data: any) => {
    setIsLoading(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 500))
    
    // Store user profile in localStorage (in real app, this would be in a database)
    localStorage.setItem('userProfile', JSON.stringify(data))
    
    setIsLoading(false)
    router.push('/dashboard')
  }

  return (
    <>
      <Header />
      <div className="min-h-screen bg-background pt-12 pb-12">
        <div className="mx-auto max-w-4xl px-4">
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
              Set Up Your Safety Profile
            </h1>
            <p className="text-lg text-foreground/60">
              Personalize EatProof with your health information to get accurate safety alerts
            </p>
          </div>

          <OnboardingForm onComplete={handleComplete} />
        </div>
      </div>
    </>
  )
}
