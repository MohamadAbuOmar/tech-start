"use server";

import { cache } from "react";
import { revalidatePath } from "next/cache";
import db from "@/app/db/db";
import { ApiResponse } from "@/types/api";
import { ProgramType } from "@prisma/client";
import { z } from "zod";

// Program form validation schema
const programSchema = z.object({
  type: z.enum(['PIONEER', 'UPSKILL']),
  name_en: z.string().min(1, 'Name in English is required'),
  name_ar: z.string().min(1, 'Name in Arabic is required'),
  description_en: z.string().min(1, 'Description in English is required'),
  description_ar: z.string().min(1, 'Description in Arabic is required'),
  imageUrl: z.string().min(1, 'Image URL is required'),
  nameColor: z.string().default('#1b316e'),
  descColor: z.string().default('#862996'),
  order: z.number().default(0),
  badge_en: z.string().min(1, 'Badge text in English is required'),
  badge_ar: z.string().min(1, 'Badge text in Arabic is required'),
  heroTitle_en: z.string().min(1, 'Hero title in English is required'),
  heroTitle_ar: z.string().min(1, 'Hero title in Arabic is required'),
  heroDesc_en: z.string().min(1, 'Hero description in English is required'),
  heroDesc_ar: z.string().min(1, 'Hero description in Arabic is required'),
  heroImage: z.string().min(1, 'Hero image URL is required'),
  overview_en: z.string().min(1, 'Overview in English is required'),
  overview_ar: z.string().min(1, 'Overview in Arabic is required'),
  features: z.array(z.object({
    icon: z.string(),
    title_en: z.string(),
    title_ar: z.string(),
    description_en: z.string(),
    description_ar: z.string()
  })).default([]),
  // FAQ schema removed in favor of using the main FAQ system
});

// Admin-specific functions for fetching programs
export async function getAdminPrograms(): Promise<ApiResponse<any[]>> {
  try {
    const programs = await db.program.findMany({
      orderBy: { order: 'asc' },
      // FAQ relation removed in favor of using the main FAQ system
    });

    return {
      success: true,
      data: programs
    };
  } catch (error) {
    console.error('Error fetching programs for admin:', error);
    return {
      success: false,
      error: 'Failed to fetch programs'
    };
  }
}

export async function getAdminProgramById(id: string): Promise<ApiResponse<any>> {
  try {
    const program = await db.program.findUnique({
      where: { id },
      // FAQ relation removed in favor of using the main FAQ system
    });

    if (!program) {
      return {
        success: false,
        error: 'Program not found'
      };
    }

    return {
      success: true,
      data: program
    };
  } catch (error) {
    console.error('Error fetching program by ID:', error);
    return {
      success: false,
      error: 'Failed to fetch program'
    };
  }
}

interface LocalizedProgram {
  id: string;
  type: ProgramType;
  name: string;
  description: string;
  imageUrl: string;
  nameColor: string;
  descColor: string;
  order: number;
  hero: {
    badge: string;
    title: string;
    highlightedWord: string;
    description: string;
    primaryButtonText: string;
    secondaryButtonText: string;
    imageSrc: string;
    imageAlt: string;
  };
  overview: string;
  features: Array<{
    icon: string;
    title: string;
    description: string;
  }>;
  // FAQ section removed in favor of using the main FAQ system
}

