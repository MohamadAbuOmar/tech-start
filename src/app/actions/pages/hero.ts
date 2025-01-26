'use server'

import db from '@/app/db/db'
import { revalidatePath } from 'next/cache'
import { cache } from 'react'
import { type HeroStep, type HeroStepInput, heroStepSchema, type ApiResponse } from '@/types/hero'
import { z } from 'zod'

export async function createHeroStep(data: HeroStepInput): Promise<ApiResponse<HeroStep>> {
  try {
    const validated = heroStepSchema.parse(data)
    
    const newStep = await db.heroStep.create({
      data: validated
    })

    revalidatePath('/admin/pages/hero')
    return { success: true, data: newStep }
  } catch (error) {
    console.error('Error creating hero step:', error)
    return {
      success: false,
      error: 'Failed to create hero step'
    }
  }
}

export async function updateHeroStep(id: number, data: HeroStepInput): Promise<ApiResponse<HeroStep>> {
  try {
    const validated = heroStepSchema.parse(data)
    
    return await db.$transaction(async (tx) => {
      const currentStep = await tx.heroStep.findUnique({
        where: { id }
      })

      if (!currentStep) {
        throw new Error('Hero step not found')
      }

      if (currentStep.order !== validated.order) {
        await handleReordering(tx, currentStep.order, validated.order, id)
      }

      const updatedStep = await tx.heroStep.update({
        where: { id },
        data: validated
      })

      revalidatePath('/admin/hero')
      return { success: true, data: updatedStep }
    })
  } catch (error) {
    console.error('Error updating hero step:', error)
    return {
      success: false,
      error: error instanceof z.ZodError
        ? error.errors.map(e => e.message).join(', ')
        : 'Failed to update hero step'
    }
  }
}

export async function deleteHeroStep(id: number): Promise<ApiResponse<void>> {
  try {
    return await db.$transaction(async (tx) => {
      const step = await tx.heroStep.delete({ where: { id } })
      await tx.heroStep.updateMany({
        where: { order: { gt: step.order } },
        data: { order: { decrement: 1 } }
      })
      revalidatePath('/admin/pages/hero')
      return { success: true, data: undefined }
    })
  } catch (error) {
    console.error('Error deleting hero step:', error)
    return { success: false, error: 'Failed to delete hero step' }
  }
}

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

export const getHeroSteps = cache(async (language: 'en' | 'ar' = 'en'): Promise<ApiResponse<LocalizedHeroStep[]>> => {
  try {
    const steps = await db.heroStep.findMany({
      orderBy: { order: 'asc' }
    });
    
    const localizedSteps = steps.map(step => ({
      id: step.id,
      title: language === 'en' ? step.title_en : step.title_ar,
      tagline: language === 'en' ? step.tagline_en : step.tagline_ar,
      description: language === 'en' ? step.description_en : step.description_ar,
      color: step.color,
      imageUrl: step.imageUrl,
      order: step.order,
      createdAt: step.createdAt,
      updatedAt: step.updatedAt
    }));

    return { 
      success: true, 
      data: localizedSteps 
    }
  } catch (error) {
    console.error('Error fetching hero steps:', error)
    return { 
      success: false, 
      error: 'Failed to fetch hero steps'
    }
  }
})

async function handleReordering(tx: Parameters<Parameters<typeof db.$transaction>[0]>[0], oldOrder: number, newOrder: number, stepId: number) {
  if (newOrder > oldOrder) {
    await tx.heroStep.updateMany({
      where: {
        order: { gt: oldOrder, lte: newOrder },
        id: { not: stepId }
      },
      data: { order: { decrement: 1 } }
    })
  } else {
    await tx.heroStep.updateMany({
      where: {
        order: { gte: newOrder, lt: oldOrder },
        id: { not: stepId }
      },
      data: { order: { increment: 1 } }
    })
  }
}

