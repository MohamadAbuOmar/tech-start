"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { BentoGrid, BentoGridItem } from "../../ui/bento-grid";
import { Copy, File, Video, Camera } from "lucide-react";
import AnimatedNetworkBackground from "../Nav/AnimatedBackground";
import { useLanguage } from "@/context/LanguageContext";
import { LocalizedMediaItem } from "@/app/actions/pages/media";

interface MediaCenterProps {
  items: LocalizedMediaItem[];
}

export function MediaCenter({ items }: MediaCenterProps) {
  const { language, isRTL } = useLanguage();
  const bgColor = "#1b316e";

  const gradientStyle = {
    backgroundImage: `
      radial-gradient(circle at 50% -100px, ${bgColor}10, transparent 400px),
      radial-gradient(circle at 100% 50%, ${bgColor}05, transparent 400px),
      radial-gradient(circle at 0% 100%, ${bgColor}05, transparent 400px)
    `,
  };

  return (
    <motion.section
      className="relative min-h-screen py-24 px-6 overflow-hidden"
      aria-labelledby="media-center-title"
      animate={{
        backgroundColor: `${bgColor}05`,
        transition: { duration: 0.5, ease: "easeInOut" },
      }}
      style={gradientStyle}
    >
      <AnimatedNetworkBackground color={bgColor} />

      <div className={`relative text-center space-y-3 mb-16 ${isRTL ? 'rtl' : 'ltr'}`}>
        <h2
          id="media-center-title"
          className="text-4xl md:text-5xl font-bold tracking-tight bg-gradient-to-r from-[#1b316e] to-[#862996] bg-clip-text text-transparent animate-fade-up"
        >
          {language === 'en' ? 'Media Center' : 'المركز الإعلامي'}
        </h2>
        <div className="w-32 h-1.5 bg-gradient-to-r from-[#1b316e] to-[#862996] mx-auto rounded-full animate-fade-up animation-delay-150" />
        <p className="mt-4 text-lg md:text-xl leading-8 text-[#1b316e] max-w-2xl mx-auto animate-fade-up animation-delay-200">
          {language === 'en' 
            ? 'Stay updated with our latest news, events, and success stories through our media gallery'
            : 'تابع آخر الأخبار والفعاليات وقصص النجاح من خلال معرض الوسائط لدينا'}
        </p>
      </div>

      <BentoGrid className={`relative max-w-4xl mx-auto md:auto-rows-[20rem] gap-4 p-4 bg-white/10 backdrop-blur-sm rounded-2xl shadow-lg ${isRTL ? 'rtl' : 'ltr'}`}>
        {items.map((item, i) => {
          const icon = item.type === 'news' ? <Copy className="h-4 w-4 text-[#1b316e] group-hover:text-[#862996] transition-colors duration-300" />
            : item.type === 'press' ? <File className="h-4 w-4 text-[#1b316e] group-hover:text-[#862996] transition-colors duration-300" />
            : item.type === 'gallery' ? <Camera className="h-4 w-4 text-[#1b316e] group-hover:text-[#862996] transition-colors duration-300" />
            : <Video className="h-4 w-4 text-[#1b316e] group-hover:text-[#862996] transition-colors duration-300" />;

          return (
            <BentoGridItem
              key={item.id}
              title={item.title}
              description={item.description}
              header={
                <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl overflow-hidden">
                  <Image
                    src={item.imageUrl}
                    alt={item.title}
                    width={item.type === 'news' || item.type === 'video' ? 600 : 300}
                    height={300}
                    className={`w-full h-full object-cover transition-transform duration-300 group-hover:scale-105 ${isRTL ? 'transform scale-x-[-1]' : ''}`}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    priority={i === 0}
                  />
                </div>
              }
              className={`${item.type === 'news' || item.type === 'video' ? 'md:col-span-2' : 'md:col-span-1'} group hover:shadow-xl transition-all duration-300 bg-white/90 backdrop-blur-sm relative hover:-translate-y-1`}
              icon={icon}
            >
              <Link
                href={item.link}
                className="absolute inset-0 focus:ring-2 focus:ring-[#862996] focus:outline-none rounded-xl"
              >
                <span className="sr-only">
                  {language === 'en' ? `View ${item.title}` : `عرض ${item.title}`}
                </span>
              </Link>
              <div className="absolute inset-0 bg-gradient-to-br from-[#1b316e] to-[#862996] opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded-xl" />
            </BentoGridItem>
          );
        })}
      </BentoGrid>
    </motion.section>
  );
}

// Icons are now dynamically assigned in the render function based on item type