export const getPioneerProgram = cache(async (language: 'en' | 'ar' = 'en'): Promise<ApiResponse<LocalizedProgram>> => {
  try {
    const program = await db.program.findFirst({
      where: { type: 'PIONEER' },
      // FAQ relation removed in favor of using the main FAQ system
    });

    // Default data for Pioneer program if not found in DB
    const defaultPioneer = {
      id: 'pioneer',
      type: 'PIONEER' as ProgramType,
      name_en: 'PIONEER',
      name_ar: 'بايونير',
      description_en: 'The Pioneer Program focuses on supporting IT companies and tech startups to adopt new technologies and develop innovative solutions that address market needs and opportunities.',
      description_ar: 'يركز برنامج بايونير على دعم شركات تكنولوجيا المعلومات والشركات الناشئة لتبني تقنيات جديدة وتطوير حلول مبتكرة تلبي احتياجات وفرص السوق.',
      imageUrl: '/images/UpskillHero.png',
      nameColor: '#1b316e',
      descColor: '#862996',
      order: 0,
      badge_en: 'Programs',
      badge_ar: 'البرامج',
      heroTitle_en: 'Empowering IT firms with',
      heroTitle_ar: 'تمكين شركات تكنولوجيا المعلومات مع',
      heroDesc_en: 'The Pioneer Program focuses on supporting IT companies and tech startups to adopt new technologies and develop innovative solutions.',
      heroDesc_ar: 'يركز برنامج بايونير على دعم شركات تكنولوجيا المعلومات والشركات الناشئة لتبني تقنيات جديدة وتطوير حلول مبتكرة.',
      heroImage: '/images/UpskillHero.png',
      overview_en: 'The Pioneer Program provides comprehensive support for IT companies and startups.',
      overview_ar: 'يوفر برنامج بايونير دعماً شاملاً لشركات تكنولوجيا المعلومات والشركات الناشئة.',
      features: JSON.stringify([
        {
          icon: 'innovation',
          title_en: 'Innovation Support',
          title_ar: 'دعم الابتكار',
          description_en: 'Funding for innovative tech solutions and product development.',
          description_ar: 'تمويل للحلول التقنية المبتكرة وتطوير المنتجات.'
        }
      ]),
      faqs: []
    };

    const programData = program || defaultPioneer;

    const localizedProgram = {
      id: programData.id,
      type: programData.type,
      name: language === 'en' ? programData.name_en : programData.name_ar,
      description: language === 'en' ? programData.description_en : programData.description_ar,
      imageUrl: programData.imageUrl,
      nameColor: programData.nameColor,
      descColor: programData.descColor,
      order: programData.order,
      hero: {
        badge: language === 'en' ? programData.badge_en : programData.badge_ar,
        title: language === 'en' ? programData.heroTitle_en : programData.heroTitle_ar,
        highlightedWord: language === 'en' ? programData.name_en : programData.name_ar,
        description: language === 'en' ? programData.heroDesc_en : programData.heroDesc_ar,
        primaryButtonText: language === 'en' ? 'Apply Now' : 'قدم الآن',
        secondaryButtonText: language === 'en' ? 'Learn More' : 'اعرف المزيد',
        imageSrc: programData.heroImage,
        imageAlt: `${language === 'en' ? programData.name_en : programData.name_ar} Program Illustration`
      },
      overview: language === 'en' ? programData.overview_en : programData.overview_ar,
      features: programData.features ? JSON.parse(programData.features.toString()).map((feature: any) => ({
        icon: feature.icon,
        title: language === 'en' ? feature.title_en : feature.title_ar,
        description: language === 'en' ? feature.description_en : feature.description_ar,
      })) : [],
    };

    return {
      success: true,
      data: localizedProgram
    };
  } catch (error) {
    console.error('Error fetching pioneer program:', error);
    return {
      success: false,
      error: language === 'en'
        ? 'Failed to fetch pioneer program'
        : 'فشل في جلب برنامج بايونير'
    };
  }
});

