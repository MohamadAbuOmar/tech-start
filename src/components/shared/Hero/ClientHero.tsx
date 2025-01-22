"use client"

import dynamic from "next/dynamic"

const Hero = dynamic(() => import("./Hero"), {
  loading: () => <div className="h-[80vh] bg-gray-100 animate-pulse" />,
})

export default function ClientHero() {
  return <Hero />
}

