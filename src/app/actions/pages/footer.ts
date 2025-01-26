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
    instagram?: string;
    linkedin?: string;
    github?: string;
    youtube?: string;
    facebook?: string;
    twitter?: string;
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
        instagram: footer.instagram,
        linkedin: footer.linkedin,
        youtube: footer.youtube,
        facebook: footer.facebook,
        twitter: footer.twitter
      } : {
        instagram: '#',
        linkedin: '#',
        youtube: '#',
        facebook: '#',
        twitter: '#'
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
