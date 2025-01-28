import { z } from 'zod'

// Base validation schema
export const heroStepSchema = z.object({
  title: z.string().min(2, "Title must be at least 2 characters"),
  tagline: z.string().min(2, "Tagline must be at least 2 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  color: z.string().regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/),
  imageUrl: z.string().min(1),
  order: z.number().int().positive()
})

// Basic type without metadata
export type HeroStepInput = {
  title_en: string;
  title_ar: string;
  tagline_en: string;
  tagline_ar: string;
  description_en: string;
  description_ar: string;
  color: string;
  imageUrl: string;
  order: number;
};

// Complete type with all fields
export interface HeroStep extends HeroStepInput {
  id: number
  createdAt: Date
  updatedAt: Date
}

// Validation error type
export type FieldErrors = {
  [K in keyof HeroStepInput]?: string[]
}

export interface ValidationErrors {
  fieldErrors: FieldErrors
}

// API response types
export interface ApiSuccess<T> {
  success: true
  data: T
}

export interface ApiError {
  success: false
  error: string | FieldErrors
}

export type ApiResponse<T> = ApiSuccess<T> | ApiError

export interface LocalizedHeroStep {
  id: number;
  title: string;
  tagline: string;
  description: string;
  color: string;
  imageUrl: string;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface LocalizedHeroStepInput {
  title: string;
  tagline: string;
  description: string;
  color: string;
  imageUrl: string;
  order: number;
}
