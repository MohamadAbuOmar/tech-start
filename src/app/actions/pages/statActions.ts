'use server'

import db from '@/app/db/db'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'


const StatSchema = z.object({
  name_en: z.string().min(1, "English name is required"),
  name_ar: z.string().min(1, "Arabic name is required"),
  value: z.number().int().positive("Value must be a positive integer"),
  icon: z.string().min(1, "Icon is required"),
})

export type StatFormData = z.infer<typeof StatSchema>

export async function createStat(data: StatFormData) {
  const validatedData = StatSchema.parse(data)
  await db.stat.create({ data: validatedData })
  revalidatePath('/admin/pages/stats')
  revalidatePath('/')
}

export async function updateStat(id: string, data: StatFormData) {
  const validatedData = StatSchema.parse(data)
  await db.stat.update({ where: { id }, data: validatedData })
  revalidatePath('/admin/pages/stats')
  revalidatePath('/')
}

export async function deleteStat(id: string) {
  await db.stat.delete({ where: { id } })
  revalidatePath('/admin/pages/stats')
  revalidatePath('/')
}

export async function getStats() {
  return db.stat.findMany()
}

