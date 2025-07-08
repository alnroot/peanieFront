"use client"

import { useEffect, useState } from "react"

export default function Hero() {
  const [scrollY, setScrollY] = useState(0)
  const [imageLoaded, setImageLoaded] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener("scroll", handleScroll)

    // Marcar HTML como cargado para prevenir FOUC
    document.documentElement.classList.add("loaded")

    // Verificar si la imagen ya está cargada
    const img = new Image()
    img.onload = () => setImageLoaded(true)
    img.onerror = () => setImageLoaded(true) // Si hay error, también mostrar la imagen
    img.src = "/images/peanie-logo.png"

    // Timeout de seguridad para forzar la carga después de 2 segundos
    const timeout = setTimeout(() => {
      setImageLoaded(true)
    }, 2000)

    return () => {
      window.removeEventListener("scroll", handleScroll)
      clearTimeout(timeout)
    }
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  const logoTransform = `translateY(${scrollY * 0.3}px) translateX(${Math.sin(scrollY * 0.01) * 5}px)`
  const logoScale = Math.max(0.8, 1 - scrollY / 2000)
  const logoRotation = scrollY * 0.02

  return (
    <>
      <section id="principal" className="relative h-screen flex flex-col items-center justify-center overflow-hidden">
        <style jsx>{`
          #principal {
            background-image: url('/images/bg-titular.png');
            background-size: 100% 100%;
            background-position: center;
            background-repeat: no-repeat;
            background-attachment: fixed;
            background-color: rgba(30, 58, 138, 0.9);
          }
          
          @media (max-width: 768px) {
            #principal {
              background-attachment: scroll;
              background-size: cover;
            }
          }
        `}</style>

        {/* Static Snowflakes Overlay */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat pointer-events-none opacity-60"
          style={{ backgroundImage: "url('/images/snowflakes-static.png')" }}
        ></div>

        {/* LOGO GIGANTE - Con loading state */}
        <div
          className="relative z-10 text-center w-full h-full flex items-center justify-center p-[10vh]"
          style={{
            transform: `${logoTransform} scale(${logoScale}) rotate(${logoRotation}deg)`,
            transition: "transform 0.1s ease-out",
          }}
        >
          <img
            src="/images/peanie-logo.png"
            alt="PEANIE Logo"
            className={`w-full h-full object-contain max-w-none transition-opacity duration-500 ${
              imageLoaded ? "opacity-100" : "opacity-0"
            }`}
            style={{
              width: "80vw",
              height: "80vh",
              objectFit: "contain",
            }}
          />

          {/* Fallback mientras carga */}
          {!imageLoaded && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-8xl md:text-9xl font-black text-white animate-pulse">PEANIE</div>
            </div>
          )}
        </div>
      </section>

      {/* MENÚ FLOTANTE FIJO EN LA PARTE INFERIOR */}
      <nav className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50 w-[90vw] max-w-4xl">
        <div
          className="bg-[#c5e8ef]/95 backdrop-blur-md rounded-full px-2 md:px-4 py-2 shadow-2xl border border-white/20"
          style={{
            boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.1)",
          }}
        >
          <div
            className="flex flex-wrap items-center justify-center gap-1 md:gap-2 text-[#285e75] font-bold text-xs md:text-sm lg:text-base"
            style={{ fontFamily: "Montserrat, sans-serif" }}
          >
            <button
              className="hover:scale-110 transition-all duration-300 px-1.5 md:px-2 py-1 rounded-full hover:bg-white/20 text-xs md:text-sm lg:text-base"
              onClick={() => scrollToSection("socials")}
            >
              SOCIALS
            </button>

            <div className="w-px h-3 md:h-4 bg-[#285e75] opacity-50"></div>

            <button
              className="hover:scale-110 transition-all duration-300 px-1.5 md:px-2 py-1 rounded-full hover:bg-white/20 text-xs md:text-sm lg:text-base"
              onClick={() => scrollToSection("giveaways")}
            >
              GIVEAWAYS
            </button>

            <div className="w-px h-3 md:h-4 bg-[#285e75] opacity-50"></div>

            <button
              className="hover:scale-110 transition-all duration-300 px-1.5 md:px-2 py-1 rounded-full hover:bg-white/20 text-xs md:text-sm lg:text-base"
              onClick={() => scrollToSection("pfp-maker")}
            >
              PFP MAKER
            </button>

            <div className="w-px h-3 md:h-4 bg-[#285e75] opacity-50"></div>

            <button
              className="hover:scale-110 transition-all duration-300 px-1.5 md:px-2 py-1 rounded-full hover:bg-white/20 text-xs md:text-sm lg:text-base"
              onClick={() => scrollToSection("tokenomics")}
            >
              TOKENOMICS
            </button>

            <div className="w-px h-3 md:h-4 bg-[#285e75] opacity-50"></div>

            <button
              className="hover:scale-110 transition-all duration-300 px-1.5 md:px-2 py-1 rounded-full hover:bg-white/20 text-xs md:text-sm lg:text-base"
              onClick={() => scrollToSection("memes")}
            >
              MEMES
            </button>
          </div>
        </div>
      </nav>
    </>
  )
}
