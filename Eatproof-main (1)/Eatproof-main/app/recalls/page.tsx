'use client'

import { useState } from 'react'
import { Header } from '@/components/header'
import { RecallCard } from '@/components/recall-card'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Input } from '@/components/ui/input'
import { AlertTriangle, Filter, Search } from 'lucide-react'

export default function RecallsPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedSeverity, setSelectedSeverity] = useState('all')

  // Mock recall data
  const recalls = [
    {
      id: '1',
      productName: 'Peanut Butter Spread',
      brand: 'NutriSnacks',
      reason: 'Undeclared tree nuts allergen',
      severity: 'critical' as const,
      category: 'Food',
      batchNumbers: ['NUT-2024-001', 'NUT-2024-002'],
      dateIssued: '2 days ago',
      affectedRegions: ['North Region', 'East Region'],
      affectedYou: true,
    },
    {
      id: '2',
      productName: 'Multivitamin Tablets',
      brand: 'HealthBoost',
      reason: 'Possible bacterial contamination',
      severity: 'high' as const,
      category: 'Supplements',
      batchNumbers: ['HB-VIT-2024-045', 'HB-VIT-2024-046', 'HB-VIT-2024-047'],
      dateIssued: '5 days ago',
      affectedRegions: ['Central Region', 'South Region', 'West Region'],
    },
    {
      id: '3',
      productName: 'Organic Apple Juice',
      brand: 'FreshPress',
      reason: 'Presence of pesticide residues',
      severity: 'high' as const,
      category: 'Beverages',
      batchNumbers: ['FP-AJ-2024-015'],
      dateIssued: '1 week ago',
      affectedRegions: ['North Region'],
    },
    {
      id: '4',
      productName: 'Cough Syrup',
      brand: 'MediCare',
      reason: 'Incorrect dosage labeling',
      severity: 'medium' as const,
      category: 'Medicine',
      batchNumbers: ['MC-CS-2024-022'],
      dateIssued: '1 week ago',
      affectedRegions: ['All Regions'],
      affectedYou: true,
    },
    {
      id: '5',
      productName: 'Gluten-Free Bread',
      brand: 'HealthyLife',
      reason: 'Cross-contamination with gluten',
      severity: 'high' as const,
      category: 'Food',
      batchNumbers: ['HL-GB-2024-012', 'HL-GB-2024-013'],
      dateIssued: '3 days ago',
      affectedRegions: ['East Region', 'South Region'],
    },
  ]

  const categories = ['All', 'Food', 'Medicine', 'Supplements', 'Beverages']
  const severities = ['All', 'Critical', 'High', 'Medium']

  const filteredRecalls = recalls.filter((recall) => {
    const matchesSearch = recall.productName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      recall.brand.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || recall.category === selectedCategory
    const matchesSeverity = selectedSeverity === 'all' || 
      recall.severity === selectedSeverity.toLowerCase()
    return matchesSearch && matchesCategory && matchesSeverity
  })

  const affectedYouCount = recalls.filter(r => r.affectedYou).length
  const criticalCount = recalls.filter(r => r.severity === 'critical').length

  return (
    <>
      <Header />
      <div className="min-h-screen bg-background pt-8 pb-12">
        <div className="mx-auto max-w-6xl px-4">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
              Food & Medicine Recalls
            </h1>
            <p className="text-lg text-foreground/60">
              Latest FSSAI, FDA, and WHO safety alerts for your region
            </p>
          </div>

          {/* Alert Stats */}
          <div className="grid md:grid-cols-3 gap-4 mb-8">
            <Card className="p-6 border-l-4 border-l-red-500">
              <div className="text-3xl font-bold text-red-600 mb-1">{recalls.length}</div>
              <p className="text-foreground/60">Active Recalls</p>
            </Card>
            <Card className="p-6 border-l-4 border-l-yellow-500">
              <div className="text-3xl font-bold text-yellow-600 mb-1">{criticalCount}</div>
              <p className="text-foreground/60">Critical Risk</p>
            </Card>
            <Card className="p-6 border-l-4 border-l-orange-500">
              <div className="text-3xl font-bold text-orange-600 mb-1">{affectedYouCount}</div>
              <p className="text-foreground/60">May Affect You</p>
            </Card>
          </div>

          {/* Search and Filters */}
          <Card className="p-6 mb-8">
            <div className="space-y-4">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-foreground/40" />
                <Input
                  placeholder="Search product or brand name..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>

              {/* Filter Tabs */}
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-semibold text-foreground mb-2 flex items-center gap-1">
                    <Filter className="w-4 h-4" />
                    Category
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {categories.map((cat) => (
                      <button
                        key={cat}
                        onClick={() => setSelectedCategory(cat === 'All' ? 'all' : cat)}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                          (cat === 'All' && selectedCategory === 'all') ||
                          selectedCategory === cat
                            ? 'bg-primary text-primary-foreground'
                            : 'bg-muted text-foreground hover:bg-border'
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="text-sm font-semibold text-foreground mb-2 flex items-center gap-1">
                    <AlertTriangle className="w-4 h-4" />
                    Severity
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {severities.map((sev) => (
                      <button
                        key={sev}
                        onClick={() => setSelectedSeverity(sev === 'All' ? 'all' : sev)}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                          (sev === 'All' && selectedSeverity === 'all') ||
                          selectedSeverity === sev
                            ? 'bg-primary text-primary-foreground'
                            : 'bg-muted text-foreground hover:bg-border'
                        }`}
                      >
                        {sev}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {/* Recalls List */}
          <div className="space-y-4">
            {filteredRecalls.length > 0 ? (
              filteredRecalls.map((recall) => (
                <RecallCard key={recall.id} {...recall} />
              ))
            ) : (
              <Card className="p-12 text-center">
                <AlertTriangle className="w-12 h-12 text-foreground/20 mx-auto mb-4" />
                <p className="text-foreground/60 mb-4">No recalls match your search</p>
                <Button
                  variant="outline"
                  onClick={() => {
                    setSearchQuery('')
                    setSelectedCategory('all')
                    setSelectedSeverity('all')
                  }}
                >
                  Clear Filters
                </Button>
              </Card>
            )}
          </div>

          {/* Info Section */}
          <Card className="p-6 mt-8 bg-blue-50 border border-blue-200">
            <h3 className="font-bold text-blue-900 mb-2">About These Recalls</h3>
            <p className="text-sm text-blue-800">
              This data is aggregated from FSSAI (Food Safety & Standards Authority of India), FDA (US), and WHO advisories. We update this list in real-time to keep you informed about potential risks.
            </p>
          </Card>
        </div>
      </div>
    </>
  )
}
