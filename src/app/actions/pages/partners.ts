"use server";

// Runtime configuration handled in route segments

import { cache } from "react";
import db from "@/app/db/db";
import { ApiResponse } from "../../../types/api";
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
    });

    const localizedPartners = partners.map(partner => ({
      id: partner.id,
      name: language === 'en' ? partner.name_en : partner.name_ar,
      imageUrl: partner.imageUrl,
      type: partner.type,
      order: partner.order,
    }));

    return {
      success: true,
      data: localizedPartners
    };
  } catch (error) {
    console.error('Error fetching partners:', error);
    return {
      success: false,
      error: 'Failed to fetch partners'
    };
  }
});
