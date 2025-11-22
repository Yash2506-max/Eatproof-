'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ShieldAlert, Microscope, TrendingUp, Zap, ArrowRight, Menu, X } from 'lucide-react'
import { motion } from 'framer-motion'

export default function HomePage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const features = [
    {
      icon: ShieldAlert,
      title: 'AI Scan',
      description: 'Advanced AI instantly verifies product authenticity and safety',
    },
    {
      icon: Microscope,
      title: 'Blockchain Verification',
      description: 'Immutable verification trail for complete transparency',
    },
    {
      icon: TrendingUp,
      title: 'Safety Score',
      description: 'Get instant 0-100 safety ratings tailored to your profile',
    },
    {
      icon: Zap,
      title: 'Personalized Warnings',
      description: 'Alerts based on your allergies and medical conditions',
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted">
      {/* Navigation */}
      <motion.nav
        className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-sm"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <motion.div
              className="flex items-center gap-2 text-xl font-bold text-primary"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <img src="/latest logo.png" alt="EatProof" className="h-6 w-6" />
              <span>EatProof</span>
            </motion.div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-8">
              <motion.a
                href="#features"
                className="text-sm text-foreground/70 hover:text-foreground transition"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Features
              </motion.a>
              <motion.a
                href="#how-it-works"
                className="text-sm text-foreground/70 hover:text-foreground transition"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                How It Works
              </motion.a>
              <motion.a
                href="#safety"
                className="text-sm text-foreground/70 hover:text-foreground transition"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Safety
              </motion.a>
              <Link href="/signup">
                <button className="custom-button">Sign Up</button>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <motion.button
              className="md:hidden p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              whileTap={{ scale: 0.9 }}
            >
              {mobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </motion.button>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <motion.div
              className="md:hidden border-t border-border py-4 space-y-3 animate-slideDown"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <a href="#features" className="block text-sm text-foreground/70 hover:text-foreground" onClick={() => setMobileMenuOpen(false)}>
                Features
              </a>
              <a href="#how-it-works" className="block text-sm text-foreground/70 hover:text-foreground" onClick={() => setMobileMenuOpen(false)}>
                How It Works
              </a>
              <a href="#safety" className="block text-sm text-foreground/70 hover:text-foreground" onClick={() => setMobileMenuOpen(false)}>
                Safety
              </a>
              <Link href="/signup" className="block" onClick={() => setMobileMenuOpen(false)}>
                <button className="custom-button w-full">Sign Up</button>
              </Link>
            </motion.div>
          )}
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 md:py-32">
        <motion.div
          className="grid md:grid-cols-2 gap-12 items-center"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="space-y-6">
            <motion.div
              className="inline-block px-3 py-1 rounded-full bg-primary/10 border border-primary/20"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <span className="text-sm font-medium text-primary">Your AI Firewall for Food & Medicine</span>
            </motion.div>
            <motion.h1
              className="text-4xl md:text-5xl font-bold text-balance text-foreground leading-tight"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              Know Instantly If Your Food & Medicine Is Real, Safe & Right For You
            </motion.h1>
            <motion.p
              className="text-lg text-foreground/60 text-balance leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
            >
              Scan any product with your phone. Get instant AI verification, blockchain authentication, and personalized safety warnings based on your health profile.
            </motion.p>
            <motion.div
              className="flex flex-col sm:flex-row gap-4 pt-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
            >
              <Link href="/scan">
                <button className="custom-button-outline w-full sm:w-auto group">
                  Scan Product
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </Link>
              <Link href="/signup">
                <button className="custom-button-outline w-full sm:w-auto">
                  Create Profile
                </button>
              </Link>
            </motion.div>
          </div>

          {/* Hero Image Placeholder */}
          <motion.div
            className="relative h-96 md:h-full bg-gradient-to-br from-primary/20 to-accent/10 rounded-2xl border border-border overflow-hidden flex items-center justify-center parallax-bg"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            <img src="/123.jpg" alt="Product Scan" className="w-full h-full object-cover" />
          </motion.div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section id="features" className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 md:py-24 overflow-hidden">
        {/* Floating Icons Background */}
        <div className="absolute inset-0 pointer-events-none">
          <motion.div
            className="absolute top-10 left-10 text-primary/10"
            animate={{ y: [0, -20, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          >
            <ShieldAlert className="h-16 w-16" />
          </motion.div>
          <motion.div
            className="absolute top-20 right-20 text-accent/10"
            animate={{ y: [0, 20, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          >
            <Microscope className="h-12 w-12" />
          </motion.div>
          <motion.div
            className="absolute bottom-20 left-1/4 text-primary/10"
            animate={{ y: [0, -15, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          >
            <Zap className="h-10 w-10" />
          </motion.div>
        </div>

        <motion.div
          className="text-center mb-12 scroll-fade-in"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Complete Safety Solution
          </h2>
          <p className="text-lg text-foreground/60 max-w-2xl mx-auto">
            Everything you need to verify product authenticity and ensure your health and safety
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {features.map((feature, index) => {
                const Icon = feature.icon
                return (
                  <motion.div
                    key={index}
                    className="p-6 rounded-xl border border-border bg-card hover:border-primary/50 hover:shadow-lg transition-all duration-300 cursor-pointer"
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    whileHover={{ scale: 1.05, y: -5 }}
                  >
                    <div>
                      <Icon className="h-8 w-8 text-primary mb-4" />
                    </div>
                    <h3 className="font-semibold text-foreground mb-2">{feature.title}</h3>
                    <p className="text-sm text-foreground/60">{feature.description}</p>
                  </motion.div>
                )
              })}
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 md:py-24 bg-muted/30 rounded-2xl overflow-hidden">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Simple 3-Step Process
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            { step: '1', title: 'Set Your Profile', desc: 'Add your allergies, medications, and health info' },
            { step: '2', title: 'Scan Product', desc: 'Point camera at QR code or barcode' },
            { step: '3', title: 'Get Safety Report', desc: 'Instant verification and personalized warnings' },
          ].map((item, index) => (
            <motion.div
              key={item.step}
              className="text-center"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
            >
              <motion.div
                className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold mb-4"
                whileHover={{ scale: 1.1, rotate: 360 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                {item.step}
              </motion.div>
              <h3 className="font-semibold text-foreground mb-2">{item.title}</h3>
              <p className="text-foreground/60">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Safety Highlights */}
      <section id="safety" className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              Verified Safe Products Only
            </h2>
            <div className="space-y-4">
              {[
                'Blockchain-verified authenticity',
                'FSSAI and FDA integration',
                'Real-time recall alerts',
                'Crowdsourced safety reports',
                'Batch-level verification',
                'Tamper detection alerts',
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="h-6 w-6 rounded-full bg-primary/20 flex items-center justify-center mt-0.5 flex-shrink-0">
                    <Zap className="h-3 w-3 text-primary" />
                  </div>
                  <p className="text-foreground/80">{item}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="h-96 bg-gradient-to-br from-accent/20 to-primary/10 rounded-2xl border border-border flex items-center justify-center">
            <img src="/latest logo.png" alt="EatProof Logo" className="h-24 w-24" />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <motion.div
          className="relative rounded-2xl bg-gradient-to-r from-primary/10 to-accent/10 border border-border overflow-hidden px-6 py-12 md:px-12 md:py-16 text-center"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <motion.h2
            className="text-3xl md:text-4xl font-bold text-foreground mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            Ready to Know Your Products Are Safe?
          </motion.h2>
          <motion.p
            className="text-lg text-foreground/60 mb-8 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            Join thousands of users protecting their health and detecting counterfeit products
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            <Link href="/signup">
              <button className="custom-button gap-2 group">
                Get Started Free
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-background mt-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
            <div className="flex items-center gap-2">
              <img src="/latest logo.png" alt="EatProof" className="h-5 w-5" />
              <span className="font-semibold text-foreground">EatProof</span>
            </div>
            <div className="flex flex-wrap gap-8 text-sm text-foreground/60">
              <a href="#" className="hover:text-foreground transition">Privacy</a>
              <a href="#" className="hover:text-foreground transition">Terms</a>
              <a href="#" className="hover:text-foreground transition">Contact</a>
              <a href="#" className="hover:text-foreground transition">Blog</a>
            </div>
          </div>
          <div className="mt-8 border-t border-border pt-8 text-center text-sm text-foreground/50">
            <p>© 2025 EatProof. Your AI Firewall for Food & Medicine Safety.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
