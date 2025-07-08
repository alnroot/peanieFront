"use client"

import { useEffect, useState } from "react"

export default function ParallaxElements() {
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    let ticking = false

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setScrollY(window.scrollY)
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <>
      {/* PEANIE Characters - ENCIMA del background, DEBAJO del contenido */}
      <div className="fixed inset-0 pointer-events-none z-[5]">
        {/* PEANIE-DRAW-1: Socials section - MEDIO A LA IZQUIERDA */}
        <div
          className="absolute"
          style={{
            left: "8%",
            top: "110vh",
            transform: `translate3d(0, ${scrollY * 0.02}px, 0)`,
            willChange: "transform",
          }}
        >
          <img
            src="/images/peanie-draw-1.png"
            alt="PEANIE with social media sign"
            className="w-[25vw] min-w-[200px] max-w-[300px] h-auto opacity-95 drop-shadow-2xl"
          />
        </div>

        {/* PEANIE-DRAW-2: Giveaways section - MEDIO A LA IZQUIERDA */}
        <div
          className="absolute"
          style={{
            left: "8%",
            top: "210vh",
            transform: `translate3d(0, ${scrollY * 0.015}px, 0)`,
            willChange: "transform",
          }}
        >
          <img
            src="/images/peanie-draw-2.png"
            alt="PEANIE with gift box"
            className="w-[27vw] min-w-[220px] max-w-[320px] h-auto opacity-95 drop-shadow-2xl"
          />
        </div>

        {/* PEANIE-DRAW-3: PFP Maker section - ABAJO A LA DERECHA */}
        <div
          className="absolute"
          style={{
            right: "5%",
            top: "340vh",
            transform: `translate3d(0, ${scrollY * 0.025}px, 0)`,
            willChange: "transform",
          }}
        >
          <img
            src="/images/peanie-draw-3.png"
            alt="PEANIE artist"
            className="w-[28vw] min-w-[230px] max-w-[330px] h-auto opacity-95 drop-shadow-2xl"
          />
        </div>

        {/* PEANIE-DRAW-4: Tokenomics section - MEDIO A LA IZQUIERDA */}
        <div
          className="absolute"
          style={{
            left: "8%",
            top: "440vh",
            transform: `translate3d(0, ${scrollY * 0.018}px, 0)`,
            willChange: "transform",
          }}
        >
          <img
            src="/images/peanie-draw-4.png"
            alt="PEANIE nerd"
            className="w-[26vw] min-w-[210px] max-w-[310px] h-auto opacity-95 drop-shadow-2xl"
          />
        </div>
      </div>

      {/* DEBUG: Puntos grandes y visibles para verificar posiciones */}
      <div className="fixed inset-0 pointer-events-none z-[6]">
        <div className="absolute left-[8%] top-[110vh] w-8 h-8 bg-red-500 rounded-full border-4 border-white shadow-lg flex items-center justify-center text-white font-bold text-xs">
          1
        </div>
        <div className="absolute left-[8%] top-[210vh] w-8 h-8 bg-green-500 rounded-full border-4 border-white shadow-lg flex items-center justify-center text-white font-bold text-xs">
          2
        </div>
        <div className="absolute right-[5%] top-[340vh] w-8 h-8 bg-blue-500 rounded-full border-4 border-white shadow-lg flex items-center justify-center text-white font-bold text-xs">
          3
        </div>
        <div className="absolute left-[8%] top-[440vh] w-8 h-8 bg-yellow-500 rounded-full border-4 border-white shadow-lg flex items-center justify-center text-white font-bold text-xs">
          4
        </div>
      </div>
    </>
  )
}
