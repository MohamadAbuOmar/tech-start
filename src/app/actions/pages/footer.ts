"use server";

import { cache } from "react";
import db from "@/app/db/db";
import { ApiResponse } from "@/types/api";

export interface LocalizedFooter {
  id: string;
  techStartTitle: string;
  privacyPolicy: string;
  termsOfUse: string;
  trust: string;
  copyright: string;
  socialLinks: {
    instagram: string | null;
    linkedin: string | null;
    youtube: string | null;
    facebook: string | null;
    twitter: string | null;
  };
}

export const getFooter = cache(async (language: 'en' | 'ar' = 'en'): Promise<ApiResponse<LocalizedFooter>> => {
  try {
    const footer = await db.footer.findFirst({
      orderBy: { updatedAt: 'desc' }
    });

    const localizedFooter = {
      id: footer?.id || 'default',
      techStartTitle: footer ? (language === 'en' ? footer.techStartTitle_en : footer.techStartTitle_ar) : (language === 'en' ? 'Tech Start' : 'تك ستارت'),
      privacyPolicy: language === 'en' ? 'Privacy Policy' : 'سياسة الخصوصية',
      termsOfUse: language === 'en' ? 'Terms of Use' : 'شروط الاستخدام',
      trust: language === 'en' ? 'Trust' : 'الثقة',
      copyright: language === 'en' ? '© Tech Start. All rights reserved.' : '© تك ستارت. جميع الحقوق محفوظة.',
      socialLinks: footer ? {
        instagram: footer.instagram || null,
        linkedin: footer.linkedin || null,
        youtube: footer.youtube || null,
        facebook: footer.facebook || null,
        twitter: footer.twitter || null
      } : {
        instagram: null,
        linkedin: null,
        youtube: null,
        facebook: null,
        twitter: null
      }
    };

    return {
      success: true,
      data: localizedFooter
    };
  } catch (error) {
    console.error('Error fetching footer:', error);
    return {
      success: false,
      error: 'Failed to fetch footer'
    };
  }
});
