"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";

interface Partner {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  website: string;
  category: string;
}

interface PartnersPageProps {
  partners: Partner[];
}

const PartnersPage = ({ partners }: PartnersPageProps) => {
  const { language } = useLanguage();
  const isRTL = language === 'ar';
  const pageTitle = isRTL ? 'شركاؤنا الموثوقون' : 'Our Trusted Partners';
  
  return (
    <section className={`bg-gradient-to-b from-white to-gray-50 py-32 px-4 md:px-6 relative ${isRTL ? 'rtl' : 'ltr'}`}>
      <div className="container mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl md:text-4xl font-bold mb-12 text-center text-gray-800"
          dir={isRTL ? 'rtl' : 'ltr'}
        >
          {pageTitle}
        </motion.h2>

        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {partners.map((partner, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 p-6 cursor-pointer"
              onClick={() => window.open(partner.website, "_blank")}
            >
              <div className="flex flex-col items-center">
                <span className="text-sm text-gray-600 font-medium mb-2">
                  {partner.category}
                </span>
                <div className="w-[160px] h-[100px] relative mb-4">
                  <Image
                    src={partner.imageUrl}
                    alt={partner.title}
                    fill
                    className="object-contain"
                    priority={index < 3}
                    quality={85}
                  />
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  {partner.title}
                </h3>
                <p className="text-sm text-gray-600 text-center">
                  {partner.description}
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
