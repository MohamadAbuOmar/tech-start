"use server";

import { cache } from "react";
import db from "@/app/db/db";
import { ApiResponse } from "@/types/api";

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface LocalizedContactInfo {
  title: string;
  subtitle: string;
  address: string;
  phone: string;
  email: string;
  submitButton: string;
  successMessage: string;
  errorMessage: string;
  formLabels: {
    name: string;
    email: string;
    subject: string;
    message: string;
  };
  formPlaceholders: {
    name: string;
    email: string;
    subject: string;
    message: string;
  };
}

const contactTranslations = {
  en: {
    title: "Get in Touch",
    subtitle: "We're here to help and answer any question you might have",
    address: "Haifa Building 4th floor, Al Irsal, Ramallah-AlBireh, Palestine",
    phone: "+970 2 296 4840",
    email: "info@techstart.ps",
    submitButton: "Send Message",
    successMessage: "Message sent successfully",
    errorMessage: "Failed to send message",
    formLabels: {
      name: "Name",
      email: "Email",
      subject: "Subject",
      message: "Message",
    },
    formPlaceholders: {
      name: "Your name",
      email: "your@email.com",
      subject: "How can we help?",
      message: "Your message here...",
    },
  },
  ar: {
    title: "تواصل معنا",
    subtitle: "نحن هنا للمساعدة والإجابة على أي سؤال لديك",
    address: "عمارة حيفا، الطابق الرابع، الإرسال، رام الله-البيرة، فلسطين",
    phone: "+970 2 296 4840",
    email: "info@techstart.ps",
    submitButton: "إرسال الرسالة",
    successMessage: "تم إرسال الرسالة بنجاح",
    errorMessage: "فشل في إرسال الرسالة",
    formLabels: {
      name: "الاسم",
      email: "البريد الإلكتروني",
      subject: "الموضوع",
      message: "الرسالة",
    },
    formPlaceholders: {
      name: "اسمك",
      email: "بريدك@الإلكتروني.com",
      subject: "كيف يمكننا المساعدة؟",
      message: "اكتب رسالتك هنا...",
    },
  },
};

export const getContactInfo = cache(async (language: 'en' | 'ar' = 'en'): Promise<ApiResponse<LocalizedContactInfo>> => {
  try {
    return {
      success: true,
      data: contactTranslations[language]
    };
  } catch (error) {
    console.error('Error getting contact info:', error);
    return {
      success: false,
      error: 'Failed to get contact information'
    };
  }
});

export const submitContactForm = async (data: ContactFormData): Promise<ApiResponse<{ message: string }>> => {
  try {
    await db.contactSubmission.create({
      data: {
        name: data.name,
        email: data.email,
        subject: data.subject,
        message: data.message,
      },
    });

    return {
      success: true,
      data: { message: 'Contact form submitted successfully' }
    };
  } catch (error) {
    console.error('Error submitting contact form:', error);
    return {
      success: false,
      error: 'Failed to submit contact form'
    };
  }
};
