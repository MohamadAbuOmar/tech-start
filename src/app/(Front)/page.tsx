import React from "react"
import dynamic from "next/dynamic"
import ProgramsSec from "@/components/shared/program/ProgramsSec"
import { MediaCenter } from "@/components/shared/Hero/MediaCenter"
import SafeguardsBanner from "@/components/shared/banners/SafeguardsBanner"

const ClientHero = dynamic(() => import("@/components/shared/Hero/ClientHero"), {
  loading: () => <div className="h-[80vh] bg-gray-100 animate-pulse" />,
})

const ClientStatsCountUp = dynamic(() => import("@/components/Stats/ClientStatsCountUp"), {
  loading: () => <div className="h-40 bg-gray-50 animate-pulse" />,
})

export const runtime = "edge"
export const revalidate = 0

export default function Page() {
  return (
    <main className="relative">
      <ClientHero />
      <section>
        <ClientStatsCountUp />
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

