import type { Metadata } from "next"
import Hero from "../components/hero"
import Socials from "../components/socials"
import Giveaways from "../components/giveaways"
import PFPMaker from "../components/pfp-maker"
import Tokenomics from "../components/tokenomics"
import Memes from "../components/memes"
import ParallaxElements from "../components/parallax-elements"
import LoadingScreen from "../components/loading-screen"
import SectionDivider from "../components/section-divider"

export const metadata: Metadata = {
  title: "PEANIE - Home | The Coolest Penguin Token on Solana",
  description:
    "Welcome to PEANIE! The community-driven penguin token with PFP maker, weekly giveaways, and epic memes. Join the penguin patrol today!",
}

export default function Page() {
  return (
    <>
      <LoadingScreen />
      <div className="relative min-h-screen overflow-x-hidden">
        <ParallaxElements />
        <Hero />
        <SectionDivider />
        <Socials />
        <SectionDivider />
        <Giveaways />
        <SectionDivider />
        <PFPMaker />
        <SectionDivider />
        <Tokenomics />
        <SectionDivider />
        <Memes />
      </div>
    </>
  )
}
