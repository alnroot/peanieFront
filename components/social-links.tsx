"use client"

import { Button } from "@/components/ui/button"

const socialLinks = [
  { name: "Twitter", icon: "🐦", url: "#", color: "hover:bg-blue-500" },
  { name: "Telegram", icon: "✈️", url: "#", color: "hover:bg-blue-400" },
  { name: "Discord", icon: "🎮", url: "#", color: "hover:bg-indigo-500" },
  { name: "Instagram", icon: "📷", url: "#", color: "hover:bg-pink-500" },
  { name: "TikTok", icon: "🎵", url: "#", color: "hover:bg-black" },
]

export default function SocialLinks() {
  return (
    <section className="py-20 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-16">Join Our Community</h2>

        <div className="flex flex-wrap justify-center gap-6">
          {socialLinks.map((social) => (
            <Button
              key={social.name}
              variant="outline"
              size="lg"
              className={`bg-white/10 backdrop-blur-sm border-white/20 text-white transition-all duration-300 transform hover:scale-105 ${social.color}`}
              onClick={() => window.open(social.url, "_blank")}
            >
              <span className="text-2xl mr-3">{social.icon}</span>
              {social.name}
            </Button>
          ))}
        </div>
      </div>
    </section>
  )
}
