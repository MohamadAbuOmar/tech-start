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
    
<<

    const localizedStats = stats.map(stat => {
      const rawValue = stat.value;
      console.log('Processing stat value:', {
        id: stat.id,
        rawValue,
        type: typeof rawValue,
        name_en: stat.name_en,
        name_ar: stat.name_ar
      });

      let parsedValue: number;
      if (typeof rawValue === 'string') {
        parsedValue = parseInt(rawValue.replace(/[^\d]/g, ''), 10);
      } else if (typeof rawValue === 'number') {
        parsedValue = rawValue;
      } else {
        parsedValue = 0;
      }

      const finalValue = isNaN(parsedValue) ? 0 : parsedValue;
      console.log('Processed stat value:', { id: stat.id, rawValue, parsedValue, finalValue });

      return {
        id: stat.id,
        name: language === 'en' ? stat.name_en : stat.name_ar,
        value: finalValue,
        icon: stat.icon
      };
    });

    console.log('Localized stats:', JSON.stringify(localizedStats, null, 2));

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
