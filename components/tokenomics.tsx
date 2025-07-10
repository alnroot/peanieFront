"use client"

import React, { useRef, useEffect, useState } from "react";

export default function Tokenomics() {
  const [isMobile, setIsMobile] = useState(false);
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

    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResize);
    handleScroll(); // Llamar una vez para establecer la posición inicial
    handleResize(); // Llamar una vez para establecer el estado inicial
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <section
      id="tokenomics"
      ref={sectionRef}
      className={`${isMobile ? 'min-h-screen' : 'h-screen'} relative overflow-hidden`}
      style={{
        backgroundImage: "url('/images/background-4.png')",
        backgroundSize: isMobile ? "auto 100%" : "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        minHeight: isMobile ? '100vh' : '100vh',
        height: isMobile ? 'auto' : '100vh',
      }}
    >
      {/* Pingüino flotante */}
      <img
        src="/images/TOKENOMICS-PIEANIE.png"
        alt=""
        className="absolute top-0 left-[-3vw] w-full h-full pointer-events-none select-none"
        style={{ 
          zIndex: 1,
          transform: `translateX(${parallax.x + (isMobile ? 60 : 0)}px) translateY(${parallax.y}px) ${isMobile ? 'scaleX(1.3) scaleY(0.6)' : ''}`,
          opacity: parallax.opacity,
          transition: "transform 0.1s ease-out, opacity 0.1s ease-out",
        }}
        draggable={false}
      />
      <div className={`max-w-4xl mx-auto w-full relative z-[20] h-full ${isMobile ? 'pt-[8vh] pb-[1vh] min-h-[94vh]' : 'py-[6vh]'} flex flex-col`}>
        <div className={`text-center ${isMobile ? 'mb-[2vh]' : 'mb-0 flex-shrink-0'}`}>
          <img
            src="/images/title-tokenomics.png"
            alt="TOKENOMICS"
            className="w-[50vw] max-w-xl min-w-[350px] h-auto mx-auto"
          />
        </div>
        <div className={`flex flex-col items-center justify-center ${isMobile ? 'flex-1 gap-[2.5vh] p-[2vw]' : 'flex-1 gap-[4vh] p-[4vw]'} min-p-4 max-p-12`}>
          <img
            src="/images/btn-total-supply.png"
            alt="Total Supply: 992,101,925"
            className={`${isMobile ? 'h-[11vh] min-h-[70px] max-h-[140px]' : 'h-[20vh] min-h-[120px] max-h-[250px]'} w-auto hover:scale-105 transition-transform duration-300`}
          />
          <img
            src="/images/btn-lp-burned.png"
            alt="LP Burned: 100%"
            className={`${isMobile ? 'h-[11vh] min-h-[70px] max-h-[140px]' : 'h-[20vh] min-h-[120px] max-h-[250px]'} w-auto hover:scale-105 transition-transform duration-300`}
          />
          <img
            src="/images/btn-tax.png"
            alt="Tax: 0%"
            className={`${isMobile ? 'h-[11vh] min-h-[70px] max-h-[140px]' : 'h-[20vh] min-h-[120px] max-h-[250px]'} w-auto hover:scale-105 transition-transform duration-300`}
          />
        </div>
      </div>

    </section>
  )
}
