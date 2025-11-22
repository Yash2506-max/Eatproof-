'use client'

import { useState } from 'react'
import { Header } from '@/components/header'
import { SettingsSection, SettingsItem } from '@/components/settings-section'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Switch } from '@/components/ui/switch'
import { User, Lock, Bell, Eye, Globe, LogOut, Trash2, Shield } from 'lucide-react'

export default function SettingsPage() {
  const [notifications, setNotifications] = useState({
    recalls: true,
    allergens: true,
    weekly: true,
    nearby: false,
  })

  const [privacy, setPrivacy] = useState({
    crowdsourced: true,
    location: false,
    analytics: true,
  })

  const allergyOptions = ['Nuts', 'Gluten', 'Lactose', 'Shellfish', 'Soy', 'Eggs', 'Peanuts', 'Fish']
  const selectedAllergies = ['Nuts', 'Gluten', 'Lactose']

  return (
    <>
      <Header />
      <div className="min-h-screen bg-background pt-8 pb-12">
        <div className="mx-auto max-w-4xl px-4">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
              Settings & Profile
            </h1>
            <p className="text-lg text-foreground/60">
              Manage your account, health profile, and preferences
            </p>
          </div>

          <Tabs defaultValue="profile" className="w-full space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="profile" className="gap-2">
                <User className="w-4 h-4" />
                <span className="hidden sm:inline">Profile</span>
              </TabsTrigger>
              <TabsTrigger value="health" className="gap-2">
                <Shield className="w-4 h-4" />
                <span className="hidden sm:inline">Health</span>
              </TabsTrigger>
              <TabsTrigger value="notifications" className="gap-2">
                <Bell className="w-4 h-4" />
                <span className="hidden sm:inline">Alerts</span>
              </TabsTrigger>
              <TabsTrigger value="privacy" className="gap-2">
                <Lock className="w-4 h-4" />
                <span className="hidden sm:inline">Privacy</span>
              </TabsTrigger>
            </TabsList>

            {/* Profile Tab */}
            <TabsContent value="profile" className="space-y-6">
              <SettingsSection title="Profile Information" description="Update your basic information">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Full Name</label>
                    <input
                      type="text"
                      placeholder="Your name"
                      className="w-full px-4 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                      defaultValue="Sarah Johnson"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Email</label>
                    <input
                      type="email"
                      placeholder="your@email.com"
                      className="w-full px-4 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                      defaultValue="sarah@example.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Phone Number</label>
                    <input
                      type="tel"
                      placeholder="+1 (555) 123-4567"
                      className="w-full px-4 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                      defaultValue="+1 (555) 123-4567"
                    />
                  </div>
                  <Button className="w-full">Save Changes</Button>
                </div>
              </SettingsSection>

              <SettingsSection title="Account Security" description="Keep your account safe">
                <SettingsItem
                  label="Password"
                  description="Last changed 3 months ago"
                  action={<Button size="sm" variant="outline">Change</Button>}
                />
                <SettingsItem
                  label="Two-Factor Authentication"
                  description="Add an extra layer of security"
                  action={<Button size="sm" variant="outline">Enable</Button>}
                />
              </SettingsSection>
            </TabsContent>

            {/* Health Profile Tab */}
            <TabsContent value="health" className="space-y-6">
              <SettingsSection title="Medical Profile" description="Your health information">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Age</label>
                    <input
                      type="number"
                      placeholder="Your age"
                      className="w-full px-4 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                      defaultValue="28"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Diet Type</label>
                    <select className="w-full px-4 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary">
                      <option>Vegetarian</option>
                      <option>Non-Vegetarian</option>
                      <option>Vegan</option>
                      <option>Keto</option>
                    </select>
                  </div>
                </div>
              </SettingsSection>

              <SettingsSection title="Allergies" description="Select all allergies that apply to you">
                <div className="grid grid-cols-2 gap-3">
                  <label className="flex items-center gap-3 p-3 rounded-lg border border-border hover:border-primary/50 cursor-pointer transition">
                    <input
                      type="checkbox"
                      className="w-4 h-4 rounded cursor-pointer"
                    />
                    <span className="text-sm">None</span>
                  </label>
                  {allergyOptions.map((allergy) => (
                    <label key={allergy} className="flex items-center gap-3 p-3 rounded-lg border border-border hover:border-primary/50 cursor-pointer transition">
                      <input
                        type="checkbox"
                        defaultChecked={selectedAllergies.includes(allergy)}
                        className="w-4 h-4 rounded cursor-pointer"
                      />
                      <span className="text-sm">{allergy}</span>
                    </label>
                  ))}
                  <label className="flex items-center gap-3 p-3 rounded-lg border border-border hover:border-primary/50 cursor-pointer transition">
                    <input
                      type="checkbox"
                      className="w-4 h-4 rounded cursor-pointer"
                    />
                    <span className="text-sm">Other</span>
                  </label>
                </div>
              </SettingsSection>

              <SettingsSection title="Medical Conditions" description="This helps us provide better alerts">
                <div className="space-y-3">
                  {['Diabetes', 'Hypertension', 'Asthma', 'Heart Disease'].map((condition) => (
                    <label key={condition} className="flex items-center gap-3 p-3 rounded-lg border border-border hover:border-primary/50 cursor-pointer transition">
                      <input
                        type="checkbox"
                        className="w-4 h-4 rounded cursor-pointer"
                      />
                      <span className="text-sm">{condition}</span>
                    </label>
                  ))}
                </div>
                <Button variant="outline" className="w-full mt-4">Add Custom Condition</Button>
              </SettingsSection>

              <Button className="w-full">Update Health Profile</Button>
            </TabsContent>

            {/* Notifications Tab */}
            <TabsContent value="notifications" className="space-y-6">
              <SettingsSection title="Alert Preferences" description="Customize what notifications you receive">
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 rounded-lg border border-border">
                    <div>
                      <p className="font-medium text-foreground">Food Recalls</p>
                      <p className="text-sm text-foreground/60">Get alerts about product recalls</p>
                    </div>
                    <Switch
                      checked={notifications.recalls}
                      onCheckedChange={(checked) =>
                        setNotifications({ ...notifications, recalls: checked })
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between p-4 rounded-lg border border-border">
                    <div>
                      <p className="font-medium text-foreground">Allergen Warnings</p>
                      <p className="text-sm text-foreground/60">Alerts when you scan items with your allergens</p>
                    </div>
                    <Switch
                      checked={notifications.allergens}
                      onCheckedChange={(checked) =>
                        setNotifications({ ...notifications, allergens: checked })
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between p-4 rounded-lg border border-border">
                    <div>
                      <p className="font-medium text-foreground">Weekly Report</p>
                      <p className="text-sm text-foreground/60">Receive a weekly safety summary</p>
                    </div>
                    <Switch
                      checked={notifications.weekly}
                      onCheckedChange={(checked) =>
                        setNotifications({ ...notifications, weekly: checked })
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between p-4 rounded-lg border border-border">
                    <div>
                      <p className="font-medium text-foreground">Nearby Alerts</p>
                      <p className="text-sm text-foreground/60">Notifications about issues near your location</p>
                    </div>
                    <Switch
                      checked={notifications.nearby}
                      onCheckedChange={(checked) =>
                        setNotifications({ ...notifications, nearby: checked })
                      }
                    />
                  </div>
                </div>
              </SettingsSection>

              <SettingsSection title="Notification Channel" description="How we contact you">
                <SettingsItem
                  label="Email Notifications"
                  value="Enabled"
                  action={<Button size="sm" variant="outline">Change</Button>}
                />
                <SettingsItem
                  label="Push Notifications"
                  value="Enabled"
                  action={<Button size="sm" variant="outline">Manage</Button>}
                />
              </SettingsSection>
            </TabsContent>

            {/* Privacy & Security Tab */}
            <TabsContent value="privacy" className="space-y-6">
              <SettingsSection title="Data & Privacy" description="Control how your data is used">
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 rounded-lg border border-border">
                    <div>
                      <p className="font-medium text-foreground">Crowdsourced Data</p>
                      <p className="text-sm text-foreground/60">Help improve safety by sharing scan data</p>
                    </div>
                    <Switch
                      checked={privacy.crowdsourced}
                      onCheckedChange={(checked) =>
                        setPrivacy({ ...privacy, crowdsourced: checked })
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between p-4 rounded-lg border border-border">
                    <div>
                      <p className="font-medium text-foreground">Location Sharing</p>
                      <p className="text-sm text-foreground/60">Share location for localized alerts</p>
                    </div>
                    <Switch
                      checked={privacy.location}
                      onCheckedChange={(checked) =>
                        setPrivacy({ ...privacy, location: checked })
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between p-4 rounded-lg border border-border">
                    <div>
                      <p className="font-medium text-foreground">Analytics</p>
                      <p className="text-sm text-foreground/60">Help us improve the app with usage data</p>
                    </div>
                    <Switch
                      checked={privacy.analytics}
                      onCheckedChange={(checked) =>
                        setPrivacy({ ...privacy, analytics: checked })
                      }
                    />
                  </div>
                </div>
              </SettingsSection>

              <SettingsSection title="Data Management" description="Control your personal data">
                <SettingsItem
                  label="Download Your Data"
                  description="Export all your information in a standard format"
                  action={<Button size="sm" variant="outline">Download</Button>}
                />
                <SettingsItem
                  label="Scan History"
                  description="Delete all past scans and history"
                  action={<Button size="sm" variant="outline">Clear</Button>}
                />
              </SettingsSection>

              <SettingsSection title="Danger Zone" description="Irreversible actions">
                <div className="p-4 rounded-lg border border-destructive/30 bg-destructive/5 space-y-3">
                  <p className="text-sm text-destructive font-medium">Delete Account</p>
                  <p className="text-sm text-foreground/60">
                    This will permanently delete your account and all associated data. This action cannot be undone.
                  </p>
                  <Button variant="outline" className="border-destructive text-destructive hover:bg-destructive/10 w-full">
                    <Trash2 className="w-4 h-4 mr-2" />
                    Delete Account
                  </Button>
                </div>
              </SettingsSection>

              <Button variant="outline" className="w-full gap-2">
                <LogOut className="w-4 h-4" />
                Logout
              </Button>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  )
}
