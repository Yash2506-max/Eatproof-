'use client'

import { useState } from 'react'
import { Button } from './ui/button'
import { Card } from './ui/card'
import { ChevronRight, ChevronLeft, Check } from 'lucide-react'

interface OnboardingStep {
  id: string
  title: string
  description: string
  component: React.ReactNode
}

interface OnboardingFormProps {
  onComplete?: (data: any) => void
}

export function OnboardingForm({ onComplete }: OnboardingFormProps) {
  const [currentStep, setCurrentStep] = useState(0)
  const [formData, setFormData] = useState({
    age: '',
    diet: '',
    allergies: [] as string[],
    medicalConditions: [] as string[],
    medications: [],
    lifestyle: '',
  })

  const allergiesList = ['Nuts', 'Gluten', 'Lactose', 'Shellfish', 'Soy', 'Eggs', 'Peanuts', 'Fish']
  const medicalConditionsList = ['Diabetes', 'Hypertension', 'Asthma', 'Heart Disease', 'Thyroid', 'Kidney Disease']
  const dietOptions = ['Vegetarian', 'Non-Vegetarian', 'Vegan', 'Keto', 'Paleo']
  const lifestyleOptions = ['Sedentary', 'Light Activity', 'Moderate Activity', 'Very Active', 'Athlete']

  const steps: OnboardingStep[] = [
    {
      id: 'age',
      title: 'What\'s Your Age?',
      description: 'This helps us tailor safety recommendations',
      component: (
        <div className="space-y-4">
          <input
            type="number"
            placeholder="Enter your age"
            value={formData.age}
            onChange={(e) => setFormData({ ...formData, age: e.target.value })}
            className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
            min="1"
            max="120"
          />
        </div>
      ),
    },
    {
      id: 'diet',
      title: 'Select Your Diet Type',
      description: 'Choose your primary dietary preference',
      component: (
        <div className="grid grid-cols-2 gap-3">
          {dietOptions.map((option) => (
            <button
              key={option}
              onClick={() => setFormData({ ...formData, diet: option })}
              className={`p-4 rounded-lg border-2 transition-all text-center font-medium ${
                formData.diet === option
                  ? 'border-primary bg-primary/10'
                  : 'border-border hover:border-primary/50'
              }`}
            >
              {option}
            </button>
          ))}
        </div>
      ),
    },
    {
      id: 'allergies',
      title: 'Select Your Allergies',
      description: 'Check all that apply to you',
      component: (
        <div className="grid grid-cols-2 gap-3">
          {allergiesList.map((allergy) => (
            <label key={allergy} className="flex items-center gap-3 p-3 rounded-lg border border-border hover:border-primary/50 cursor-pointer transition">
              <input
                type="checkbox"
                checked={formData.allergies.includes(allergy)}
                onChange={(e) => {
                  if (e.target.checked) {
                    setFormData({
                      ...formData,
                      allergies: [...formData.allergies, allergy],
                    })
                  } else {
                    setFormData({
                      ...formData,
                      allergies: formData.allergies.filter((a) => a !== allergy),
                    })
                  }
                }}
                className="w-4 h-4 rounded cursor-pointer"
              />
              <span className="text-sm">{allergy}</span>
            </label>
          ))}
        </div>
      ),
    },
    {
      id: 'medical',
      title: 'Medical Conditions',
      description: 'Select any conditions you have',
      component: (
        <div className="grid grid-cols-2 gap-3">
          {medicalConditionsList.map((condition) => (
            <label key={condition} className="flex items-center gap-3 p-3 rounded-lg border border-border hover:border-primary/50 cursor-pointer transition">
              <input
                type="checkbox"
                checked={formData.medicalConditions.includes(condition)}
                onChange={(e) => {
                  if (e.target.checked) {
                    setFormData({
                      ...formData,
                      medicalConditions: [...formData.medicalConditions, condition],
                    })
                  } else {
                    setFormData({
                      ...formData,
                      medicalConditions: formData.medicalConditions.filter((c) => c !== condition),
                    })
                  }
                }}
                className="w-4 h-4 rounded cursor-pointer"
              />
              <span className="text-sm">{condition}</span>
            </label>
          ))}
        </div>
      ),
    },
    {
      id: 'lifestyle',
      title: 'Your Lifestyle',
      description: 'How active are you?',
      component: (
        <div className="grid grid-cols-1 gap-3">
          {lifestyleOptions.map((option) => (
            <button
              key={option}
              onClick={() => setFormData({ ...formData, lifestyle: option })}
              className={`p-4 rounded-lg border-2 transition-all text-left font-medium ${
                formData.lifestyle === option
                  ? 'border-primary bg-primary/10'
                  : 'border-border hover:border-primary/50'
              }`}
            >
              {option}
            </button>
          ))}
        </div>
      ),
    },
    {
      id: 'complete',
      title: 'You\'re All Set!',
      description: 'Your safety profile is ready',
      component: (
        <div className="flex flex-col items-center justify-center py-8">
          <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mb-4">
            <Check className="w-8 h-8 text-primary" />
          </div>
          <p className="text-center text-foreground/60">
            Your personalized safety profile is now active. You\'re ready to start scanning products!
          </p>
        </div>
      ),
    },
  ]

  const currentStepData = steps[currentStep]

  const canProceed = () => {
    if (currentStep === 0) return formData.age.length > 0
    if (currentStep === 1) return formData.diet.length > 0
    if (currentStep === 4) return formData.lifestyle.length > 0
    return true
  }

  const handleNext = () => {
    if (canProceed() && currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    } else if (currentStep === steps.length - 1) {
      onComplete?.(formData)
    }
  }

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  return (
    <div className="w-full max-w-2xl mx-auto">
      <Card className="p-8">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between mb-3">
            <h2 className="text-2xl font-bold text-foreground">{currentStepData.title}</h2>
            <span className="text-sm text-foreground/60">{currentStep + 1} of {steps.length}</span>
          </div>
          <div className="h-2 bg-border rounded-full overflow-hidden">
            <div
              className="h-full bg-primary transition-all duration-300"
              style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
            />
          </div>
          <p className="text-foreground/60 text-sm mt-3">{currentStepData.description}</p>
        </div>

        {/* Content */}
        <div className="mb-8 min-h-48">
          {currentStepData.component}
        </div>

        {/* Navigation */}
        <div className="flex gap-4">
          {currentStep > 0 && (
            <Button variant="outline" onClick={handleBack} className="flex-1">
              <ChevronLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
          )}
          <Button
            onClick={handleNext}
            disabled={!canProceed()}
            className="flex-1"
          >
            {currentStep === steps.length - 1 ? 'Start Using EatProof' : 'Next'}
            {currentStep < steps.length - 1 && <ChevronRight className="w-4 h-4 ml-2" />}
          </Button>
        </div>
      </Card>

      {/* Step Indicators */}
      <div className="flex justify-center gap-2 mt-8">
        {steps.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentStep(index)}
            className={`h-2 rounded-full transition-all ${
              index === currentStep
                ? 'bg-primary w-8'
                : index < currentStep
                ? 'bg-primary/40 w-2'
                : 'bg-border w-2'
            }`}
          />
        ))}
      </div>
    </div>
  )
}
