"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'en' | 'ar';

type LanguageContextProps = {
  language: Language;
  toggleLanguage: () => void;
  isRTL: boolean;
};

const LanguageContext = createContext<LanguageContextProps>({
  language: 'en',
  toggleLanguage: () => {},
  isRTL: false,
});

export const LanguageProvider = ({ children }: { children: React.ReactNode }) => {
  const [language, setLanguage] = useState<Language>('en');
  const isRTL = language === 'ar';

  // On mount, load language from localStorage if present
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedLang = localStorage.getItem('preferredLanguage');
      if (storedLang === 'ar') {
        setLanguage('ar');
      }
    }
  }, []);

  // Update document direction when language changes
  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.dir = isRTL ? 'rtl' : 'ltr';
      document.documentElement.lang = language;
    }
  }, [language, isRTL]);

  const toggleLanguage = () => {
    setLanguage((prev) => {
      const newLang = prev === 'en' ? 'ar' : 'en';
      if (typeof window !== 'undefined') {
        localStorage.setItem('preferredLanguage', newLang);
      }
      return newLang;
    });
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, isRTL }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
