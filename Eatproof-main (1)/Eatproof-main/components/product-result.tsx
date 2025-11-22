'use client'

import { useState, useEffect } from 'react'
import { SafetyScoreGauge } from './safety-score-gauge'
import { WarningItem } from './warning-item'
import { Card } from './ui/card'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'
import { Share2, Save, Flag, Check, AlertTriangle, Loader } from 'lucide-react'
import { api, ScanRequest, ScanResponse } from '@/lib/api'

interface ProductResultProps {
  code: string
}

export function ProductResult({ code }: ProductResultProps) {
  const [productData, setProductData] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const token = localStorage.getItem('token')
        if (!token) {
          // Provide mock demo data when no token is present
          setProductData({
            name: 'Organic Almonds',
            brand: 'Nature\'s Best',
            category: 'Snacks & Nuts',
            image: '/almonds-package.jpg',
            safetyScore: 85,
            authenticityStatus: 'verified',
            batchNo: 'B12345',
            distributor: 'Nature Distributors',
            retailer: 'Fresh Mart',
            warnings: [
              {
                title: 'Safety Score',
                description: 'Overall safety score: 85/100',
                severity: 'info' as const,
              },
            ],
            ingredients: [
              { name: 'Almonds', harmfulScore: 1 },
              { name: 'Sea Salt', harmfulScore: 0 },
              { name: 'Natural Flavoring', harmfulScore: 2 },
            ],
            crowdsourcedReports: 12,
            nearbyReports: 2,
            recallStatus: 'clear',
            alternatives: [
              { name: 'Sunflower Seeds', reason: 'Nut-free alternative' },
              { name: 'Pumpkin Seeds', reason: 'Similar nutritional profile' },
            ],
          })
          setLoading(false)
          return
        }
        setLoading(true)
        // For demo, using hardcoded ingredients - in real app, fetch from product database or user input
        const scanRequest: ScanRequest = {
          barcode: code,
          ingredients: ['Almonds', 'Sea Salt', 'Natural Flavoring'], // Mock ingredients
          product_name: 'Organic Almonds'
        }
        const response: ScanResponse = await api.analyzeProduct(scanRequest)
        // Transform backend response to frontend format
        setProductData({
          name: response.analysis?.packaging?.product_name || 'Unknown Product',
          brand: response.analysis?.packaging?.brand || 'Unknown Brand',
          category: 'Snacks & Nuts', // Mock category
          image: '/almonds-package.jpg', // Mock image
          safetyScore: response.safety_score,
          authenticityStatus: response.product_score > 70 ? 'verified' : 'suspicious',
          batchNo: response.analysis?.packaging?.batch_number || 'Unknown',
          distributor: response.analysis?.packaging?.distributor || 'Unknown',
          retailer: 'Fresh Mart', // Mock
          warnings: [
            ...(response.analysis?.ingredients?.detected_allergens?.map((allergen: any) => ({
              title: 'Allergen Detected',
              description: `Contains ${allergen.allergen}. Check your allergies.`,
              severity: 'critical' as const,
            })) || []),
            {
              title: 'Safety Score',
              description: `Overall safety score: ${response.safety_score}/100`,
              severity: response.safety_score > 70 ? 'info' : 'warning' as const,
            },
          ],
          ingredients: response.analysis?.ingredients?.analyzed_ingredients?.map((ing: any) => ({
            name: ing.name,
            harmfulScore: ing.risk_score || 0,
          })) || [],
          crowdsourcedReports: 12, // Mock
          nearbyReports: 2, // Mock
          recallStatus: 'clear', // Mock
          alternatives: [
            { name: 'Sunflower Seeds', reason: 'Nut-free alternative' },
            { name: 'Pumpkin Seeds', reason: 'Similar nutritional profile' },
          ],
        })
      } catch (err) {
        setError('Failed to load product data')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchProductData()
  }, [code])

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader className="w-8 h-8 animate-spin text-primary" />
        <span className="ml-2">Analyzing product...</span>
      </div>
    )
  }

  if (error || !productData) {
    return (
      <Card className="p-6">
        <div className="text-center">
          <AlertTriangle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-foreground mb-2">Error Loading Data</h3>
          <p className="text-foreground/60">{error || 'Unable to fetch product information'}</p>
        </div>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      {/* Product Header */}
      <Card className="p-6">
        <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
          <div className="w-32 h-32 bg-muted rounded-lg flex-shrink-0 flex items-center justify-center border border-border">
            <div className="text-center text-foreground/40">
              <p className="text-sm">Product Image</p>
            </div>
          </div>
          <div className="flex-1">
            <div className="flex items-start justify-between gap-4 mb-4">
              <div>
                <h1 className="text-2xl font-bold text-foreground">{productData.name}</h1>
                <p className="text-foreground/60">{productData.brand}</p>
              </div>
              <Badge
                variant="outline"
                className={
                  productData.authenticityStatus === 'verified'
                    ? 'bg-green-50 border-green-200 text-green-900'
                    : 'bg-yellow-50 border-yellow-200 text-yellow-900'
                }
              >
                <Check className="w-3 h-3 mr-1" />
                {productData.authenticityStatus === 'verified' ? 'Verified Authentic' : 'Suspicious'}
              </Badge>
            </div>
            <p className="text-sm text-foreground/60 mb-4">{productData.category}</p>
          </div>
        </div>
      </Card>

      {/* Safety Score */}
      <Card className="p-6">
        <div className="flex flex-col md:flex-row gap-8 items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-foreground mb-2">Safety Score</h2>
            <p className="text-foreground/60 max-w-md">
              Based on ingredients, allergens, recalls, and your personal health profile
            </p>
          </div>
          <SafetyScoreGauge score={productData.safetyScore} size="md" />
        </div>
      </Card>

      {/* Status Banner */}
      {productData.recallStatus === 'clear' && (
        <div className="p-4 rounded-lg bg-green-50 border border-green-200 text-green-900">
          <div className="flex items-start gap-3">
            <Check className="w-5 h-5 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-semibold mb-1">No Active Recalls</h3>
              <p className="text-sm">This product has not been part of any recent food safety recalls.</p>
            </div>
          </div>
        </div>
      )}

      {/* Warnings */}
      <div>
        <h2 className="text-xl font-bold text-foreground mb-4">Safety Alerts</h2>
        <div className="space-y-3">
          {productData.warnings.map((warning: any, index: number) => (
            <WarningItem key={index} {...warning} />
          ))}
        </div>
      </div>

      {/* Detailed Information Tabs */}
      <Tabs defaultValue="ingredients" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="ingredients">Ingredients</TabsTrigger>
          <TabsTrigger value="blockchain">Blockchain</TabsTrigger>
          <TabsTrigger value="community">Community</TabsTrigger>
        </TabsList>

        <TabsContent value="ingredients" className="mt-6">
          <Card className="p-6">
            <h3 className="font-semibold text-foreground mb-4">Ingredient Analysis</h3>
            <div className="space-y-3">
              {productData.ingredients.map((ingredient: any, index: number) => (
                <div key={index} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                  <span className="font-medium text-foreground">{ingredient.name}</span>
                  <div className="text-sm text-foreground/60">
                    Harmful Score: {ingredient.harmfulScore}/10
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="blockchain" className="mt-6">
          <Card className="p-6 space-y-4">
            <div>
              <h3 className="font-semibold text-foreground mb-2">Batch & Verification</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-foreground/60">Batch No.</span>
                  <span className="font-mono text-foreground">{productData.batchNo}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-foreground/60">Distributor</span>
                  <span className="text-foreground">{productData.distributor}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-foreground/60">Retailer</span>
                  <span className="text-foreground">{productData.retailer}</span>
                </div>
              </div>
            </div>
            <Button variant="outline" className="w-full" disabled>
              View Full Blockchain Record
            </Button>
          </Card>
        </TabsContent>

        <TabsContent value="community" className="mt-6">
          <Card className="p-6 space-y-4">
            <h3 className="font-semibold text-foreground mb-2">Crowdsourced Reports</h3>
            <div className="space-y-3">
              <div className="p-3 bg-muted rounded-lg">
                <div className="flex justify-between items-center">
                  <span className="text-foreground/60">Total Reports from Users</span>
                  <span className="font-bold text-primary">{productData.crowdsourcedReports}</span>
                </div>
              </div>
              <div className="p-3 bg-muted rounded-lg">
                <div className="flex justify-between items-center">
                  <span className="text-foreground/60">Reports Near You</span>
                  <span className="font-bold text-accent">{productData.nearbyReports}</span>
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Alternatives */}
      {productData.alternatives.length > 0 && (
        <Card className="p-6">
          <h2 className="text-xl font-bold text-foreground mb-4">Safer Alternatives</h2>
          <div className="space-y-3">
            {productData.alternatives.map((alt: any, index: number) => (
              <div key={index} className="p-4 border border-border rounded-lg hover:border-primary/50 transition cursor-pointer">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-foreground">{alt.name}</h3>
                    <p className="text-sm text-foreground/60">{alt.reason}</p>
                  </div>
                  <Badge variant="outline">Alternative</Badge>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Action Buttons */}
      <div className="flex gap-3 flex-col sm:flex-row">
        <Button variant="outline" className="flex-1 gap-2">
          <Save className="w-4 h-4" />
          Save Product
        </Button>
        <Button variant="outline" className="flex-1 gap-2">
          <Flag className="w-4 h-4" />
          Report Issue
        </Button>
        <Button className="flex-1 gap-2">
          <Share2 className="w-4 h-4" />
          Share Report
        </Button>
      </div>
    </div>
  )
}
