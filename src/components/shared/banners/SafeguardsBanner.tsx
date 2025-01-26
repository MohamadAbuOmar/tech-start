"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Lottie from "lottie-react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import ESMF from "@/../public/svg/ESMF.json";
import { useLanguage } from "@/context/LanguageContext";
import { LocalizedSafeguard } from "@/app/actions/pages/safeguards";

interface SafeguardsBannerProps {
  safeguards: LocalizedSafeguard[];
}

const SafeguardsBanner = ({ safeguards }: SafeguardsBannerProps) => {
  const { language, isRTL } = useLanguage();
  return (
    <div className="relative max-w-7xl mx-auto my-[5vh] overflow-hidden bg-white text-gray-900">
      <div className="absolute inset-0 bg-grid-gray-200/50 bg-[size:20px_20px]" />
      <div className="container mx-auto px-4 py-16 sm:px-6 lg:px-8 lg:py-24 relative z-10">
        <div className={`flex flex-col lg:flex-row items-center justify-between gap-12 ${isRTL ? 'rtl' : 'ltr'}`}>
          <motion.div
            className="w-full lg:w-1/2 space-y-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className={`text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight text-[#142451] ${isRTL ? 'text-right' : 'text-left'}`}>
              {language === 'en' ? (
                <>Our environmental and social <span className="text-[#862996]">guidelines</span></>
              ) : (
                <>إرشاداتنا <span className="text-[#862996]">البيئية والاجتماعية</span></>
              )}
            </h2>
            <p className={`text-lg sm:text-xl text-[#142451] max-w-2xl ${isRTL ? 'text-right' : 'text-left'}`}>
              {language === 'en' 
                ? 'Explore our comprehensive safeguards, ensuring a safe and responsible environment for all stakeholders.'
                : 'اكتشف ضماناتنا الشاملة التي تضمن بيئة آمنة ومسؤولة لجميع الأطراف المعنية.'}
            </p>
            <div className={`flex flex-wrap gap-4 ${isRTL ? 'justify-end' : 'justify-start'}`}>
              {safeguards.map((item) => (
                <div
                  key={item.id}
                  className="bg-[#4169E1]/10 text-[#000080] rounded-lg px-3 py-1 text-sm font-medium"
                >
                  {item.type}
                </div>
              ))}
            </div>
            <Link href="/safeguards" passHref>
              <Button
                size="lg"
                className={`mt-4 bg-gradient-to-r from-[#142451] to-[#862996] text-white hover:from-[#142451]/80 hover:to-[#862996]/80 ${isRTL ? 'flex-row-reverse' : ''}`}
              >
                {language === 'en' ? 'Learn More' : 'اعرف المزيد'}
                <ArrowRight className={`${isRTL ? 'mr-2 rotate-180' : 'ml-2'} h-5 w-5`} />
              </Button>
            </Link>
          </motion.div>
          <motion.div
            className="w-full lg:w-1/2"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="relative w-full aspect-square max-w-md mx-auto">
              <div className="absolute inset-0 bg-gradient-to-br from-[#4169E1]/20 to-[#000080]/20 rounded-full blur-3xl" />
              <Lottie
                animationData={ESMF}
                loop={true}
                className="w-full h-full filter drop-shadow-lg"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default SafeguardsBanner;
