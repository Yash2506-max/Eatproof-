'use client'

import { AlertTriangle, AlertCircle, Zap } from 'lucide-react'

interface WarningItemProps {
  title: string
  description: string
  severity: 'critical' | 'warning' | 'info'
  icon?: React.ReactNode
}

export function WarningItem({ title, description, severity, icon }: WarningItemProps) {
  const severityStyles = {
    critical: 'bg-red-50 border-red-200 text-red-900',
    warning: 'bg-yellow-50 border-yellow-200 text-yellow-900',
    info: 'bg-blue-50 border-blue-200 text-blue-900',
  }

  const iconMap = {
    critical: <AlertTriangle className="w-5 h-5 text-red-500 flex-shrink-0" />,
    warning: <AlertCircle className="w-5 h-5 text-yellow-500 flex-shrink-0" />,
    info: <Zap className="w-5 h-5 text-blue-500 flex-shrink-0" />,
  }

  return (
    <div className={`p-4 rounded-lg border ${severityStyles[severity]}`}>
      <div className="flex gap-3">
        {icon || iconMap[severity]}
        <div className="flex-1">
          <h4 className="font-semibold text-sm mb-1">{title}</h4>
          <p className="text-sm opacity-90">{description}</p>
        </div>
      </div>
    </div>
  )
}
