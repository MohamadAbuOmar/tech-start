"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";

interface ReusableHeroProps {
  badge: string;
  title: string;
  highlightedWord: string;
  description: string;
  primaryButtonText: string;
  secondaryButtonText: string;
  imageSrc: string;
  imageAlt: string;
  features: Array<{
    icon: React.ReactNode;
    title: string;
    description: string;
  }>;
}

export default function ReusableHero({
  badge,
  title,
  highlightedWord,
  description,
  primaryButtonText,
  secondaryButtonText,
  imageSrc,
  imageAlt,
  features,
}: ReusableHeroProps) {
  const { isRTL } = useLanguage();
  
  // Use language context for dynamic layout
  const containerClasses = `relative overflow-hidden bg-gradient-to-br from-pink-50 to-white ${isRTL ? 'rtl' : 'ltr'}`;
  return (
    <div className={containerClasses}>
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
                  className={`inline-block px-4 py-1 rounded-full bg-blue-100 text-blue-700 text-sm font-medium ${isRTL ? 'font-[Noto Sans Arabic]' : ''}`}
                >
                  {badge}
                </motion.span>
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className={`text-4xl lg:text-6xl font-bold tracking-tight text-gray-900 ${isRTL ? 'font-[Noto Sans Arabic]' : ''}`}
                >
                  {title}{" "}
                  <span className="text-blue-600 relative">
                    {highlightedWord}
                    <motion.svg
                      width="120"
                      height="20"
                      viewBox="0 0 120 20"
                      fill="none"
                      className={`absolute -bottom-2 ${isRTL ? 'right-0' : 'left-0'} w-full`}
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
                  className={`text-xl text-gray-600 max-w-2xl ${isRTL ? 'font-[Noto Sans Arabic]' : ''}`}
                >
                  {description}
                </motion.p>
              </div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="flex flex-wrap gap-4"
              >
                <Button
                  size="lg"
                  className={`bg-blue-600 hover:bg-blue-700 text-white px-8 ${isRTL ? 'font-[Noto Sans Arabic]' : ''}`}
                >
                  {primaryButtonText}
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className={`border-blue-200 hover:bg-blue-50 ${isRTL ? 'font-[Noto Sans Arabic]' : ''}`}
                >
                  {secondaryButtonText}
                </Button>
              </motion.div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="relative lg:h-[600px]"
            >
              <Image
                src={imageSrc}
                alt={imageAlt}
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
          {features.map((feature, index) => (
            <div key={index} className="bg-white rounded-2xl p-8 shadow-lg shadow-blue-100">
              <div className="size-12 rounded-lg bg-blue-100 flex items-center justify-center mb-6">
                {feature.icon}
              </div>
              <h3 className={`text-xl font-semibold mb-2 ${isRTL ? 'font-[Noto Sans Arabic]' : ''}`}>{feature.title}</h3>
              <p className={`text-gray-600 ${isRTL ? 'font-[Noto Sans Arabic]' : ''}`}>{feature.description}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
