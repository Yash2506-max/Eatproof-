'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Header } from '@/components/header'
import { CameraScanner } from '@/components/camera-scanner'
import { Card } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { QrCode, Barcode, Package } from 'lucide-react'

export default function ScanPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [scanMode, setScanMode] = useState('auto')

  const handleScan = async (code: string) => {
    setLoading(true)
    // Simulate API call to process the scan
    await new Promise((resolve) => setTimeout(resolve, 1500))
    
    // In a real app, this would fetch product data
    localStorage.setItem('lastScan', JSON.stringify({ code, timestamp: new Date() }))
    
    router.push(`/results?code=${code}`)
    setLoading(false)
  }

  return (
    <>
      <Header />
      <div className="min-h-screen bg-background pt-8 pb-12">
        <div className="mx-auto max-w-4xl px-4">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
              Scan Product
            </h1>
            <p className="text-lg text-foreground/60">
              Point your camera at the QR code or barcode on any product
            </p>
          </div>

          {/* Scan Modes */}
          <Tabs defaultValue="auto" value={scanMode} onValueChange={setScanMode} className="mb-8">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="auto" className="gap-2">
                <QrCode className="w-4 h-4" />
                <span className="hidden sm:inline">Auto Detect</span>
              </TabsTrigger>
              <TabsTrigger value="barcode" className="gap-2">
                <Barcode className="w-4 h-4" />
                <span className="hidden sm:inline">Barcode</span>
              </TabsTrigger>
              <TabsTrigger value="manual" className="gap-2">
                <Package className="w-4 h-4" />
                <span className="hidden sm:inline">Manual</span>
              </TabsTrigger>
            </TabsList>

            {/* Content for each scan mode */}
            <TabsContent value="auto" className="mt-8">
              <Card className="p-6">
                <CameraScanner onScan={handleScan} loading={loading} />
              </Card>
            </TabsContent>

            <TabsContent value="barcode" className="mt-8">
              <Card className="p-6">
                <div className="text-center py-8">
                  <Barcode className="w-16 h-16 text-foreground/20 mx-auto mb-4" />
                  <p className="text-foreground/60 mb-4">
                    Optimized for scanning barcodes on product packaging
                  </p>
                  <CameraScanner onScan={handleScan} loading={loading} />
                </div>
              </Card>
            </TabsContent>

            <TabsContent value="manual" className="mt-8">
              <Card className="p-6 space-y-4">
                <p className="text-foreground/60">
                  Enter the product code manually
                </p>
                <input
                  type="text"
                  placeholder="Enter barcode or product code (e.g., 8901234567890)"
                  className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                  onKeyPress={(e) => {
                    if (e.key === 'Enter' && e.currentTarget.value) {
                      handleScan(e.currentTarget.value)
                    }
                  }}
                />
                <p className="text-xs text-foreground/50">
                  Find the 12 or 13 digit code on product packaging
                </p>
              </Card>
            </TabsContent>
          </Tabs>

          {/* Tips */}
          <Card className="p-6 bg-primary/5 border border-primary/20">
            <h3 className="font-semibold text-foreground mb-4">Scanning Tips</h3>
            <ul className="space-y-2 text-sm text-foreground/70">
              <li className="flex gap-3">
                <span className="text-primary">•</span>
                <span>Keep the code in good lighting and in focus</span>
              </li>
              <li className="flex gap-3">
                <span className="text-primary">•</span>
                <span>Position the code within the scan frame</span>
              </li>
              <li className="flex gap-3">
                <span className="text-primary">•</span>
                <span>Avoid glare and reflections on the packaging</span>
              </li>
              <li className="flex gap-3">
                <span className="text-primary">•</span>
                <span>Hold your phone steady while scanning</span>
              </li>
            </ul>
          </Card>
        </div>
      </div>
    </>
  )
}