export const getUpskillProgram = cache(async (language: 'en' | 'ar' = 'en'): Promise<ApiResponse<LocalizedProgram>> => {
  try {
    const program = await db.program.findFirst({
      where: { type: 'UPSKILL' },
      // FAQ relation removed in favor of using the main FAQ system
    });

    // Default data for Upskill program if not found in DB
    const defaultUpskill = {
      id: 'upskill',
      type: 'UPSKILL' as ProgramType,
      name_en: 'UPSKILL',
      name_ar: 'أبسكيل',
      description_en: 'The Upskill Program focuses on helping IT firms upskill their workforce to scale up their business, increase growth opportunities, and attract new local and international clients.',
      description_ar: 'يركز برنامج أبسكيل على مساعدة شركات تكنولوجيا المعلومات في تطوير مهارات القوى العاملة لديها لتوسيع أعمالها وزيادة فرص النمو وجذب عملاء جدد محليين ودوليين.',
      imageUrl: '/images/UpskillHero.png',
      nameColor: '#1b316e',
      descColor: '#862996',
      order: 1,
      badge_en: 'Programs',
      badge_ar: 'البرامج',
      heroTitle_en: 'Empowering IT firms with',
      heroTitle_ar: 'تمكين شركات تكنولوجيا المعلومات مع',
      heroDesc_en: 'The Upskill Program focuses on helping IT firms upskill their workforce to scale up their business.',
      heroDesc_ar: 'يركز برنامج أبسكيل على مساعدة شركات تكنولوجيا المعلومات في تطوير مهارات القوى العاملة.',
      heroImage: '/images/UpskillHero.png',
      overview_en: 'The Upskill Program provides comprehensive training and development support.',
      overview_ar: 'يوفر برنامج أبسكيل دعماً شاملاً للتدريب والتطوير.',
      features: JSON.stringify([
        {
          icon: 'training',
          title_en: 'Professional Training',
          title_ar: 'التدريب المهني',
          description_en: 'Comprehensive training programs for IT professionals.',
          description_ar: 'برامج تدريبية شاملة لمحترفي تكنولوجيا المعلومات.'
        }
      ]),
      faqs: []
    };

    const programData = program || defaultUpskill;

    const localizedProgram = {
      id: programData.id,
      type: programData.type,
      name: language === 'en' ? programData.name_en : programData.name_ar,
      description: language === 'en' ? programData.description_en : programData.description_ar,
      imageUrl: programData.imageUrl,
      nameColor: programData.nameColor,
      descColor: programData.descColor,
      order: programData.order,
      hero: {
        badge: language === 'en' ? programData.badge_en : programData.badge_ar,
        title: language === 'en' ? programData.heroTitle_en : programData.heroTitle_ar,
        highlightedWord: language === 'en' ? programData.name_en : programData.name_ar,
        description: language === 'en' ? programData.heroDesc_en : programData.heroDesc_ar,
        primaryButtonText: language === 'en' ? 'Apply Now' : 'قدم الآن',
        secondaryButtonText: language === 'en' ? 'Learn More' : 'اعرف المزيد',
        imageSrc: programData.heroImage,
        imageAlt: `${language === 'en' ? programData.name_en : programData.name_ar} Program Illustration`
      },
      overview: language === 'en' ? programData.overview_en : programData.overview_ar,
      features: programData.features ? JSON.parse(programData.features.toString()).map((feature: any) => ({
        icon: feature.icon,
        title: language === 'en' ? feature.title_en : feature.title_ar,
        description: language === 'en' ? feature.description_en : feature.description_ar,
      })) : [],
      faqs: (programData.faqs || []).map((faq: any) => ({
        id: faq.id,
        question: language === 'en' ? faq.question_en : faq.question_ar,
        answer: language === 'en' ? faq.answer_en : faq.answer_ar,
        order: faq.order
      }))
    };

    return {
      success: true,
      data: localizedProgram
    };
  } catch (error) {
    console.error('Error fetching upskill program:', error);
    return {
      success: false,
      error: language === 'en'
        ? 'Failed to fetch upskill program'
        : 'فشل في جلب برنامج أبسكيل'
    };
  }
});

// Admin CRUD Operations
type ProgramFormData = {
  type: ProgramType;
  name_en: string;
  name_ar: string;
  description_en: string;
  description_ar: string;
  imageUrl: string;
  nameColor: string;
  descColor: string;
  order: number;
  badge_en: string;
  badge_ar: string;
  heroTitle_en: string;
  heroTitle_ar: string;
  heroDesc_en: string;
  heroDesc_ar: string;
  heroImage: string;
  overview_en: string;
  overview_ar: string;
  features: Array<{
    icon: string;
    title_en: string;
    title_ar: string;
    description_en: string;
    description_ar: string;
  }>;
  faqs: Array<{
    question_en: string;
    question_ar: string;
    answer_en: string;
    answer_ar: string;
    order: number;
  }>;
}

export async function createProgram(data: ProgramFormData, language: 'en' | 'ar' = 'en'): Promise<ApiResponse<any>> {
  try {
    // Validate input data
    const validationResult = programSchema.safeParse(data);
    if (!validationResult.success) {
      return {
        success: false,
        error: language === 'en' 
          ? 'Invalid program data. Please check all required fields.'
          : 'بيانات البرنامج غير صالحة. يرجى التحقق من جميع الحقول المطلوبة.'
      };
    }

    const { faqs, features, ...programData } = validationResult.data;
    
    const program = await db.program.create({
      data: {
        ...programData,
        features: JSON.stringify(features),
        // FAQ section removed in favor of using the main FAQ system
      },
      include: {
        faqs: true
      }
    });

    revalidatePath("/admin/pages/programs");
    return {
      success: true,
      data: program
    };
  } catch (error) {
    console.error('Error creating program:', error);
    return {
      success: false,
      error: language === 'en'
        ? 'Failed to create program. Please try again.'
        : 'فشل في إنشاء البرنامج. يرجى المحاولة مرة أخرى.'
    };
  }
}

