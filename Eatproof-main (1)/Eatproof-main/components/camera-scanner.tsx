'use client'

import { useState, useRef, useEffect } from 'react'
import { Button } from './ui/button'
import { Camera, Loader, AlertCircle, Upload } from 'lucide-react'

interface CameraScannerProps {
  onScan: (code: string) => void
  loading?: boolean
}

export function CameraScanner({ onScan, loading = false }: CameraScannerProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isCameraActive, setIsCameraActive] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [hasCamera, setHasCamera] = useState(true)

  useEffect(() => {
    const initCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: 'environment' },
        })
        if (videoRef.current) {
          videoRef.current.srcObject = stream
          setIsCameraActive(true)
          setError(null)
        }
      } catch (err) {
        setHasCamera(false)
        setError('Camera access denied. Please check permissions.')
      }
    }

    if (isCameraActive) {
      initCamera()
    }

    return () => {
      if (videoRef.current?.srcObject) {
        const tracks = (videoRef.current.srcObject as MediaStream).getTracks()
        tracks.forEach((track) => track.stop())
      }
    }
  }, [isCameraActive])

  const captureFrame = () => {
    if (videoRef.current && canvasRef.current) {
      const context = canvasRef.current.getContext('2d')
      if (context) {
        context.drawImage(videoRef.current, 0, 0)
        // In a real app, you would process the image to detect QR/barcode
        // For now, simulate a scan
        setTimeout(() => {
          onScan('SCAN_' + Math.random().toString(36).substr(2, 9).toUpperCase())
        }, 800)
      }
    }
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = () => {
        // Simulate scanning uploaded image
        setTimeout(() => {
          onScan('SCAN_' + Math.random().toString(36).substr(2, 9).toUpperCase())
        }, 800)
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <div className="w-full space-y-4">
      {!isCameraActive && hasCamera ? (
        <div className="aspect-square bg-muted rounded-2xl border-2 border-dashed border-border flex flex-col items-center justify-center gap-4">
          <Camera className="w-12 h-12 text-foreground/30" />
          <Button
            onClick={() => setIsCameraActive(true)}
            size="lg"
            className="gap-2"
          >
            <Camera className="w-4 h-4" />
            Start Camera
          </Button>
        </div>
      ) : isCameraActive ? (
        <>
          <div className="relative aspect-square bg-black rounded-2xl overflow-hidden border-2 border-primary">
            <video
              ref={videoRef}
              autoPlay
              playsInline
              className="w-full h-full object-cover"
            />
            <canvas
              ref={canvasRef}
              className="hidden"
              width={640}
              height={640}
            />

            {/* Scan Frame Overlay */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-64 h-64 border-2 border-primary rounded-lg relative">
                {/* Corner markers */}
                <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-primary" />
                <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-primary" />
                <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-primary" />
                <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-primary" />
              </div>
            </div>

            {/* Scanning animation */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-64 h-1 bg-gradient-to-b from-transparent via-primary to-transparent animate-pulse" />
            </div>
          </div>

          <div className="space-y-3">
            <Button
              onClick={captureFrame}
              disabled={loading}
              size="lg"
              className="w-full gap-2"
            >
              {loading ? (
                <>
                  <Loader className="w-4 h-4 animate-spin" />
                  Scanning...
                </>
              ) : (
                <>
                  <Camera className="w-4 h-4" />
                  Capture Scan
                </>
              )}
            </Button>

            <Button
              onClick={() => setIsCameraActive(false)}
              variant="outline"
              size="lg"
              className="w-full"
            >
              Stop Camera
            </Button>
          </div>
        </>
      ) : (
        <div className="aspect-square bg-muted rounded-2xl border-2 border-dashed border-border flex flex-col items-center justify-center gap-4">
          <AlertCircle className="w-12 h-12 text-foreground/30" />
          <p className="text-center text-foreground/60">Camera not available</p>
        </div>
      )}

      {error && (
        <div className="p-4 rounded-lg bg-destructive/10 border border-destructive/30 text-destructive text-sm">
          {error}
        </div>
      )}

      {/* Upload Alternative */}
      <div className="border-t border-border pt-4">
        <p className="text-sm text-foreground/60 mb-3">Or upload an image:</p>
        <label className="flex items-center justify-center gap-2 p-4 rounded-lg border-2 border-dashed border-border hover:border-primary/50 cursor-pointer transition">
          <Upload className="w-4 h-4 text-foreground/60" />
          <span className="text-sm text-foreground/60">Upload Product Image</span>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileUpload}
            className="hidden"
          />
        </label>
      </div>
    </div>
  )
}
