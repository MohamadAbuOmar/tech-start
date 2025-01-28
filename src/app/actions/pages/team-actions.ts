"use server"

// Runtime configuration moved to route segment config

import { cache } from "react"
import db from "@/app/db/db"
import { revalidatePath } from "next/cache"
import { ApiResponse } from "@/types/api"

export interface LocalizedTeamMember {
  id: string;
  name: string;
  title: string;
  description: string;
  imageUrl: string;
  order?: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export type TeamMemberData = {
  nameEn: string
  nameAr: string
  jobTitleEn: string
  jobTitleAr: string
  descriptionEn: string
  descriptionAr: string
  imageUrl: string
  order?: number
}

export const getTeamMembers = cache(async (language: 'en' | 'ar' = 'en'): Promise<ApiResponse<LocalizedTeamMember[]>> => {
  try {
    const members = await db.teamMember.findMany({
      orderBy: {
        createdAt: 'asc'
      }
    });

    const localizedMembers = members.map(member => ({
      id: member.id,
      name: language === 'en' ? member.nameEn : member.nameAr,
      title: language === 'en' ? member.jobTitleEn : member.jobTitleAr,
      description: language === 'en' ? member.descriptionEn : member.descriptionAr,
      imageUrl: member.imageUrl,
      order: member.order ?? 0,
      createdAt: member.createdAt,
      updatedAt: member.updatedAt,
    }));

    return {
      success: true,
      data: localizedMembers
    };
  } catch (error) {
    console.error('Error fetching team members:', error);
    return {
      success: false,
      error: 'Failed to fetch team members'
    };
  }
});

export async function getTeamMemberById(id: string) {
  return db.teamMember.findUnique({
    where: { id },
  })
}

export async function createTeamMember(data: TeamMemberData) {
  const createdTeamMember = await db.teamMember.create({
    data: {
      ...data,
      order: data.order || 0
    },
  })

  revalidatePath("/admin/pages/team")
  return createdTeamMember
}

export async function updateTeamMember(id: string, data: TeamMemberData) {
  const updatedTeamMember = await db.teamMember.update({
    where: { id },
    data: {
      ...data,
      order: data.order || 0
    },
  })

  revalidatePath("/admin/pages/team")
  return updatedTeamMember
}

export async function deleteTeamMember(id: string) {
  await db.teamMember.delete({
    where: { id },
  })

  revalidatePath("/admin/pages/team")
}

