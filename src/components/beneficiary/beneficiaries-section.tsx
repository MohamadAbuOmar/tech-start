"use client";
import Image from "next/image";
import React, { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useOutsideClick } from "@/lib/use-outside-click";
import { Input } from "@/components/ui/input";
import { CategoryTabs } from "./category-tabs";
import { useLanguage } from "@/context/LanguageContext";
import { LocalizedBeneficiary } from "@/app/actions/pages/beneficiaries";

const DEFAULT_IMAGE = "/car-front-2.png"; 

interface BeneficiariesSectionProps {
  data: LocalizedBeneficiary[];
}

export function BeneficiariesSection({ data }: BeneficiariesSectionProps) {
  const { language, isRTL } = useLanguage();
  const [active, setActive] = useState<LocalizedBeneficiary | null>(null);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const id = useId();
  const ref = useRef<HTMLDivElement>(null);

  const getValidImageUrl = (url?: string) => {
    if (!url || url.trim() === '') return DEFAULT_IMAGE;
    return url;
  };

  const categories = ["all", ...new Set(data.map(item => item.category.slug))];

  const filteredCards = data.filter((card) => {
    const matchesSearch = card.title.toLowerCase().includes(search.toLowerCase()) ||
                         card.description.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = categoryFilter === "all" || card.category.slug === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setActive(null);
      }
    }

    if (active && typeof active === "object") {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [active]);

  useOutsideClick(ref, () => setActive(null));

  return (
    <div className={`w-full bg-white py-16 ${isRTL ? 'rtl' : 'ltr'}`}>
      <div className="max-w-screen-xl mx-auto px-4">
        <motion.h2 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-4xl font-bold text-center mb-16 text-black"
        >
          {language === 'en' ? 'Empowering Lives, Creating Opportunities' : 'تمكين الحياة، خلق الفرص'}
        </motion.h2>

        <div className="mb-8 flex flex-col md:flex-row gap-4">
          <Input
            placeholder={language === 'en' ? "Search beneficiaries..." : "البحث عن المستفيدين..."}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="md:w-72"
          />
          <CategoryTabs
            categories={categories}
            activeCategory={categoryFilter}
            onCategoryChange={setCategoryFilter}
          />
        </div>

        <AnimatePresence>
          {active && typeof active === "object" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/30 backdrop-blur-sm h-full w-full z-10"
            />
          )}
        </AnimatePresence>

        <AnimatePresence>
          {active && typeof active === "object" ? (
            <div className="fixed inset-0 grid place-items-center z-[100] p-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                transition={{ 
                  duration: 0.2,
                  ease: [0.19, 1.0, 0.22, 1.0]
                }}
                style={{ willChange: 'transform, opacity' }}
                layoutId={`card-${active.title}-${id}`}
                ref={ref}
                className="w-full max-w-[600px] bg-white rounded-2xl shadow-2xl overflow-hidden border"
              >
                <motion.button
                  key={`button-${active.title}-${id}`}
                  layout
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className={`absolute top-4 ${isRTL ? 'left-4' : 'right-4'} z-20 bg-gray-100 rounded-full p-2 hover:bg-gray-200 transition-all`}
                  onClick={() => setActive(null)}
                >
                  <CloseIcon />
                </motion.button>

                <motion.div layoutId={`image-${active.title}-${id}`}>
                  <Image
                    priority
                    loading="eager"
                    width={600}
                    height={400}
                    src={getValidImageUrl(active.imageUrl)}
                    alt={active.title || 'Card image'}
                    className="w-full h-64 object-contain bg-gray-50 p-8"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = DEFAULT_IMAGE;
                    }}
                  />
                </motion.div>

                <div className="p-6 pt-4">
                  <motion.h3
                    layoutId={`title-${active.title}-${id}`}
                    className={`text-2xl font-bold text-black mb-2 ${isRTL ? 'text-right' : 'text-left'}`}
                  >
                    {active.title}
                  </motion.h3>
                  <motion.p
                    layoutId={`description-${active.description}-${id}`}
                    className={`text-gray-700 mb-4 ${isRTL ? 'text-right' : 'text-left'}`}
                  >
                    {active.description}
                  </motion.p>

                  <motion.div
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className={`text-gray-800 text-base leading-relaxed max-h-64 overflow-auto ${isRTL ? 'pl-2' : 'pr-2'} ${isRTL ? 'text-right' : 'text-left'}`}
                  >
                    {active.longDescription}
                  </motion.div>

                  <motion.a
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    href={active.ctaLink}
                    target="_blank"
                    className={`mt-4 block w-full text-center px-6 py-3 bg-black text-white rounded-full font-bold hover:bg-gray-800 transition-all ${isRTL ? 'font-[Noto Sans Arabic]' : ''}`}
                  >
                    {active.ctaText}
                  </motion.a>
                </div>
              </motion.div>
            </div>
          ) : null}
        </AnimatePresence>

        <motion.ul 
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                delayChildren: 0.2,
                staggerChildren: 0.1
              }
            }
          }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          {filteredCards.map((card) => (
            <motion.li
              key={card.id}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { 
                  opacity: 1, 
                  y: 0,
                  transition: { 
                    type: "spring", 
                    stiffness: 300, 
                    damping: 20 
                  }
                }
              }}
              layoutId={`card-${card.id}-${id}`}
              onClick={() => setActive(card)}
              className="bg-white border rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 cursor-pointer overflow-hidden group"
            >
              <div className="p-6 flex flex-col items-center">
                <motion.div 
                  layoutId={`image-${card.title}-${id}`}
                  className="mb-4 w-32 h-32 flex items-center justify-center"
                >
                  <Image
                    width={120}
                    height={120}
                    loading="eager"
                    src={getValidImageUrl(card.imageUrl)}
                    alt={card.title || 'Card image'}
                    className="rounded-full object-contain w-full h-full p-2 bg-gray-50 group-hover:rotate-6 transition-transform duration-300 border will-change-transform"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = DEFAULT_IMAGE;
                    }}
                  />
                </motion.div>
                <div className="text-center">
                  <motion.h3
                    layoutId={`title-${card.title}-${id}`}
                    className={`font-bold text-lg text-black mb-1 ${isRTL ? 'text-right' : 'text-left'}`}
                  >
                    {card.title}
                  </motion.h3>
                  <motion.p
                    layoutId={`description-${card.description}-${id}`}
                    className={`text-gray-700 text-sm ${isRTL ? 'text-right' : 'text-left'}`}
                  >
                    {card.description}
                  </motion.p>
                </div>
              </div>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </div>
  );
}

export const CloseIcon = () => {
  return (
    <motion.svg
      initial={{ opacity: 0, rotate: -90 }}
      animate={{ opacity: 1, rotate: 0 }}
      exit={{
        opacity: 0,
        rotate: 90,
        transition: { duration: 0.2 },
      }}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-5 w-5 text-black"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M18 6l-12 12" />
      <path d="M6 6l12 12" />
    </motion.svg>
  );
};

