"use client"

import StatsCountUp from "./StatsCountUp"
import { useEffect, useState } from "react"
import { LocalizedStat } from "@/app/actions/pages/stats"
import { useLanguage } from "@/context/LanguageContext"

export default function ClientStatsCountUp() {
  const [stats, setStats] = useState<LocalizedStat[]>([]);
  const { language } = useLanguage();

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch(`/api/stats?lang=${language}`);
        const data = await response.json();
        if (data.success) {
          setStats(data.data);
        }
      } catch (error) {
        console.error('Failed to fetch stats:', error);
      }
    };
    fetchStats();
  }, [language]);

  if (!stats.length) {
    return null;
  }

  return <StatsCountUp stats={stats} />
}

