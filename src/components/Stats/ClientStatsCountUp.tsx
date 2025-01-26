"use client"

import StatsCountUp from "./StatsCountUp"
import { useState } from "react"
import { LocalizedStat } from "@/app/actions/pages/stats"

interface ClientStatsCountUpProps {
  initialStats: LocalizedStat[];
}

export default function ClientStatsCountUp({ initialStats }: ClientStatsCountUpProps) {
  const [stats] = useState<LocalizedStat[]>(initialStats);

  if (!stats.length) {
    return null;
  }

  return <StatsCountUp stats={stats} />
}

