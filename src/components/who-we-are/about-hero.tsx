"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";
import { LocalizedAboutUs } from "@/app/actions/pages/about-us";
import React from "react";
import dynamic from "next/dynamic";

interface AboutHeroProps {
  aboutData: LocalizedAboutUs;
}

export default function AboutHero({ aboutData }: AboutHeroProps) {
  const { language, isRTL } = useLanguage();
  return (
    <div className={`relative overflow-hidden bg-gradient-to-br from-pink-50 to-white ${isRTL ? 'rtl' : 'ltr'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div>
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-8"
            >
              <div className="space-y-4">
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="inline-block px-4 py-1 rounded-full bg-blue-100 text-blue-700 text-sm font-medium"
                >
                  {language === 'en' ? 'About Us' : 'من نحن'}
                </motion.span>
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-4xl lg:text-6xl font-bold tracking-tight text-gray-900"
                >
                  {aboutData.title}
                  <span className="text-blue-600 m-3 relative">
                    {aboutData.description}
                    <motion.svg
                      width="120"
                      height="20"
                      viewBox="0 0 120 20"
                      fill="none"
                      className="absolute -bottom-2 left-0 w-full"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ delay: 0.5, duration: 0.8 }}
                    >
                      <path
                        d="M3 17C32.3385 7.45614 93.1615 -2.04386 117 17"
                        stroke="#FCD34D"
                        strokeWidth="4"
                        strokeLinecap="round"
                      />
                    </motion.svg>
                  </span>
                </motion.h1>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="text-xl text-gray-600 max-w-2xl"
                >
                  {aboutData.description}
                </motion.p>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className={`relative lg:h-[600px] ${isRTL ? 'transform scale-x-[-1]' : ''}`}
            >
              <Image
                src={aboutData.imageUrl || "/images/About.png"}
                alt={language === 'en' ? "Tech illustration" : "رسم توضيحي تقني"}
                width={1200}
                height={1600}
                className="object-contain"
                priority
              />
            </motion.div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="grid md:grid-cols-3 gap-8 pb-20"
        >
          {aboutData.cards.map((card) => (
            <div key={card.id} className={`bg-white rounded-2xl p-8 shadow-lg shadow-blue-100 ${isRTL ? 'text-right' : 'text-left'}`}>
              <div className="size-12 rounded-lg bg-blue-100 flex items-center justify-center mb-6">
                <div className="size-6 text-blue-600">
                  {React.createElement(
                    dynamic(() =>
                      import('lucide-react').then(
                        (mod) => mod[card.icon as keyof typeof mod] || mod.HelpCircle
                      )
                    ),
                    { size: 24 }
                  )}
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-2">{card.title}</h3>
              <p className="text-gray-600">{card.description}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
