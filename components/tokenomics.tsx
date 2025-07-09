"use client"

import React, { useRef, useEffect, useState } from "react";

export default function Tokenomics() {
  const [parallax, setParallax] = useState({ x: 0, y: 0, opacity: 1 });
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      
      const rect = sectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const sectionCenter = rect.top + rect.height / 2;
      const windowCenter = windowHeight / 2;
      
      // Calcular la posición relativa al centro
      const relativePosition = (sectionCenter - windowCenter) / windowHeight;
      
      // Efecto parallax suave basado en scroll
      const scrollFactor = 0.5;
      const x = relativePosition * 200 * scrollFactor; // Movimiento horizontal
      const y = relativePosition * 150 * scrollFactor; // Movimiento vertical
      
      // Opacidad basada en la distancia del centro
      const maxDistance = 1.5;
      const opacity = Math.max(0, 1 - Math.abs(relativePosition) / maxDistance);
      
      setParallax({ x, y, opacity });
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Llamar una vez para establecer la posición inicial
    
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section
      id="tokenomics"
      ref={sectionRef}
      className="min-h-screen flex items-center relative overflow-hidden"
      style={{
        backgroundImage: "url('/images/background-4.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Pingüino flotante */}
      <img
        src="/images/TOKENOMICS-PIEANIE.png"
        alt=""
        className="absolute top-0 left-0 w-full h-full pointer-events-none select-none"
        style={{ 
          zIndex: 1,
          transform: `translateX(${parallax.x}px) translateY(${parallax.y}px) scaleX(1) scaleY(0.6)`,
          opacity: parallax.opacity,
          transition: "transform 0.1s ease-out, opacity 0.1s ease-out",
        }}
        draggable={false}
      />
      <div className="max-w-4xl mx-auto w-full relative z-[20] pt-[8vh]">
        <div className="text-center mb-[10vh]">
          <img
            src="/images/title-tokenomics.png"
            alt="TOKENOMICS"
            className="w-[50vw] max-w-xl min-w-[350px] h-auto mx-auto"
          />
        </div>
        <div className="flex flex-col items-center gap-[6vh] p-[4vw] min-p-4 max-p-12">
          <img
            src="/images/btn-total-supply.png"
            alt="Total Supply: 992,101,925"
            className="h-[20vh] min-h-[120px] max-h-[250px] w-auto hover:scale-105 transition-transform duration-300"
          />
          <img
            src="/images/btn-lp-burned.png"
            alt="LP Burned: 100%"
            className="h-[20vh] min-h-[120px] max-h-[250px] w-auto hover:scale-105 transition-transform duration-300"
          />
          <img
            src="/images/btn-tax.png"
            alt="Tax: 0%"
            className="h-[20vh] min-h-[120px] max-h-[250px] w-auto hover:scale-105 transition-transform duration-300"
          />
        </div>
      </div>
      {/* Degradado para transición suave */}
      <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-white/80 to-transparent z-30 pointer-events-none" />
    </section>
  )
}
