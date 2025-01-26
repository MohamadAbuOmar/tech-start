import React from "react"
import dynamic from "next/dynamic"
import ProgramsSec from "@/components/shared/program/ProgramsSec"
import { MediaCenter } from "@/components/shared/Hero/MediaCenter"
import SafeguardsBanner from "@/components/shared/banners/SafeguardsBanner"
import Hero from "@/components/shared/Hero/Hero"
import { getHeroSteps } from "@/app/actions/pages/hero"
import { getMediaItems } from "@/app/actions/pages/media"
import { getPrograms } from "@/app/actions/pages/programs"
import { getSafeguards } from "@/app/actions/pages/safeguards"
import { getStats } from "@/app/actions/pages/stats"
import { cookies } from "next/headers"

const ClientStatsCountUp = dynamic(() => import("@/components/Stats/ClientStatsCountUp"), {
  loading: () => <div className="h-40 bg-gray-50 animate-pulse" />,
})

export const runtime = "nodejs"
export const revalidate = 0

export default async function Page() {
  const cookieStore = await cookies();
  const language = (cookieStore.get('NEXT_LOCALE')?.value || 'en') as 'en' | 'ar';
  const [heroResponse, mediaResponse, programsResponse, safeguardsResponse, statsResponse] = await Promise.all([
    getHeroSteps(language),
    getMediaItems(language),
    getPrograms(language),
    getSafeguards(language),
    getStats(language)
  ]);
  
  if (!heroResponse.success || !mediaResponse.success || !programsResponse.success || !safeguardsResponse.success || !statsResponse.success) {
    console.error('Failed to fetch data:', heroResponse.error || mediaResponse.error || programsResponse.error || safeguardsResponse.error || statsResponse.error);
    return null;
  }

  return (
    <main className="relative">
      <Hero steps={heroResponse.data} />
      <section>
        <ClientStatsCountUp initialStats={statsResponse.data} />
      </section>
      <section>
        <ProgramsSec programs={programsResponse.data} />
      </section>
      <section>
        <MediaCenter items={mediaResponse.data} />
      </section>
      <SafeguardsBanner safeguards={safeguardsResponse.data} />
    </main>
  )
}

