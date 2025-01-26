"use server";

// Runtime configuration handled in route segments

import { cache } from "react";
import db from "@/app/db/db";
import { ApiResponse } from "@/types/api";
import { WorkType } from "@prisma/client";

export interface LocalizedWorkWithUs {
  id: string;
  type: WorkType;
  title: string;
  iconName: string;
  description: string;
  tags: string;
  deadline: Date;
}

export const getWorkWithUs = cache(async (language: 'en' | 'ar' = 'en'): Promise<ApiResponse<LocalizedWorkWithUs[]>> => {
  try {
    const opportunities = await db.workWithUs.findMany({
      orderBy: { createdAt: 'desc' },
    });

    const localizedOpportunities = opportunities.map(opp => ({
      id: opp.id,
      type: opp.type,
      title: language === 'en' ? opp.titleEn : opp.titleAr,
      iconName: opp.iconName,
      description: language === 'en' ? opp.descriptionEn : opp.descriptionAr,
      tags: opp.tags,
      deadline: opp.deadline,
    }));

    return {
      success: true,
      data: localizedOpportunities
    };
  } catch (error) {
    console.error('Error fetching work opportunities:', error);
    return {
      success: false,
      error: 'Failed to fetch work opportunities'
    };
  }
});
