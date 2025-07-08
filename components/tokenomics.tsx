"use client"

export default function Tokenomics() {
  return (
    <section
      id="tokenomics"
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
        style={{ zIndex: 1 }}
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
