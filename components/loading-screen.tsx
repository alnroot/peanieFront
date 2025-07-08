"use client"

import { useEffect, useState } from "react"

export default function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(true)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    // Precargar imágenes críticas incluyendo las nuevas
    const imagesToPreload = [
      "/images/peanie-logo.png",
      "/images/background-1.png",
      "/images/background-2.png",
      "/images/background-3.png",
      "/images/background-4.png",
      "/images/peanie-draw-1.png",
      "/images/peanie-draw-2.png",
      "/images/peanie-draw-3.png",
      "/images/peanie-draw-4.png",
      "/images/title-socials.png",
      "/images/title-giveaways.png",
      "/images/title-pfp-maker.png",
      "/images/title-tokenomics.png",
    ]

    let loadedImages = 0
    const totalImages = imagesToPreload.length

    imagesToPreload.forEach((src) => {
      const img = new Image()
      img.onload = () => {
        loadedImages++
        const realProgress = (loadedImages / totalImages) * 100
        setProgress(realProgress)

        if (loadedImages === totalImages) {
          setTimeout(() => setIsLoading(false), 500)
        }
      }
      img.onerror = () => {
        loadedImages++
        if (loadedImages === totalImages) {
          setTimeout(() => setIsLoading(false), 500)
        }
      }
      img.src = src
    })
  }, [])

  if (!isLoading) return null

  return (
    <div className="fixed inset-0 z-[9999] bg-gradient-to-br from-blue-900 via-blue-800 to-cyan-600 flex flex-col items-center justify-center overflow-hidden">
      {/* Animated Snowflakes Background */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-pulse opacity-30 text-white text-2xl md:text-3xl"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${3 + Math.random() * 3}s`,
            }}
          >
            ❄️
          </div>
        ))}
      </div>

      {/* Floating Penguins */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-bounce opacity-40 text-white text-3xl md:text-4xl"
            style={{
              left: `${10 + (i * 10)}%`,
              top: `${20 + (i * 8)}%`,
              animationDelay: `${i * 0.3}s`,
              animationDuration: `${2 + Math.random() * 1}s`,
            }}
          >
            🐧
          </div>
        ))}
      </div>

      {/* Main Loading Content */}
      <div className="relative z-10 text-center max-w-md mx-auto px-4">
        {/* Logo Animation */}
        <div className="mb-8 relative">
          <div className="text-6xl md:text-8xl font-black text-white animate-pulse mb-2">
            PEANIE
          </div>
        </div>

        {/* Minimal Progress Bar */}
        <div className="w-full max-w-sm mx-auto mb-6">
          <div className="bg-white/20 rounded-full h-2 overflow-hidden backdrop-blur-sm border border-white/10">
            <div
              className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 h-full rounded-full transition-all duration-500 ease-out relative overflow-hidden"
              style={{ width: `${progress}%` }}
            >
              {/* Shimmer effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse" />
            </div>
          </div>
        </div>

        {/* Minimal Loading Dots */}
        <div className="flex justify-center space-x-2">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="w-1.5 h-1.5 bg-white rounded-full animate-pulse"
              style={{ 
                animationDelay: `${i * 0.3}s`,
                animationDuration: '1.2s'
              }}
            />
          ))}
        </div>
      </div>


    </div>
  )
}
