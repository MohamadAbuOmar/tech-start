"use server";

// Set runtime to nodejs to avoid edge runtime issues
import { cache } from "react";
import db from "@/app/db/db";
import { ApiResponse } from "@/types/api";

export interface LocalizedStat {
  id: string;
  name: string;
  value: number;
  icon: string;
}

export const getStats = cache(async (language: 'en' | 'ar' = 'en'): Promise<ApiResponse<LocalizedStat[]>> => {
  try {
    const stats = await db.stat.findMany();

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
