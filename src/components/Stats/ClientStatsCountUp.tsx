"use client"

import StatsCountUp from "./StatsCountUp"
import { useState } from "react"
import { LocalizedStat } from "@/app/actions/pages/stats"

interface ClientStatsCountUpProps {
  initialStats: LocalizedStat[];
}

export default function ClientStatsCountUp({ initialStats }: ClientStatsCountUpProps) {
  const [stats] = useState<LocalizedStat[]>(initialStats);

  console.log('Initial stats:', JSON.stringify(initialStats, null, 2));
  console.log('Current stats:', JSON.stringify(stats, null, 2));

  if (!stats?.length) {
    return null;
  }

  return <StatsCountUp stats={stats} />
}

