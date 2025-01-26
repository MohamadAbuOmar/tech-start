"use server";

// Runtime configuration moved to route segment config

import { cache } from "react";
import db from "@/app/db/db";
import { ApiResponse } from "@/types/api";

export interface LocalizedFaqItem {
  id: string;
  question: string;
  answer: string;
  order: number;
}

export interface LocalizedFaqCategory {
  id: string;
  name: string;
  slug: string;
  order: number;
  faqs: LocalizedFaqItem[];
}

export const getFaqCategories = cache(async (language: 'en' | 'ar' = 'en'): Promise<ApiResponse<LocalizedFaqCategory[]>> => {
  try {
    const categories = await db.faqCategory.findMany({
      include: {
        faqs: {
          orderBy: { order: 'asc' }
        }
      },
      orderBy: { order: 'asc' },
    });

    const localizedCategories = categories.map(category => ({
      id: category.id,
      name: language === 'en' ? category.nameEn : category.nameAr,
      slug: category.slug,
      order: category.order,
      faqs: category.faqs.map(faq => ({
        id: faq.id,
        question: language === 'en' ? faq.questionEn : faq.questionAr,
        answer: language === 'en' ? faq.answerEn : faq.answerAr,
        order: faq.order,
      }))
    }));

    return {
      success: true,
      data: localizedCategories
    };
  } catch (error) {
    console.error('Error fetching FAQ categories:', error);
    return {
      success: false,
      error: 'Failed to fetch FAQ categories'
    };
  }
});
