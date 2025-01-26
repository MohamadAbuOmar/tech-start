"use server";

// Set runtime to nodejs to avoid edge runtime issues
import { cache } from "react";
import db from "@/app/db/db";
import { ApiResponse } from "@/types/api";

export interface LocalizedProgram {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
}

export const getPrograms = cache(async (language: 'en' | 'ar' = 'en'): Promise<ApiResponse<LocalizedProgram[]>> => {
  try {
    const programs = await db.program.findMany({
      orderBy: { order: 'asc' }
    });

    const localizedPrograms = programs.map(program => ({
      id: program.id,
      name: language === 'en' ? program.name_en : program.name_ar,
      description: language === 'en' ? program.description_en : program.description_ar,
      imageUrl: program.imageUrl
    }));

    return {
      success: true,
      data: localizedPrograms
    };
  } catch (error) {
    console.error('Error fetching programs:', error);
    return {
      success: false,
      error: 'Failed to fetch programs'
    };
  }
});
