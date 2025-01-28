"use server";

import { cache } from "react";
import db from "@/app/db/db";
import { ApiResponse } from "../../../types/api";

export interface LocalizedStat {
  id: string;
  name: string;
  value: number;
  icon: string;
}

export const getStats = cache(async (language: 'en' | 'ar' = 'en'): Promise<ApiResponse<LocalizedStat[]>> => {
  try {
    console.log('Fetching stats with language:', language);
    const stats = await db.stat.findMany({
      select: {
        id: true,
        name_en: true,
        name_ar: true,
        value: true,
        icon: true
      }
    });
    
    console.log('Raw stats from DB:', stats);

    const localizedStats = stats.map(stat => ({
      id: stat.id,
      name: language === 'en' ? stat.name_en : stat.name_ar,
      value: stat.value,
      icon: stat.icon
    }));

    return {
      success: true,
      data: localizedStats
    };
  } catch (error) {
    console.error('Error fetching stats:', error);
    return {
      success: false,
      error: 'Failed to fetch stats'
    };
  }
});
