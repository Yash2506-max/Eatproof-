'use client'

import Link from 'next/link'
import { Button } from './ui/button'
import { ShieldAlert, Menu, X, Sun, Moon } from 'lucide-react'
import { useState, useEffect } from 'react'
import { useTheme } from 'next-themes'

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <nav className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-xl font-bold text-primary">
            <img src="/latest logo.png" alt="EatProof" className="h-6 w-6" />
            <span>EatProof</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            <Link href="/" className="text-sm text-foreground/70 hover:text-foreground transition">
              Home
            </Link>
            <Link href="/dashboard" className="text-sm text-foreground/70 hover:text-foreground transition">
              Dashboard
            </Link>
            <Link href="/recalls" className="text-sm text-foreground/70 hover:text-foreground transition">
              Recalls
            </Link>
            {mounted && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              >
                {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              </Button>
            )}
            <Link href="/settings">
              <Button variant="ghost" size="sm">Settings</Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-2">
            {mounted && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              >
                {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              </Button>
            )}
            <button
              className="p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-border py-4 space-y-3 animate-slideDown">
            <Link href="/" className="block text-sm text-foreground/70 hover:text-foreground" onClick={() => setMobileMenuOpen(false)}>
              Home
            </Link>
            <Link href="/dashboard" className="block text-sm text-foreground/70 hover:text-foreground" onClick={() => setMobileMenuOpen(false)}>
              Dashboard
            </Link>
            <Link href="/recalls" className="block text-sm text-foreground/70 hover:text-foreground" onClick={() => setMobileMenuOpen(false)}>
              Recalls
            </Link>
            <Link href="/settings" onClick={() => setMobileMenuOpen(false)}>
              <Button variant="outline" className="w-full">Settings</Button>
            </Link>
          </div>
        )}
      </div>
    </nav>
  )
}
