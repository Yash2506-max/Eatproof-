'use client'

import { AlertTriangle, Clock } from 'lucide-react'
import { Card } from './ui/card'
import { Badge } from './ui/badge'

interface AlertCardProps {
  type: 'recall' | 'warning' | 'info'
  title: string
  description: string
  timestamp?: string
  action?: React.ReactNode
}

export function AlertCard({ type, title, description, timestamp, action }: AlertCardProps) {
  const typeStyles = {
    recall: 'bg-red-50 border-red-200',
    warning: 'bg-yellow-50 border-yellow-200',
    info: 'bg-blue-50 border-blue-200',
  }

  const typeColors = {
    recall: 'bg-red-100 text-red-900',
    warning: 'bg-yellow-100 text-yellow-900',
    info: 'bg-blue-100 text-blue-900',
  }

  return (
    <Card className={`p-4 border ${typeStyles[type]}`}>
      <div className="flex gap-4 items-start">
        <div className={`p-2 rounded-lg ${typeColors[type]} flex-shrink-0`}>
          <AlertTriangle className="w-5 h-5" />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-foreground mb-1">{title}</h3>
          <p className="text-sm text-foreground/70 mb-2">{description}</p>
          {timestamp && (
            <div className="flex items-center gap-1 text-xs text-foreground/50">
              <Clock className="w-3 h-3" />
              {timestamp}
            </div>
          )}
        </div>
        {action && <div className="flex-shrink-0">{action}</div>}
      </div>
    </Card>
  )
}
