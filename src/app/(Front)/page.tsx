import dynamic from "next/dynamic"
import React from "react"
import ProgramsSec from "@/components/shared/program/ProgramsSec"
import { MediaCenter } from "@/components/shared/Hero/MediaCenter"
import SafeguardsBanner from "@/components/shared/banners/SafeguardsBanner"

const Hero = dynamic(() => import("@/components/shared/Hero/Hero"), {
  ssr: false,
  loading: () => <div className="h-[80vh] bg-gray-100 animate-pulse" />,
})

const StatsCountUp = dynamic(() => import("@/components/Stats/StatsCountUp"), {
  ssr: false,
  loading: () => <div className="h-40 bg-gray-50 animate-pulse" />,
})

export const runtime = "edge"
export const revalidate = 0

export default function Page() {
  return (
    <main className="relative">
      <Hero />
      <section>
        <StatsCountUp />
      </section>
      <section>
        <ProgramsSec />
      </section>
      <section>
        <MediaCenter />
      </section>
      <SafeguardsBanner />
    </main>
  )
}

