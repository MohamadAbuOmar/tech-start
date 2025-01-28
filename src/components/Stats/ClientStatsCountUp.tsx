"use client"

import StatsCountUp from "./StatsCountUp"
import { useState, useEffect } from "react"
import { LocalizedStat } from "@/app/actions/pages/stats"
import { useLanguage } from "@/context/LanguageContext"

interface ClientStatsCountUpProps {
  initialStats: LocalizedStat[];
}

export default function ClientStatsCountUp({ initialStats }: ClientStatsCountUpProps) {
  const { language } = useLanguage();
  console.log('ClientStatsCountUp received initialStats:', initialStats);
  
  const [stats, setStats] = useState(() => {
    const initialValues = initialStats?.map(stat => ({
      ...stat,
      value: Number(stat.value) || 0
    })) || [];
    console.log('Initial state values:', initialValues);
    return initialValues;
  });

  useEffect(() => {
    if (initialStats?.length) {
      const validStats = initialStats.map(stat => ({
        ...stat,
        value: typeof stat.value === 'string' ? parseInt(stat.value, 10) : Number(stat.value) || 0
      }));
      console.log('Updating stats with:', validStats);
      setStats(validStats);
    }
  }, [initialStats]);

  if (!stats?.length) {
    return null;
  }

  return <StatsCountUp stats={stats} />
}

