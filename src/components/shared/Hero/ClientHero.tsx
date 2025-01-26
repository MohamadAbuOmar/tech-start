"use client"

import dynamic from "next/dynamic"
import { LocalizedHeroStep } from "@/app/actions/pages/hero"

const ClientHeroContent = dynamic(() => import("./ClientHeroContent"), {
  loading: () => <div className="h-[80vh] bg-gray-100 animate-pulse" />,
  ssr: false
})

interface ClientHeroProps {
  steps: LocalizedHeroStep[];
}

export default function ClientHero({ steps }: ClientHeroProps) {
  return <ClientHeroContent steps={steps} />
}

