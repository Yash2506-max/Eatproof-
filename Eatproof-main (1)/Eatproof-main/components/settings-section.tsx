'use client'

import { Card } from './ui/card'
import { Button } from './ui/button'
import { ChevronRight } from 'lucide-react'

interface SettingsSectionProps {
  title: string
  description?: string
  children: React.ReactNode
}

export function SettingsSection({ title, description, children }: SettingsSectionProps) {
  return (
    <Card className="p-6">
      <h2 className="text-xl font-bold text-foreground mb-2">{title}</h2>
      {description && <p className="text-foreground/60 text-sm mb-4">{description}</p>}
      <div className="space-y-4">{children}</div>
    </Card>
  )
}

interface SettingsItemProps {
  label: string
  value?: string | React.ReactNode
  description?: string
  action?: React.ReactNode
}

export function SettingsItem({ label, value, description, action }: SettingsItemProps) {
  return (
    <div className="flex items-center justify-between py-3 border-b border-border last:border-0">
      <div className="flex-1">
        <p className="font-medium text-foreground">{label}</p>
        {description && <p className="text-sm text-foreground/60 mt-1">{description}</p>}
      </div>
      <div className="flex items-center gap-3 ml-4">
        {value && <span className="text-sm text-foreground/60">{value}</span>}
        {action || <ChevronRight className="w-5 h-5 text-foreground/30" />}
      </div>
    </div>
  )
}
