import React, { useRef, useEffect, useState } from "react";

interface ParallaxSectionProps {
  background: string; // ruta del background
  penguin: string;    // ruta del png flotante
  children?: React.ReactNode;
  height?: string;    // altura de la sección, ej: '768px' o '100vh'
}

export default function ParallaxSection({
  background,
  penguin,
  children,
  height = "768px",
}: ParallaxSectionProps) {
  const [offset, setOffset] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const scrollY = window.scrollY || window.pageYOffset;
      const base = rect.top + scrollY;
      const relScroll = scrollY - base;
      setOffset(relScroll * 0.2); // 0.2 = fuerza del parallax
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      ref={sectionRef}
      className="relative w-full overflow-hidden"
      style={{
        minHeight: height,
        backgroundImage: `url(${background})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Penguin parallax */}
      <img
        src={penguin}
        alt=""
        className="absolute top-0 left-0 w-full h-full pointer-events-none select-none"
        style={{
          transform: `translateY(${offset}px)`,
          transition: "transform 0.2s",
          zIndex: 2,
        }}
        draggable={false}
      />
      {/* Contenido de la sección */}
      <div className="relative z-10">{children}</div>
    </div>
  );
} 