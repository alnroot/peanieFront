"use client"

export default function Component() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="relative">
        <h1 className="melting-text text-8xl font-black tracking-wider select-none">PEANIE</h1>

        {/* Drip effects */}
        <div className="absolute top-full left-0 w-full h-32 pointer-events-none">
          {/* P drip */}
          <div className="absolute drip drip-1" style={{ left: "8%" }}></div>
          <div className="absolute drip drip-2" style={{ left: "12%" }}></div>

          {/* E drip */}
          <div className="absolute drip drip-3" style={{ left: "22%" }}></div>
          <div className="absolute drip drip-4" style={{ left: "26%" }}></div>

          {/* A drip */}
          <div className="absolute drip drip-5" style={{ left: "38%" }}></div>
          <div className="absolute drip drip-6" style={{ left: "42%" }}></div>

          {/* N drip */}
          <div className="absolute drip drip-7" style={{ left: "54%" }}></div>
          <div className="absolute drip drip-8" style={{ left: "58%" }}></div>

          {/* I drip */}
          <div className="absolute drip drip-9" style={{ left: "68%" }}></div>

          {/* E drip */}
          <div className="absolute drip drip-10" style={{ left: "78%" }}></div>
          <div className="absolute drip drip-11" style={{ left: "82%" }}></div>
        </div>
      </div>

      <style jsx>{`
        .melting-text {
          background: linear-gradient(135deg, #87CEEB 0%, #4682B4 50%, #1E90FF 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          text-shadow: 
            0 0 20px rgba(135, 206, 235, 0.5),
            0 0 40px rgba(135, 206, 235, 0.3),
            0 0 60px rgba(135, 206, 235, 0.2);
          filter: drop-shadow(0 8px 16px rgba(70, 130, 180, 0.3));
          position: relative;
        }
        
        .melting-text::before {
          content: 'PEANIE';
          position: absolute;
          top: 0;
          left: 0;
          background: linear-gradient(135deg, #B0E0E6 0%, #87CEEB 50%, #4682B4 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          filter: blur(1px);
          z-index: -1;
        }
        
        .drip {
          width: 8px;
          background: linear-gradient(180deg, #87CEEB 0%, #4682B4 100%);
          border-radius: 0 0 50% 50%;
          animation: drip 3s ease-in-out infinite;
          box-shadow: 
            0 2px 4px rgba(70, 130, 180, 0.3),
            inset 1px 0 2px rgba(255, 255, 255, 0.3);
        }
        
        .drip-1 { height: 40px; animation-delay: 0s; }
        .drip-2 { height: 25px; animation-delay: 0.5s; }
        .drip-3 { height: 35px; animation-delay: 1s; }
        .drip-4 { height: 20px; animation-delay: 1.5s; }
        .drip-5 { height: 45px; animation-delay: 0.3s; }
        .drip-6 { height: 30px; animation-delay: 0.8s; }
        .drip-7 { height: 38px; animation-delay: 1.2s; }
        .drip-8 { height: 22px; animation-delay: 1.7s; }
        .drip-9 { height: 28px; animation-delay: 0.6s; }
        .drip-10 { height: 42px; animation-delay: 1.4s; }
        .drip-11 { height: 26px; animation-delay: 1.9s; }
        
        @keyframes drip {
          0%, 100% {
            transform: translateY(0) scaleY(1);
            opacity: 0.8;
          }
          50% {
            transform: translateY(10px) scaleY(1.1);
            opacity: 1;
          }
        }
        
        /* Additional 3D effect */
        .melting-text {
          transform: perspective(500px) rotateX(15deg);
        }
        
        /* Glossy highlight effect */
        .melting-text::after {
          content: 'PEANIE';
          position: absolute;
          top: 0;
          left: 0;
          background: linear-gradient(135deg, rgba(255, 255, 255, 0.6) 0%, transparent 50%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          z-index: 1;
        }
      `}</style>
    </div>
  )
}
