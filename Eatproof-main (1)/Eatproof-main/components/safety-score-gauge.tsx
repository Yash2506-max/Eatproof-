'use client'

import { useState, useEffect } from 'react'

interface SafetyScoreGaugeProps {
  score: number
  maxScore?: number
  size?: 'sm' | 'md' | 'lg'
  interactive?: boolean
}

export function SafetyScoreGauge({
  score,
  maxScore = 100,
  size = 'md',
  interactive = false,
}: SafetyScoreGaugeProps) {
  const [displayScore, setDisplayScore] = useState(0)

  useEffect(() => {
    const timer = setTimeout(() => {
      setDisplayScore(score)
    }, 100)
    return () => clearTimeout(timer)
  }, [score])

  const percentage = (displayScore / maxScore) * 100
  const circumference = 2 * Math.PI * 45
  const strokeDashoffset = circumference - (percentage / 100) * circumference

  const getColor = () => {
    if (percentage >= 70) return '#2CD07E'
    if (percentage >= 40) return '#F59E0B'
    return '#EF4444'
  }

  const getLabel = () => {
    if (percentage >= 70) return 'Safe'
    if (percentage >= 40) return 'Caution'
    return 'Unsafe'
  }

  const sizeMap = {
    sm: 'w-24 h-24',
    md: 'w-40 h-40',
    lg: 'w-56 h-56',
  }

  const textSizeMap = {
    sm: 'text-lg',
    md: 'text-4xl',
    lg: 'text-6xl',
  }

  return (
    <div className={`flex flex-col items-center gap-4 ${sizeMap[size]}`}>
      <div className="relative w-full h-full">
        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
          {/* Background circle */}
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            className="text-border opacity-20"
          />
          {/* Progress circle */}
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke={getColor()}
            strokeWidth="3"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className="transition-all duration-500"
          />
        </svg>
        {/* Center content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div className={`font-bold ${textSizeMap[size]}`} style={{ color: getColor() }}>
            {displayScore}
          </div>
          <div className="text-xs text-foreground/60 mt-1">{getLabel()}</div>
        </div>
      </div>
    </div>
  )
}
