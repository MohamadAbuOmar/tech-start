"use server";

// Runtime configuration handled in route segments

import { cache } from "react";
import db from "@/app/db/db";
import { ApiResponse } from "@/types/api";

export interface LocalizedGuideline {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export const getGuidelines = cache(async (language: 'en' | 'ar' = 'en'): Promise<ApiResponse<LocalizedGuideline[]>> => {
  try {
    const guidelines = await db.guideline.findMany({
      orderBy: { createdAt: 'desc' },
    });

    const localizedGuidelines = guidelines.map(guideline => ({
      id: guideline.id,
      title: language === 'en' ? guideline.title_en : guideline.title_ar,
      description: language === 'en' ? guideline.description_en : guideline.description_ar,
      icon: guideline.icon,
    }));

    return {
      success: true,
      data: localizedGuidelines
    };
  } catch (error) {
    console.error('Error fetching guidelines:', error);
    return {
      success: false,
      error: 'Failed to fetch guidelines'
    };
  }
});
