"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const memeCategories = [
  { title: "Penguin Classics", emoji: "🐧", count: "50+" },
  { title: "Crypto Memes", emoji: "💎", count: "30+" },
  { title: "Community Creations", emoji: "🎨", count: "100+" },
  { title: "Viral Moments", emoji: "🔥", count: "25+" },
]

const featuredMemes = [
  { title: "When PEANIE hits ATH", description: "Classic penguin celebration", likes: "1.2k" },
  { title: "Diamond Flippers", description: "HODL vs Paper hands", likes: "890" },
  { title: "Penguin Army", description: "Community strength", likes: "2.1k" },
  { title: "To the Moon", description: "Rocket penguin", likes: "1.5k" },
]

export default function Memes() {
  return (
    <section
      id="memes"
      className="min-h-screen flex items-center relative overflow-hidden"
      style={{
        backgroundImage: "url('/images/bg-memes.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Pingüino flotante */}
      <img
        src="/images/MEMES-PIEANIE.png"
        alt=""
        className="absolute top-0 left-0 w-full h-full pointer-events-none select-none"
        style={{ zIndex: 1 }}
        draggable={false}
      />
      <div className="max-w-6xl mx-auto w-full relative z-10 pt-[8vh]">
        <div className="text-center mb-[10vh]">
          <img
            src="/images/title-memes.png"
            alt="PEANIE MEMES"
            className="w-[50vw] max-w-xl min-w-[350px] h-auto mx-auto"
          />
        </div>
        {/* Meme Categories */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {memeCategories.map((category) => (
            <Card
              key={category.title}
              className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/20 transition-all duration-300 cursor-pointer"
            >
              <CardContent className="p-6 text-center">
                <div className="text-4xl mb-3">{category.emoji}</div>
                <h3 className="text-black font-semibold mb-2">{category.title}</h3>
                <p className="text-blue-600 text-sm">{category.count} memes</p>
              </CardContent>
            </Card>
          ))}
        </div>
        {/* Featured Memes */}
        <Card className="bg-white/10 backdrop-blur-sm border-white/20 mb-8">
          <CardContent className="p-8">
            <h3 className="text-2xl font-bold text-black text-center mb-8">🔥 Trending Memes</h3>
            <div className="grid md:grid-cols-2 gap-6">
              {featuredMemes.map((meme) => (
                <div
                  key={meme.title}
                  className="bg-white/10 rounded-lg p-6 hover:bg-white/20 transition-all duration-300 cursor-pointer"
                >
                  <div className="aspect-square bg-gradient-to-br from-blue-400 to-purple-500 rounded-lg mb-4 flex items-center justify-center">
                    <span className="text-6xl">🐧</span>
                  </div>
                  <h4 className="text-black font-semibold mb-2">{meme.title}</h4>
                  <p className="text-gray-600 text-sm mb-3">{meme.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-blue-600 text-sm">❤️ {meme.likes}</span>
                    <Button
                      size="sm"
                      variant="outline"
                      className="bg-white/10 text-black border-white/20 hover:bg-white/20"
                    >
                      Share
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        {/* Meme Submission */}
        <Card className="bg-white/10 backdrop-blur-sm border-white/20"></Card>
      </div>
      {/* Degradado para transición suave */}
      <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-white/80 to-transparent z-30 pointer-events-none" />
    </section>
  )
}
