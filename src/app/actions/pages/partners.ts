"use server";

import { cache } from "react";
import db from "@/app/db/db";
import { ApiResponse } from "@/types/api";
import { PartnerType } from "@prisma/client";

export interface LocalizedPartner {
  id: string;
  name: string;
  imageUrl: string;
  type: PartnerType;
  order: number;
}

export const getPartners = cache(async (language: 'en' | 'ar' = 'en'): Promise<ApiResponse<LocalizedPartner[]>> => {
  try {
    const partners = await db.partner.findMany({
      orderBy: [
        { type: 'asc' },
        { order: 'asc' }
      ],
      select: {
        id: true,
        name_en: true,
        name_ar: true,
        imageUrl: true,
        type: true,
        order: true
      }
    });

    const localizedPartners = partners
      .map(partner => {
        const name = language === 'en' ? partner.name_en : partner.name_ar;
        
        // Skip partners with missing required data
        if (!partner.id || !name || !partner.imageUrl || !partner.type) {
          console.error(`Partner with ID ${partner.id || 'unknown'} is missing required data:`, {
            id: partner.id,
            name_en: partner.name_en,
            name_ar: partner.name_ar,
            imageUrl: partner.imageUrl,
            type: partner.type
          });
          return null;
        }

        // Validate image URL format and ensure it starts with /
        if (!partner.imageUrl.startsWith('/')) {
          console.error(`Invalid image URL format for partner ${partner.id}: ${partner.imageUrl}. URL must start with /`);
          return null;
        }

        return {
          id: partner.id,
          name,
          imageUrl: partner.imageUrl,
          type: partner.type,
          order: partner.order ?? 0,
        };
      })
      .filter((partner): partner is LocalizedPartner => partner !== null);

    if (localizedPartners.length === 0) {
      return {
        success: false,
        error: language === 'en'
          ? 'No valid partner data found.'
          : 'لم يتم العثور على بيانات شركاء صالحة.'
      };
    }

    return {
      success: true,
      data: localizedPartners
    };
  } catch (error) {
    console.error('Error fetching partners:', error);
    return {
      success: false,
      error: language === 'en' 
        ? 'Failed to fetch partners data. Please try again later.'
        : 'فشل في جلب بيانات الشركاء. يرجى المحاولة مرة أخرى لاحقاً.'
    };
  }
});

import { validatePartner } from "@/utils/validation";
