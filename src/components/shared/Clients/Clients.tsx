"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { LocalizedPartner } from "@/app/actions/pages/partners";

interface ClientsProps {
  partners: LocalizedPartner[];
}

const Clients = ({ partners }: ClientsProps) => {
  const { language, isRTL } = useLanguage();
  
  if (!partners || partners.length === 0) {
    return null;
  }
  
  const projectPartners = partners.filter(p => p.type === 'PROJECT_OF');
  const fundedByPartners = partners.filter(p => p.type === 'FUNDED_BY');
  const implementedByPartners = partners.filter(p => p.type === 'IMPLEMENTED_BY');
  
  if (!projectPartners.length && !fundedByPartners.length && !implementedByPartners.length) {
    return null;
  }
  return (
    <section className="relative">
      <div className="container mx-auto">
        <div className="max-w-7xl mx-auto">
          {/* Labels row */}
          <div className={`flex justify-between items-center mb-6 px-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
            {projectPartners.length > 0 && (
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className={`text-lg text-[#1b316e] font-semibold ${isRTL ? 'font-[Noto Sans Arabic]' : ''}`}
              >
                {language === 'en' ? 'A Project of' : 'مشروع من'}
              </motion.span>
            )}
            {fundedByPartners.length > 0 && (
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className={`text-lg text-[#1b316e] font-semibold ${isRTL ? 'font-[Noto Sans Arabic]' : ''}`}
              >
                {language === 'en' ? 'Funded By' : 'بتمويل من'}
              </motion.span>
            )}
            {implementedByPartners.length > 0 && (
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className={`text-lg text-[#1b316e] font-semibold ${isRTL ? 'font-[Noto Sans Arabic]' : ''}`}
              >
                {language === 'en' ? 'Implemented By' : 'تنفيذ'}
              </motion.span>
            )}
          </div>

          {/* Logos row */}
          <div className="flex justify-between items-center">
            {/* Project Partner Logo */}
            {projectPartners.map((partner, index) => (
              <motion.div
                key={partner.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="w-[200px]"
              >
                <div className="bg-white rounded-xl p-4 shadow-md hover:shadow-lg transition-all duration-300">
                  <div className="relative h-[100px]">
                    <Image
                      src={partner.imageUrl}
                      alt={partner.name}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 200px"
                      className="object-contain"
                      priority
                      onError={(e) => {
                        const img = e.target as HTMLImageElement;
                        img.src = '/images/placeholder-logo.png';
                        console.error(`Failed to load project partner image: ${partner.imageUrl}`);
                      }}
                    />
                  </div>
                </div>
              </motion.div>
            ))}

            {/* Funders Logos */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="flex-grow mx-8"
            >
              <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  {fundedByPartners.map((partner, index) => (
                    <div key={partner.id} className="relative h-[80px]">
                      <Image
                        src={partner.imageUrl}
                        alt={partner.name}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 150px"
                        className="object-contain"
                        priority={index < 2}
                        onError={(e) => {
                          const img = e.target as HTMLImageElement;
                          img.src = '/images/placeholder-logo.png';
                          console.error(`Failed to load partner image: ${partner.imageUrl}`);
                        }}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Implementation Partner Logo */}
            {implementedByPartners.map((partner, index) => (
              <motion.div
                key={partner.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="w-[200px]"
              >
                <div className="bg-white rounded-xl p-4 shadow-md hover:shadow-lg transition-all duration-300">
                  <div className="relative h-[100px]">
                    <Image
                      src={partner.imageUrl}
                      alt={partner.name}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 200px"
                      className="object-contain"
                      priority
                      onError={(e) => {
                        const img = e.target as HTMLImageElement;
                        img.src = '/images/placeholder-logo.png';
                        console.error(`Failed to load implementation partner image: ${partner.imageUrl}`);
                      }}
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Clients;
