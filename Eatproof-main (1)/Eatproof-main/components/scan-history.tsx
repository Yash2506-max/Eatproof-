'use client'

import Link from 'next/link'
import { Card } from './ui/card'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
import { ChevronRight, Trash2 } from 'lucide-react'

interface ScanHistoryItem {
  id: string
  productName: string
  brand: string
  safetyScore: number
  status: 'safe' | 'caution' | 'unsafe'
  timestamp: string
  category: string
}

interface ScanHistoryProps {
  limit?: number
}

export function ScanHistory({ limit }: ScanHistoryProps) {
  // Mock data - in real app this would come from database
  const scans: ScanHistoryItem[] = [
    {
      id: '1',
      productName: 'Organic Almonds',
      brand: 'NaturalFresh',
      safetyScore: 85,
      status: 'safe',
      timestamp: '2 hours ago',
      category: 'Snacks',
    },
    {
      id: '2',
      productName: 'Whole Milk',
      brand: 'DairyPure',
      safetyScore: 78,
      status: 'safe',
      timestamp: '1 day ago',
      category: 'Dairy',
    },
    {
      id: '3',
      productName: 'Multivitamins',
      brand: 'HealthPlus',
      safetyScore: 72,
      status: 'caution',
      timestamp: '3 days ago',
      category: 'Supplements',
    },
    {
      id: '4',
      productName: 'Olive Oil',
      brand: 'Premium Gold',
      safetyScore: 88,
      status: 'safe',
      timestamp: '5 days ago',
      category: 'Oils',
    },
    {
      id: '5',
      productName: 'Cough Syrup',
      brand: 'MediCare',
      safetyScore: 65,
      status: 'caution',
      timestamp: '1 week ago',
      category: 'Medicine',
    },
  ]

  const displayScans = limit ? scans.slice(0, limit) : scans

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'safe':
        return 'bg-green-50 border-green-200 text-green-900'
      case 'caution':
        return 'bg-yellow-50 border-yellow-200 text-yellow-900'
      case 'unsafe':
        return 'bg-red-50 border-red-200 text-red-900'
      default:
        return ''
    }
  }

  const getScoreColor = (score: number) => {
    if (score >= 70) return 'text-green-600'
    if (score >= 40) return 'text-yellow-600'
    return 'text-red-600'
  }

  return (
    <div className="space-y-3">
      {displayScans.map((scan) => (
        <Link key={scan.id} href={`/results?code=${scan.id}`}>
          <Card className="p-4 hover:border-primary/50 transition cursor-pointer group">
            <div className="flex items-center justify-between gap-4">
              <div className="flex-1">
                <h3 className="font-semibold text-foreground group-hover:text-primary transition">
                  {scan.productName}
                </h3>
                <p className="text-sm text-foreground/60">{scan.brand}</p>
              </div>

              <div className="flex items-center gap-4">
                <div className="text-right">
                  <div className={`text-lg font-bold ${getScoreColor(scan.safetyScore)}`}>
                    {scan.safetyScore}
                  </div>
                  <p className="text-xs text-foreground/50">{scan.timestamp}</p>
                </div>

                <Badge className={getStatusColor(scan.status)}>
                  {scan.status.charAt(0).toUpperCase() + scan.status.slice(1)}
                </Badge>

                <ChevronRight className="w-5 h-5 text-foreground/40 group-hover:text-primary transition" />
              </div>
            </div>
          </Card>
        </Link>
      ))}

      {limit && scans.length > limit && (
        <Link href="/history">
          <Button variant="outline" className="w-full gap-2">
            View All Scans
            <ChevronRight className="w-4 h-4" />
          </Button>
        </Link>
      )}
    </div>
  )
}
