"use client"

import React, { useRef, useEffect, useState } from "react";

const socialLinks = [
  { name: "Twitter", image: "/images/btn-twitter.png", url: "https://x.com/peanieonsolana", alt: "Twitter/X" },
  { name: "Telegram", image: "/images/btn-telegram.png", url: "https://t.me/peaniesol", alt: "Telegram" },
  { name: "Dexscreener", image: "/images/btn-dexscreener-social.png", url: "https://dexscreener.com/solana/bhwwtwxustphvisrvfebb7jnezhjzahcqae8bchc9jyp", alt: "Dexscreener" },
];

export default function Socials() {
  const [parallax, setParallax] = useState({ x: 0, y: 0, opacity: 1 });
  const [isMobile, setIsMobile] = useState(false);
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
      id="socials"
      ref={sectionRef}
      className="min-h-screen relative overflow-hidden z-[10]"
      style={{
        backgroundImage: "url('/images/background-1.png')",
        backgroundSize: isMobile ? "auto 100%" : "cover",
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
          transform: `translateX(${parallax.x + (isMobile ? 100 : 0)}px) translateY(${parallax.y + (isMobile ? 10 : 0)}px) ${isMobile ? 'scaleX(1.5) scaleY(0.6)' : ''}`,
          opacity: parallax.opacity,
          transition: "transform 0.1s ease-out, opacity 0.1s ease-out",
        }}
        draggable={false}
      />
      <div className="max-w-4xl mx-auto w-full relative z-[20] pt-[14vh]">
        <div className="text-center mb-[14vh]">
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

    </section>
  );
}
