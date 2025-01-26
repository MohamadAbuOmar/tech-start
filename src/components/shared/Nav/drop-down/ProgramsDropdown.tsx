"use client";

import React, { useState, useRef, Dispatch, SetStateAction } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";

type Position = {
  left: number;
  width: number;
  opacity: number;
};

export const ProgramsDropdown = ({
  setPosition,
}: {
  setPosition: Dispatch<SetStateAction<Position>>;
}) => {
  const { language } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [activeItem, setActiveItem] = useState<string | null>(null);
  const [activeSubItem, setActiveSubItem] = useState<string | null>(null);
  const ref = useRef<null | HTMLLIElement>(null);

  type SubProgram = {
    id: string;
    name: string;
    href?: string;
    pilotPoints?: Array<{ name: string; href: string }>;
  };

  type Program = {
    id: string;
    name: string;
    subPrograms: SubProgram[];
  };

  const programs: Program[] = [
    {
      id: "building-capabilities",
      name: language === 'en' ? "Building Capabilities" : "بناء القدرات",
      subPrograms: [
        {
          id: "upskill",
          name: language === 'en' ? "UPSKILL" : "تطوير المهارات",
          href: "/programs/upskill",
          pilotPoints: [
            { name: language === 'en' ? "Overview" : "نظرة عامة", href: "/programs/upskill#overview" },
            { name: language === 'en' ? "Student Internship" : "تدريب الطلاب", href: "/programs/upskill#student" },
            { name: language === 'en' ? "Train-to-hire" : "التدريب للتوظيف", href: "/programs/upskill#train-to-hire" },
            { name: language === 'en' ? "On-the-job Training" : "التدريب أثناء العمل", href: "/programs/upskill#on-the-job" },
            { name: language === 'en' ? "Expatriate and Diaspora" : "المغتربون والشتات", href: "/programs/upskill#expatriate" },
            { name: language === 'en' ? "FAQ" : "الأسئلة الشائعة", href: "/programs/upskill#faq" },
          ]
        },
        {
          id: "elevate",
          name: language === 'en' ? "Elevate" : "الارتقاء",
          pilotPoints: [
            { name: language === 'en' ? "Pilot Point 1" : "النقطة التجريبية 1", href: "/programs/elevate/1" },
            { name: language === 'en' ? "Pilot Point 2" : "النقطة التجريبية 2", href: "/programs/elevate/2" },
          ]
        },
        {
          id: "femtech",
          name: language === 'en' ? "FemTech" : "تقنية المرأة",
          pilotPoints: [
            { name: language === 'en' ? "Pilot Point 1" : "النقطة التجريبية 1", href: "/programs/femtech/1" },
            { name: language === 'en' ? "Pilot Point 2" : "النقطة التجريبية 2", href: "/programs/femtech/2" },
          ]
        }
      ]
    },
    {
      id: "improving-ecosystem",
      name: "Improving IT Ecosystem",
      subPrograms: [
        {
          id: "pioneer",
          name: language === 'en' ? "Pioneer" : "الريادة",
          href: "/programs/pioneer",
          pilotPoints: [
            { name: language === 'en' ? "Overview" : "نظرة عامة", href: "/programs/pioneer#overview" },
            { name: language === 'en' ? "New IT Service Operations" : "عمليات خدمة تكنولوجيا المعلومات الجديدة", href: "/programs/pioneer#it-service" },
            { name: language === 'en' ? "IT Training Providers" : "مزودي التدريب على تكنولوجيا المعلومات", href: "/programs/pioneer#training" },
            { name: language === 'en' ? "HR Service Providers" : "مزودي خدمات الموارد البشرية", href: "/programs/pioneer#hr-service" },
            { name: language === 'en' ? "Business Infrastructure" : "البنية التحتية للأعمال", href: "/programs/pioneer#infrastructure" },
            { name: language === 'en' ? "FAQ" : "الأسئلة الشائعة", href: "/programs/pioneer#faq" },
          ]
        },
        {
          id: "market-access",
          name: language === 'en' ? "Market Access" : "الوصول إلى السوق",
          pilotPoints: [
            { name: language === 'en' ? "Pilot Point 1" : "النقطة التجريبية 1", href: "/programs/market-access/1" },
            { name: language === 'en' ? "Pilot Point 2" : "النقطة التجريبية 2", href: "/programs/market-access/2" },
          ]
        },
        {
          id: "horizon",
          name: language === 'en' ? "Horizon" : "الأفق",
          pilotPoints: [
            { name: language === 'en' ? "Pilot Point 1" : "النقطة التجريبية 1", href: "/programs/horizon/1" },
            { name: language === 'en' ? "Pilot Point 2" : "النقطة التجريبية 2", href: "/programs/horizon/2" },
          ]
        }
      ]
    }
  ];

  return (
    <li
      ref={ref}
      onMouseEnter={() => {
        if (!ref?.current) return;
        const { width } = ref.current.getBoundingClientRect();
        setPosition({
          left: ref.current.offsetLeft,
          width,
          opacity: 1,
        });
        setIsOpen(true);
      }}
      onMouseLeave={() => {
        setIsOpen(false);
        setActiveItem(null);
        setActiveSubItem(null);
      }}
      className="relative z-10 block cursor-pointer px-3 py-1.5 text-base font-medium text-[#1b316e] transition-colors hover:text-white"
    >
      {language === 'en' ? 'Programs' : 'البرامج'}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 100, damping: 15 }}
            className="absolute left-0 mt-2 w-80 rounded-xl bg-white/90 backdrop-blur-md shadow-lg shadow-purple-500/20 border border-purple-100/20 overflow-hidden"
          >
            <div className="py-1">
              {programs.map((program) => (
                <div key={program.id}>
                  <button
                    onClick={() => setActiveItem(activeItem === program.id ? null : program.id)}
                    className="w-full text-left px-4 py-2.5 text-sm text-[#1b316e] hover:bg-gradient-to-r hover:from-purple-50 hover:to-blue-50 hover:text-[#1b316e] transition-all group flex items-center justify-between"
                  >
                    {program.name}
                    <motion.span
                      animate={{ rotate: activeItem === program.id ? 180 : 0 }}
                      className="text-xs opacity-50 group-hover:opacity-100"
                    >
                      ▼
                    </motion.span>
                  </button>
                  <AnimatePresence>
                    {activeItem === program.id && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="bg-gray-50"
                      >
                        {program.subPrograms.map((subProgram) => (
                          <div key={subProgram.id}>
                            <button
                              onClick={() => setActiveSubItem(activeSubItem === subProgram.id ? null : subProgram.id)}
                              className="w-full text-left px-6 py-2 text-sm text-[#1b316e] hover:bg-gradient-to-r hover:from-purple-100 hover:to-blue-100 hover:text-[#1b316e] transition-all flex items-center justify-between"
                            >
                              {subProgram.name}
                              {subProgram.pilotPoints && (
                                <motion.span
                                  animate={{ rotate: activeSubItem === subProgram.id ? 180 : 0 }}
                                  className="text-xs opacity-50"
                                >
                                  ▼
                                </motion.span>
                              )}
                            </button>
                            <AnimatePresence>
                              {activeSubItem === subProgram.id && subProgram.pilotPoints && (
                                <motion.div
                                  initial={{ height: 0, opacity: 0 }}
                                  animate={{ height: "auto", opacity: 1 }}
                                  exit={{ height: 0, opacity: 0 }}
                                  transition={{ duration: 0.3 }}
                                  className="bg-gray-100"
                                >
                                  {subProgram.pilotPoints.map((point) => (
                                    <Link
                                      key={point.href}
                                      href={point.href}
                                      className="block px-8 py-2 text-sm text-[#1b316e] hover:bg-gradient-to-r hover:from-purple-100 hover:to-blue-100 hover:text-[#1b316e] transition-all"
                                    >
                                      {point.name}
                                    </Link>
                                  ))}
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </li>
  );
};
