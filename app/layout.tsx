import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "PEANIE - Official Website | PFP Maker, Tokenomics & Community",
  description:
    "Join the PEANIE community! Create custom PFPs, participate in giveaways, and explore our meme collection. Fair launch token with 0% tax on Solana.",
  keywords: "PEANIE, cryptocurrency, meme token, PFP maker, Solana, community, giveaways",
  authors: [{ name: "PEANIE Team" }],
  openGraph: {
    title: "PEANIE - The Coolest Penguin Token",
    description:
      "Join the PEANIE community! Create custom PFPs, participate in giveaways, and explore our meme collection.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "PEANIE - The Coolest Penguin Token",
    description:
      "Join the PEANIE community! Create custom PFPs, participate in giveaways, and explore our meme collection.",
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/images/peanie-logo.png" />
        <link rel="apple-touch-icon" href="/images/peanie-logo.png" />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  )
}
