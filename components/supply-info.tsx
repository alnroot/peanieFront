"use client"

import { Card, CardContent } from "@/components/ui/card"
import { useEffect, useState } from "react"

const supplyData = [
  { label: "TOTAL SUPPLY", value: "1,000,000,000", icon: "🐧" },
  { label: "CIRCULATING SUPPLY", value: "800,000,000", icon: "🔄" },
  { label: "MARKET CAP", value: "$2,500,000", icon: "💰" },
  { label: "LP STATUS", value: "LOCKED", icon: "🔒" },
  { label: "TAX", value: "0%", icon: "📊" },
]

export default function SupplyInfo() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => setIsVisible(entry.isIntersecting), { threshold: 0.1 })

    const element = document.getElementById("supply-section")
    if (element) observer.observe(element)

    return () => observer.disconnect()
  }, [])

  return (
    <section id="supply-section" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-center text-white mb-16">Token Information</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          {supplyData.map((item, index) => (
            <Card
              key={item.label}
              className={`bg-white/10 backdrop-blur-sm border-white/20 transition-all duration-700 ${
                isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <CardContent className="p-6 text-center">
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="text-sm font-semibold text-white/80 mb-2">{item.label}</h3>
                <p className="text-2xl font-bold text-white">{item.value}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
