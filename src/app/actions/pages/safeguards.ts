"use server";

import { cache } from "react";
import db from "@/app/db/db";
import { ApiResponse } from "@/types/api";

export interface LocalizedSafeguard {
  id: string;
  title: string;
  description: string;
  type: string;
}

export const getSafeguards = cache(async (language: 'en' | 'ar' = 'en'): Promise<ApiResponse<LocalizedSafeguard[]>> => {
  try {
    const safeguards = await db.safeguard.findMany();

    const localizedSafeguards = safeguards.map(safeguard => ({
      id: safeguard.id,
      title: language === 'en' ? safeguard.title_en : safeguard.title_ar,
      description: language === 'en' ? safeguard.description_en : safeguard.description_ar,
      type: safeguard.type
    }));

    return {
      success: true,
      data: localizedSafeguards
    };
  } catch (error) {
    console.error('Error fetching safeguards:', error);
    return {
      success: false,
      error: 'Failed to fetch safeguards'
    };
  }
});
