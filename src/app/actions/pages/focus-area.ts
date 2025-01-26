"use server";

// Runtime configuration handled in route segments

import { cache } from "react";
import db from "@/app/db/db";
import { ApiResponse } from "@/types/api";

export interface LocalizedFocusAreaCard {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
}

export interface LocalizedFocusArea {
  id: string;
  title: string;
  description: string;
  cards: LocalizedFocusAreaCard[];
}

export const getFocusAreas = cache(async (language: 'en' | 'ar' = 'en'): Promise<ApiResponse<LocalizedFocusArea[]>> => {
  try {
    const focusAreas = await db.focusarea.findMany({
      include: {
        cards: true
      },
      orderBy: { createdAt: 'desc' },
    });

    const localizedFocusAreas = focusAreas.map(area => ({
      id: area.id,
      title: language === 'en' ? area.titleEn : area.titleAr,
      description: language === 'en' ? area.descriptionEn : area.descriptionAr,
      cards: area.cards.map(card => ({
        id: card.id,
        title: language === 'en' ? card.titleEn : card.titleAr,
        description: language === 'en' ? card.descriptionEn : card.descriptionAr,
        imageUrl: card.imageUrl,
      }))
    }));

    return {
      success: true,
      data: localizedFocusAreas
    };
  } catch (error) {
    console.error('Error fetching focus areas:', error);
    return {
      success: false,
      error: 'Failed to fetch focus areas'
    };
  }
});