export async function updateProgram(id: string, data: ProgramFormData, language: 'en' | 'ar' = 'en'): Promise<ApiResponse<any>> {
  try {
    // Validate input data
    const validationResult = programSchema.safeParse(data);
    if (!validationResult.success) {
      return {
        success: false,
        error: language === 'en'
          ? 'Invalid program data. Please check all required fields.'
          : 'بيانات البرنامج غير صالحة. يرجى التحقق من جميع الحقول المطلوبة.'
      };
    }

    const { faqs, features, ...programData } = validationResult.data;

    // Check if program exists
    const existingProgram = await db.program.findUnique({
      where: { id }
    });

    if (!existingProgram) {
      return {
        success: false,
        error: language === 'en'
          ? 'Program not found'
          : 'لم يتم العثور على البرنامج'
      };
    }

    // Update program and its related data
    const program = await db.program.update({
      where: { id },
      data: {
        ...programData,
        features: JSON.stringify(features),
        // FAQ section removed in favor of using the main FAQ system
      },
      include: {
        faqs: true
      }
    });

    revalidatePath("/admin/pages/programs");
    return {
      success: true,
      data: program
    };
  } catch (error) {
    console.error('Error updating program:', error);
    return {
      success: false,
      error: language === 'en'
        ? 'Failed to update program. Please try again.'
        : 'فشل في تحديث البرنامج. يرجى المحاولة مرة أخرى.'
    };
  }
}

export async function deleteProgram(id: string, language: 'en' | 'ar' = 'en'): Promise<ApiResponse<any>> {
  try {
    // Check if program exists
    const existingProgram = await db.program.findUnique({
      where: { id }
    });

    if (!existingProgram) {
      return {
        success: false,
        error: language === 'en'
          ? 'Program not found'
          : 'لم يتم العثور على البرنامج'
      };
    }

    await db.program.delete({
      where: { id }
    });

    revalidatePath("/admin/pages/programs");
    return {
      success: true,
      data: null,
      message: language === 'en'
        ? 'Program deleted successfully'
        : 'تم حذف البرنامج بنجاح'
    };
  } catch (error) {
    console.error('Error deleting program:', error);
    return {
      success: false,
      error: language === 'en'
        ? 'Failed to delete program. Please try again.'
        : 'فشل في حذف البرنامج. يرجى المحاولة مرة أخرى.'
    };
  }
}

