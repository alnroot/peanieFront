"use client"

import React, { useRef, useEffect, useState } from "react";

const socialLinks = [
  { name: "Twitter", image: "/images/btn-twitter.png", url: "#", alt: "Twitter/X" },
  { name: "Telegram", image: "/images/btn-telegram.png", url: "#", alt: "Telegram" },
  { name: "Dexscreener", image: "/images/btn-dexscreener-social.png", url: "#", alt: "Dexscreener" },
];

export default function Socials() {
  const [parallax, setParallax] = useState({ x: 0, y: 0, rot: 0 });
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let animationFrame: number;
    const animate = () => {
      const scrollY = window.scrollY || window.pageYOffset;
      const t = Date.now() / 1000;
      // Movimiento en X: onda senoidal
      const x = Math.sin(t) * 30;
      // Movimiento en Y: onda senoidal + scroll
      const y = Math.cos(t * 0.7) * 20 + (scrollY % 100) * 0.2;
      // Rotación sutil
      const rot = Math.sin(t * 0.8) * 5;
      setParallax({ x, y, rot });
      animationFrame = requestAnimationFrame(animate);
    };
    animate();
    return () => cancelAnimationFrame(animationFrame);
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
          transform: `translateX(${parallax.x}px) translateY(${parallax.y}px) rotate(${parallax.rot}deg)`,
          transition: "none",
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
