'use client'

import Link from 'next/link'
import { Header } from '@/components/header'
import { ScanHistory } from '@/components/scan-history'
import { AlertCard } from '@/components/alert-card'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ArrowRight, Activity, AlertTriangle, Zap, TrendingUp } from 'lucide-react'
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts'

export default function DashboardPage() {
  const stats = [
    { label: 'Total Scans', value: '24', icon: Activity, color: 'text-blue-600' },
    { label: 'Safe Products', value: '18', icon: Zap, color: 'text-green-600' },
    { label: 'Warnings', value: '4', icon: AlertTriangle, color: 'text-yellow-600' },
    { label: 'Recalls Avoided', value: '2', icon: TrendingUp, color: 'text-primary' },
  ]

  const categoryData = [
    { name: 'Food', value: 14, fill: '#2CD07E' },
    { name: 'Medicine', value: 6, fill: '#4A6CF7' },
    { name: 'Supplements', value: 4, fill: '#F59E0B' },
  ]

  const safetyTrendData = [
    { name: 'Mon', average: 78 },
    { name: 'Tue', average: 82 },
    { name: 'Wed', average: 75 },
    { name: 'Thu', average: 88 },
    { name: 'Fri', average: 85 },
    { name: 'Sat', average: 90 },
    { name: 'Sun', average: 87 },
  ]

  return (
    <>
      <Header />
      <div className="min-h-screen bg-background pt-8 pb-12">
        <div className="mx-auto max-w-6xl px-4">
          {/* Header */}
          <div className="mb-8 flex justify-between items-start">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
                Your Safety Dashboard
              </h1>
              <p className="text-lg text-foreground/60">
                Track your product safety and health insights
              </p>
            </div>
            <Link href="/scan">
              <Button className="gap-2">
                <Zap className="w-4 h-4" />
                <span className="hidden sm:inline">Scan Product</span>
              </Button>
            </Link>
          </div>

          {/* Stats Grid */}
          <div className="grid md:grid-cols-4 gap-4 mb-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon
              return (
                <Card key={index} className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <Icon className={`w-8 h-8 ${stat.color}`} />
                  </div>
                  <div className="text-3xl font-bold text-foreground mb-1">
                    {stat.value}
                  </div>
                  <p className="text-sm text-foreground/60">{stat.label}</p>
                </Card>
              )
            })}
          </div>

          {/* Alerts Section */}
          <div className="mb-8">
            <h2 className="text-xl font-bold text-foreground mb-4">Active Alerts</h2>
            <div className="space-y-3">
              <AlertCard
                type="recall"
                title="3 Food Recalls Near You"
                description="Recent recalls detected for products commonly purchased in your area. Check your pantry."
                timestamp="Updated 2 hours ago"
                action={
                  <Link href="/recalls">
                    <Button size="sm" variant="outline">View</Button>
                  </Link>
                }
              />
              <AlertCard
                type="warning"
                title="Allergy Alert"
                description="You scanned a product containing nuts. This conflicts with your allergy profile."
                timestamp="Last scan"
              />
            </div>
          </div>

          {/* Charts Section */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {/* Category Breakdown */}
            <Card className="p-6">
              <h3 className="font-bold text-foreground mb-6">Scan Categories</h3>
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div className="flex justify-center gap-6 mt-4 text-sm">
                {categoryData.map((item, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: item.fill }}
                    />
                    <span className="text-foreground/70">{item.name}</span>
                  </div>
                ))}
              </div>
            </Card>

            {/* Safety Trend */}
            <Card className="p-6">
              <h3 className="font-bold text-foreground mb-6">Weekly Safety Trend</h3>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={safetyTrendData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                  <XAxis dataKey="name" tick={{ fill: 'var(--color-foreground)', fontSize: 12 }} />
                  <YAxis domain={[0, 100]} hide />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'var(--color-card)',
                      border: `1px solid var(--color-border)`,
                      borderRadius: '8px',
                    }}
                    cursor={{ fill: 'transparent' }}
                  />
                  <Bar dataKey="average" fill="#2CD07E" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </Card>
          </div>

          {/* Recent Scans */}
          <Card className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-foreground">Recent Scans</h2>
              <Link href="/history">
                <Button variant="ghost" size="sm" className="gap-1">
                  View All
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
            <ScanHistory limit={5} />
          </Card>

          {/* Quick Actions */}
          <div className="grid md:grid-cols-3 gap-4 mt-8">
            <Link href="/scan">
              <Card className="p-6 hover:border-primary/50 transition cursor-pointer h-full">
                <Zap className="w-8 h-8 text-primary mb-4" />
                <h3 className="font-semibold text-foreground mb-2">Scan Product</h3>
                <p className="text-sm text-foreground/60">Verify a new product instantly</p>
              </Card>
            </Link>

            <Link href="/recalls">
              <Card className="p-6 hover:border-primary/50 transition cursor-pointer h-full">
                <AlertTriangle className="w-8 h-8 text-yellow-600 mb-4" />
                <h3 className="font-semibold text-foreground mb-2">Check Recalls</h3>
                <p className="text-sm text-foreground/60">See latest government recalls</p>
              </Card>
            </Link>

            <Link href="/settings">
              <Card className="p-6 hover:border-primary/50 transition cursor-pointer h-full">
                <Activity className="w-8 h-8 text-blue-600 mb-4" />
                <h3 className="font-semibold text-foreground mb-2">Update Profile</h3>
                <p className="text-sm text-foreground/60">Manage your health information</p>
              </Card>
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