export const getPrograms = cache(async (language: 'en' | 'ar' = 'en'): Promise<ApiResponse<LocalizedProgram[]>> => {
  try {
    const programs = await db.program.findMany({
      orderBy: { order: 'asc' },
      include: {
        faqs: {
          orderBy: { order: 'asc' }
        }
      }
    });

    // Default programs if none found in DB
    const defaultPrograms = [
      {
        id: 'pioneer',
        type: 'PIONEER' as ProgramType,
        name_en: 'PIONEER',
        name_ar: 'بايونير',
        description_en: 'The Pioneer Program focuses on supporting IT companies and tech startups to adopt new technologies and develop innovative solutions that address market needs and opportunities.',
        description_ar: 'يركز برنامج بايونير على دعم شركات تكنولوجيا المعلومات والشركات الناشئة لتبني تقنيات جديدة وتطوير حلول مبتكرة تلبي احتياجات وفرص السوق.',
        imageUrl: '/images/UpskillHero.png',
        nameColor: '#1b316e',
        descColor: '#862996',
        order: 0,
        badge_en: 'Programs',
        badge_ar: 'البرامج',
        heroTitle_en: 'Empowering IT firms with',
        heroTitle_ar: 'تمكين شركات تكنولوجيا المعلومات مع',
        heroDesc_en: 'The Pioneer Program focuses on supporting IT companies and tech startups.',
        heroDesc_ar: 'يركز برنامج بايونير على دعم شركات تكنولوجيا المعلومات والشركات الناشئة.',
        heroImage: '/images/UpskillHero.png',
        overview_en: 'The Pioneer Program provides comprehensive support for IT companies and startups.',
        overview_ar: 'يوفر برنامج بايونير دعماً شاملاً لشركات تكنولوجيا المعلومات والشركات الناشئة.',
        features: JSON.stringify([
          {
            icon: 'innovation',
            title_en: 'Innovation Support',
            title_ar: 'دعم الابتكار',
            description_en: 'Funding for innovative tech solutions and product development.',
            description_ar: 'تمويل للحلول التقنية المبتكرة وتطوير المنتجات.'
          }
        ]),
        faqs: []
      },
      {
        id: 'upskill',
        type: 'UPSKILL' as ProgramType,
        name_en: 'UPSKILL',
        name_ar: 'أبسكيل',
        description_en: 'The Upskill Program focuses on helping IT firms upskill their workforce to scale up their business, increase growth opportunities, and attract new local and international clients.',
        description_ar: 'يركز برنامج أبسكيل على مساعدة شركات تكنولوجيا المعلومات في تطوير مهارات القوى العاملة لديها لتوسيع أعمالها وزيادة فرص النمو وجذب عملاء جدد محليين ودوليين.',
        imageUrl: '/images/UpskillHero.png',
        nameColor: '#1b316e',
        descColor: '#862996',
        order: 1,
        badge_en: 'Programs',
        badge_ar: 'البرامج',
        heroTitle_en: 'Empowering IT firms with',
        heroTitle_ar: 'تمكين شركات تكنولوجيا المعلومات مع',
        heroDesc_en: 'The Upskill Program focuses on helping IT firms upskill their workforce.',
        heroDesc_ar: 'يركز برنامج أبسكيل على مساعدة شركات تكنولوجيا المعلومات في تطوير مهارات القوى العاملة.',
        heroImage: '/images/UpskillHero.png',
        overview_en: 'The Upskill Program provides comprehensive training and development support.',
        overview_ar: 'يوفر برنامج أبسكيل دعماً شاملاً للتدريب والتطوير.',
        features: JSON.stringify([
          {
            icon: 'training',
            title_en: 'Professional Training',
            title_ar: 'التدريب المهني',
            description_en: 'Comprehensive training programs for IT professionals.',
            description_ar: 'برامج تدريبية شاملة لمحترفي تكنولوجيا المعلومات.'
          }
        ]),
        faqs: []
      }
    ];

    const programsData = programs.length > 0 ? programs : defaultPrograms;

    const localizedPrograms = programsData.map(programData => ({
      id: programData.id,
      type: programData.type,
      name: language === 'en' ? programData.name_en : programData.name_ar,
      description: language === 'en' ? programData.description_en : programData.description_ar,
      imageUrl: programData.imageUrl,
      nameColor: programData.nameColor,
      descColor: programData.descColor,
      order: programData.order,
      hero: {
        badge: language === 'en' ? programData.badge_en : programData.badge_ar,
        title: language === 'en' ? programData.heroTitle_en : programData.heroTitle_ar,
        highlightedWord: language === 'en' ? programData.name_en : programData.name_ar,
        description: language === 'en' ? programData.heroDesc_en : programData.heroDesc_ar,
        primaryButtonText: language === 'en' ? 'Apply Now' : 'قدم الآن',
        secondaryButtonText: language === 'en' ? 'Learn More' : 'اعرف المزيد',
        imageSrc: programData.heroImage,
        imageAlt: `${language === 'en' ? programData.name_en : programData.name_ar} Program Illustration`
      },
      overview: language === 'en' ? programData.overview_en : programData.overview_ar,
      features: programData.features ? JSON.parse(programData.features.toString()).map((feature: any) => ({
        icon: feature.icon,
        title: language === 'en' ? feature.title_en : feature.title_ar,
        description: language === 'en' ? feature.description_en : feature.description_ar,
      })) : [],
      faqs: (programData.faqs || []).map((faq: any) => ({
        id: faq.id,
        question: language === 'en' ? faq.question_en : faq.question_ar,
        answer: language === 'en' ? faq.answer_en : faq.answer_ar,
        order: faq.order
      }))
    }));

    return {
      success: true,
      data: localizedPrograms
    };
  } catch (error) {
    console.error('Error fetching programs:', error);
    return {
      success: false,
      error: language === 'en'
        ? 'Failed to fetch programs'
        : 'فشل في جلب البرامج'
    };
  }
});
