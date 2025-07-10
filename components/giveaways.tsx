"use client"

import React, { useRef, useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";

export default function Giveaways() {
  const [animation, setAnimation] = useState({ x: 0, y: -200, opacity: 0 });
  const [isMobile, setIsMobile] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      
      const rect = sectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const sectionCenter = rect.top + rect.height / 2;
      const windowCenter = windowHeight / 2;
      
      // Calcular la posición relativa al centro (sin valor absoluto)
      const relativePosition = (sectionCenter - windowCenter) / windowHeight;
      
      // Efecto parallax continuo: arriba → centro → abajo
      const threshold = 0.3; // Zona de transición
      
      let newOpacity, newY, newX;
      
      if (Math.abs(relativePosition) < threshold) {
        // En la zona central - pingüino visible y posicionado
        const progress = 1 - (Math.abs(relativePosition) / threshold);
        newOpacity = progress;
        newY = 0; // Posición final
        newX = 0; // Sin movimiento horizontal
      } else if (relativePosition < 0) {
        // Arriba del centro - pingüino viene de arriba
        const progress = Math.min(Math.abs(relativePosition + threshold) / 0.2, 1);
        newOpacity = 1 - progress;
        newY = -200 * progress; // De 0px a -200px
        newX = 0; // Sin movimiento horizontal
      } else {
        // Abajo del centro - pingüino continúa hacia abajo
        const progress = Math.min((relativePosition - threshold) / 0.2, 1);
        newOpacity = 1 - progress;
        newY = progress * 200; // De 0px a 200px (continúa hacia abajo)
        newX = 0; // Sin movimiento horizontal
      }
      
      setAnimation({
        x: newX,
        y: newY,
        opacity: newOpacity,
      });
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
      id="giveaways"
      ref={sectionRef}
      className="min-h-screen relative overflow-hidden"
      style={{
        backgroundImage: "url('/images/background-2.png')",
        backgroundSize: isMobile ? "auto 100%" : "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Pingüino con efecto parallax continuo */}
      <img
        src="/images/GIVEAWAYS-PIEANIE.png"
        alt=""
        className="absolute top-0 left-0 w-full h-full select-none pointer-events-none"
        style={{
          zIndex: 1,
          transform: `translateX(${animation.x + (isMobile ? -60 : 0)}px) translateY(${animation.y}px) ${isMobile ? 'scaleX(1.3) scaleY(0.6)' : ''}`,
          opacity: animation.opacity,
          transition: "transform 0.15s ease-out, opacity 0.15s ease-out",
        }}
        draggable={false}
      />
      {/* Contenido */}
      <div className="max-w-4xl mx-auto w-full relative z-[20] pt-[3vh]">
        <div className="text-center mb-[10vh]">
          <img
            src="/images/title-giveaways.png"
            alt="GIVEAWAYS"
            className="w-[50vw] max-w-xl min-w-[350px] h-auto mx-auto"
          />
        </div>
        <div className="max-w-md md:max-w-xl mx-auto px-8 md:px-0">
          <h2 className="text-[rgba(0,185,219,1)] font-bold leading-tight text-[4vw] min-text-xl max-text-4xl md:text-4xl mb-4">
            GIVEAWAYS every Sunday!
          </h2>
          <ul className="bullet-list text-black text-[3vw] min-text-lg max-text-xl md:text-xl mb-6">
            <li>
              <span className="custom-bullet">•</span>
              <span className="bullet-text">To win, you must have been active in the community during the week.</span>
            </li>
            <li>
              <span className="custom-bullet">•</span>
              <span className="bullet-text">The most active people receive the prize.</span>
            </li>
            <li>
              <span className="custom-bullet">•</span>
              <span className="bullet-text">The prize = $peanie tokens.</span>
            </li>
            <li>
              <span className="custom-bullet">•</span>
              <span className="bullet-text">They will be observed by us. It must be EVIDENT that the winners were present and supporting.</span>
            </li>
            <li>
              <span className="custom-bullet">•</span>
              <span className="bullet-text">The prize is awarded 2 weeks after winning. If you decide to keep it longer and continue supporting $peanie, you accumulate chances to winning in the comes weeks.</span>
            </li>
            <li>
              <span className="custom-bullet">•</span>
              <span className="bullet-text">The top 3 each month receive an extra prize!</span>
            </li>
          </ul>
          <h2 className="text-[rgba(0,185,219,1)] font-bold leading-tight text-[4vw] min-text-xl max-text-4xl md:text-4xl mb-4">
            Requirements:
          </h2>
          <ul className="bullet-list text-black text-[3vw] min-text-lg max-text-xl md:text-xl">
            <li>
              <span className="custom-bullet">•</span>
              <span className="bullet-text">Join the community on X.</span>
            </li>
            <li>
              <span className="custom-bullet">•</span>
              <span className="bullet-text">Raids every day, use $peanie memes and create new ones to increase your chances.</span>
            </li>
            <li>
              <span className="custom-bullet">•</span>
              <span className="bullet-text">Own +15,000 $peanie tokens</span>
            </li>
            <li>
              <span className="custom-bullet">•</span>
              <span className="bullet-text">Use a PFP with reference to $peanie.</span>
            </li>
            <li>
              <span className="custom-bullet">•</span>
              <span className="bullet-text">Have a smol $peanie.</span>
            </li>
          </ul>
        </div>
      </div>

      <style jsx>{`
        .custom-bullet {
          color: rgba(0,185,219,1);
          font-size: 1.5em;
          font-weight: bold;
          margin-right: 0.5em;
        }
        .bullet-list {
          list-style: none;
          padding-left: 0;
          margin: 0;
        }
        .bullet-list li {
          display: flex;
          align-items: flex-start;
          margin-bottom: 0;
        }
        .bullet-text {
          flex: 1;
          line-height: 1.1;
        }
      `}</style>
    </section>
  );
}
