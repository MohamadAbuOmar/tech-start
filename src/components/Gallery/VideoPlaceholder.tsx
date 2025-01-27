"use client";

import { useLanguage } from "@/context/LanguageContext";

export const VideoPlaceholder = () => {
  const { language } = useLanguage();
  
  return (
    <div className="w-full h-full flex items-center justify-center bg-gray-800 rounded-lg">
      <div className="text-center">
        <svg
          className="mx-auto h-12 w-12 text-gray-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
          />
        </svg>
        <p className="mt-2 text-sm text-gray-400">
          {language === 'en' ? 'Video thumbnail not available' : 'صورة مصغرة غير متوفرة'}
        </p>
      </div>
    </div>
  );
};
