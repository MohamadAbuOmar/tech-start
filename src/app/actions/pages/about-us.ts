"use server";

// Runtime configuration moved to route segment config

import { cache } from "react";
import db from "@/app/db/db";
import { ApiResponse } from "../../../types/api";

export interface LocalizedCard {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface LocalizedWhoWeAre {
  id: string;
  title: string;
  description: string;
}

export interface LocalizedAboutUs {
  id: string;
  title: string;
  description: string;
  imageUrl: string | null;
  cards: LocalizedCard[];
  whoWeAre: LocalizedWhoWeAre[];
}

export const getAboutUs = cache(async (language: 'en' | 'ar' = 'en'): Promise<ApiResponse<LocalizedAboutUs>> => {
  try {
    const aboutUs = await db.aboutUs.findFirst({
      include: {
        cards: true,
        whoWeAre: true,
      },
    });

    if (!aboutUs) {
      return {
        success: false,
        error: 'About Us data not found'
      };
    }

    const localizedAboutUs: LocalizedAboutUs = {
      id: aboutUs.id,
      title: language === 'en' ? aboutUs.titleEn : aboutUs.titleAr,
      description: language === 'en' ? aboutUs.descriptionEn : aboutUs.descriptionAr,
      imageUrl: aboutUs.imageUrl,
      cards: aboutUs.cards.map(card => ({
        id: card.id,
        title: language === 'en' ? card.titleEn : card.titleAr,
        description: language === 'en' ? card.descriptionEn : card.descriptionAr,
        icon: card.icon,
      })),
      whoWeAre: aboutUs.whoWeAre.map(item => ({
        id: item.id,
        title: language === 'en' ? item.titleEn : item.titleAr,
        description: language === 'en' ? item.descriptionEn : item.descriptionAr,
      })),
    };

    return {
      success: true,
      data: localizedAboutUs
    };
  } catch (error) {
    console.error('Error fetching about us data:', error);
    return {
      success: false,
      error: 'Failed to fetch about us data'
    };
  }
});
