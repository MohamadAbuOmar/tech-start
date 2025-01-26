"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";

import { LocalizedPartner } from "@/app/actions/pages/partners";

interface PartnersPageProps {
  partners: LocalizedPartner[];
}

const PartnersPage = ({ partners }: PartnersPageProps) => {
  const { language, isRTL } = useLanguage();
  const pageTitle = language === 'en' ? 'Our Partners' : 'شركاؤنا';
  
  const getPartnerTypeLabel = (type: string) => {
    switch (type) {
      case 'PROJECT_OF':
        return language === 'en' ? 'Project Of' : 'مشروع من';
      case 'FUNDED_BY':
        return language === 'en' ? 'Funded By' : 'بتمويل من';
      case 'IMPLEMENTED_BY':
        return language === 'en' ? 'Implemented By' : 'تنفيذ';
      default:
        return type;
    }
  };

  return (
    <section className={`bg-gradient-to-b from-white to-gray-50 py-32 px-4 md:px-6 relative ${isRTL ? 'rtl' : 'ltr'}`}>
      <div className="container mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className={`text-3xl md:text-4xl font-bold mb-12 text-center text-gray-800 ${isRTL ? 'font-[Noto Sans Arabic]' : ''}`}
          dir={isRTL ? 'rtl' : 'ltr'}
        >
          {pageTitle}
        </motion.h2>

        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {partners.map((partner, index) => (
            <motion.div
              key={partner.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 p-6 ${isRTL ? 'text-right' : 'text-left'}`}
            >
              <div className="flex flex-col items-center">
                <span className={`text-sm text-gray-600 font-medium mb-2 ${isRTL ? 'font-[Noto Sans Arabic]' : ''}`}>
                  {getPartnerTypeLabel(partner.type)}
                </span>
                <div className="w-[160px] h-[100px] relative mb-4">
                  <Image
                    src={partner.imageUrl}
                    alt={partner.name}
                    fill
                    className="object-contain"
                    priority={index < 3}
                    quality={85}
                    onError={(e) => {
                      const img = e.target as HTMLImageElement;
                      img.src = '/images/placeholder-logo.png';
                      console.error(`Failed to load partner image: ${partner.imageUrl}`);
                    }}
                  />
                </div>
                <h3 className={`text-lg font-semibold text-gray-800 mb-2 ${isRTL ? 'font-[Noto Sans Arabic]' : ''}`}>
                  {partner.name}
                </h3>
                <p className={`text-sm text-gray-600 text-center ${isRTL ? 'font-[Noto Sans Arabic]' : ''}`}>
                  {language === 'en' ? 'Partner Type' : 'نوع الشريك'}: {getPartnerTypeLabel(partner.type)}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PartnersPage;
