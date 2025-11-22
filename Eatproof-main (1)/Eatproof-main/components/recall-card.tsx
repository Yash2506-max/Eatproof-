'use client'

import { Card } from './ui/card'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
import { AlertTriangle, Calendar, MapPin, Check } from 'lucide-react'
import { useState } from 'react'

interface RecallCardProps {
  id: string
  productName: string
  brand: string
  reason: string
  severity: 'critical' | 'high' | 'medium'
  category: string
  batchNumbers?: string[]
  dateIssued: string
  affectedRegions?: string[]
  affectedYou?: boolean
}

export function RecallCard({
  id,
  productName,
  brand,
  reason,
  severity,
  category,
  batchNumbers = [],
  dateIssued,
  affectedRegions = [],
  affectedYou = false,
}: RecallCardProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  const severityStyles = {
    critical: 'bg-red-100 text-red-900 border-red-200',
    high: 'bg-orange-100 text-orange-900 border-orange-200',
    medium: 'bg-yellow-100 text-yellow-900 border-yellow-200',
  }

  const severityLabel = {
    critical: 'Critical',
    high: 'High',
    medium: 'Medium',
  }

  return (
    <Card className="p-6 border-l-4" style={{
      borderLeftColor: severity === 'critical' ? '#EF4444' : severity === 'high' ? '#F97316' : '#FBBF24'
    }}>
      <div className="space-y-4">
        {/* Header */}
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <AlertTriangle className="w-5 h-5 text-red-500" />
              <h3 className="text-lg font-bold text-foreground">{productName}</h3>
            </div>
            <p className="text-foreground/60 mb-3">{brand}</p>
          </div>
          <Badge className={severityStyles[severity]}>
            {severityLabel[severity]} Risk
          </Badge>
        </div>

        {/* Main Info */}
        <div className="bg-muted/50 rounded-lg p-4 space-y-2">
          <p className="text-sm text-foreground">
            <span className="font-semibold">Reason:</span> {reason}
          </p>
          <p className="text-sm text-foreground">
            <span className="font-semibold">Category:</span> {category}
          </p>
        </div>

        {/* Timeline */}
        <div className="flex items-center gap-2 text-sm text-foreground/60">
          <Calendar className="w-4 h-4" />
          <span>Issued: {dateIssued}</span>
        </div>

        {/* Affected You Badge */}
        {affectedYou && (
          <div className="p-3 rounded-lg bg-red-50 border border-red-200 flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-red-900 text-sm">This May Affect You</p>
              <p className="text-red-800 text-xs mt-1">You have previously scanned this product or similar batches.</p>
            </div>
          </div>
        )}

        {/* Expandable Details */}
        {(batchNumbers.length > 0 || affectedRegions.length > 0) && (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-sm font-medium text-primary hover:text-primary/80 transition"
          >
            {isExpanded ? 'Hide Details' : 'Show Details'}
          </button>
        )}

        {isExpanded && (
          <div className="space-y-3 pt-3 border-t border-border">
            {batchNumbers.length > 0 && (
              <div>
                <p className="text-sm font-semibold text-foreground mb-2">Affected Batch Numbers:</p>
                <div className="flex flex-wrap gap-2">
                  {batchNumbers.map((batch, index) => (
                    <Badge key={index} variant="outline" className="font-mono">
                      {batch}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {affectedRegions.length > 0 && (
              <div>
                <p className="text-sm font-semibold text-foreground mb-2 flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  Affected Regions:
                </p>
                <div className="flex flex-wrap gap-2">
                  {affectedRegions.map((region, index) => (
                    <Badge key={index} variant="secondary">
                      {region}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-2 pt-2">
          <Button size="sm" variant="outline" className="flex-1">
            Learn More
          </Button>
          <Button size="sm" variant="outline" className="flex-1">
            Report Issue
          </Button>
        </div>
      </div>
    </Card>
  )
}
