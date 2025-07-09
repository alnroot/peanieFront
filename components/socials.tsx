"use client"

import React, { useRef, useEffect, useState } from "react";

const socialLinks = [
  { name: "Twitter", image: "/images/btn-twitter.png", url: "#", alt: "Twitter/X" },
  { name: "Telegram", image: "/images/btn-telegram.png", url: "#", alt: "Telegram" },
  { name: "Dexscreener", image: "/images/btn-dexscreener-social.png", url: "#", alt: "Dexscreener" },
];

export default function Socials() {
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
      id="socials"
      ref={sectionRef}
      className="min-h-screen relative overflow-hidden z-[10]"
      style={{
        backgroundImage: "url('/images/background-1.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Pingüino animado */}
      <img
        src="/images/SOCIALS-PIEANIE.png"
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
      <div className="max-w-4xl mx-auto w-full relative z-[20] pt-[10vh]">
        <div className="text-center mb-[10vh]">
          <img
            src="/images/title-socials.png"
            alt="SOCIALS"
            className="w-[50vw] max-w-xl min-w-[350px] h-auto mx-auto"
          />
        </div>
        <div className="flex flex-col gap-[4vh] items-center">
          {socialLinks.map((social) => (
            <div key={social.name} className="cursor-pointer">
              <img
                src={social.image || "/placeholder.svg"}
                alt={social.alt}
                className="h-[8vh] min-h-[60px] max-h-[120px] w-auto hover:scale-110 transition-transform duration-300"
                onClick={() => window.open(social.url, "_blank")}
              />
            </div>
          ))}
        </div>
      </div>
      {/* Degradado para transición suave */}
      <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-white/80 to-transparent z-30 pointer-events-none" />
    </section>
  );
}
