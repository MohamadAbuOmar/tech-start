"use server";

// Runtime configuration moved to route segment config

import { cache } from "react";
import db from "@/app/db/db";
import { ApiResponse } from "@/types/api";

export interface LocalizedCategory {
  id: string;
  name: string;
  slug: string;
}

export interface LocalizedBeneficiary {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  imageUrl: string;
  ctaText: string;
  ctaLink: string;
  category: LocalizedCategory;
}

export const getBeneficiaries = cache(async (language: 'en' | 'ar' = 'en'): Promise<ApiResponse<LocalizedBeneficiary[]>> => {
  try {
    const beneficiaries = await db.beneficiary.findMany({
      include: {
        category: true,
      },
      orderBy: { createdAt: 'desc' },
    });

    const localizedBeneficiaries = beneficiaries.map(beneficiary => ({
      id: beneficiary.id,
      title: language === 'en' ? beneficiary.title_en : beneficiary.title_ar,
      description: language === 'en' ? beneficiary.description_en : beneficiary.description_ar,
      longDescription: language === 'en' ? beneficiary.longDescription_en : beneficiary.longDescription_ar,
      imageUrl: beneficiary.imageUrl,
      ctaText: beneficiary.ctaText,
      ctaLink: beneficiary.ctaLink,
      category: {
        id: beneficiary.category.id,
        name: language === 'en' ? beneficiary.category.name_en : beneficiary.category.name_ar,
        slug: beneficiary.category.slug,
      }
    }));

    return {
      success: true,
      data: localizedBeneficiaries
    };
  } catch (error) {
    console.error('Error fetching beneficiaries:', error);
    return {
      success: false,
      error: 'Failed to fetch beneficiaries'
    };
  }
});

export const getBeneficiaryCategories = cache(async (language: 'en' | 'ar' = 'en'): Promise<ApiResponse<LocalizedCategory[]>> => {
  try {
    const categories = await db.category.findMany({
      orderBy: { createdAt: 'desc' },
    });

    const localizedCategories = categories.map(category => ({
      id: category.id,
      name: language === 'en' ? category.name_en : category.name_ar,
      slug: category.slug,
    }));

    return {
      success: true,
      data: localizedCategories
    };
  } catch (error) {
    console.error('Error fetching beneficiary categories:', error);
    return {
      success: false,
      error: 'Failed to fetch beneficiary categories'
    };
  }
});
