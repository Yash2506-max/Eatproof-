'use client'

import { Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { Header } from '@/components/header'
import { ProductResult } from '@/components/product-result'
import { Card } from '@/components/ui/card'
import { Loader } from 'lucide-react'

function ResultsContent() {
  const searchParams = useSearchParams()
  const code = searchParams.get('code') || 'UNKNOWN'

  return (
    <>
      <Header />
      <div className="min-h-screen bg-background pt-8 pb-12">
        <div className="mx-auto max-w-4xl px-4">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
              Scan Results
            </h1>
            <p className="text-lg text-foreground/60">
              Complete safety analysis and verification report
            </p>
          </div>

          <ProductResult code={code} />
        </div>
      </div>
    </>
  )
}

function ResultsLoading() {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-background pt-8 pb-12 flex items-center justify-center">
        <div className="text-center">
          <Loader className="w-8 h-8 animate-spin text-primary mx-auto mb-4" />
          <p className="text-foreground/60">Loading scan results...</p>
        </div>
      </div>
    </>
  )
}

export default function ResultsPage() {
  return (
    <Suspense fallback={<ResultsLoading />}>
      <ResultsContent />
    </Suspense>
  )
}
