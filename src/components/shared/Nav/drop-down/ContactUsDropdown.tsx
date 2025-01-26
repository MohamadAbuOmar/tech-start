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

export const ContactUsDropdown = ({
  setPosition,
}: {
  setPosition: Dispatch<SetStateAction<Position>>;
}) => {
  const { language } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<null | HTMLLIElement>(null);

  const menuItems = [
    {
      id: "contact-us",
      name: language === 'en' ? "Contact Us" : "اتصل بنا",
      href: "/Contact-us",
    },
    {
      id: "complaints",
      name: language === 'en' ? "Complaints" : "الشكاوى",
      href: "/submit-complaint",
    },
    {
      id: "faqs",
      name: language === 'en' ? "FAQs" : "الأسئلة الشائعة",
      href: "/FAQs",
    },
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
      }}
      className="relative z-10 block cursor-pointer px-3 py-1.5 text-base font-medium text-[#1b316e] transition-colors hover:text-white"
    >
      {language === 'en' ? 'Contact Us' : 'اتصل بنا'}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 100, damping: 15 }}
            className="absolute left-0 mt-2 w-64 rounded-xl bg-white/90 backdrop-blur-md shadow-lg shadow-purple-500/20 border border-purple-100/20 overflow-hidden"
          >
            <div className="py-1">
              {menuItems.map((item) => (
                <Link
                  key={item.id}
                  href={item.href}
                  className="block px-4 py-2.5 text-sm text-[#1b316e] hover:bg-gradient-to-r hover:from-purple-50 hover:to-blue-50 hover:text-[#1b316e] transition-all"
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </li>
  );
};
