"use client";

import React, { useState, useLayoutEffect, useRef, useEffect } from "react";
import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import Link from "next/link";
import { Menu } from "lucide-react";
import { LogoAnimation } from "../Hero/LogoAnimation";
import { SlideTabs } from "./drop-down/SlideTabs";
import AnimatedSearch from "./AnimatedSearch";
import ShinyButton from "@/components/ui/shiny-button";
import MobileMenu from "./mobile/MobileMenu";
import { createPortal } from "react-dom";
import { cn } from "@/lib/utils";

type Language = "en" | "ar";

export const Navbar: React.FC = () => {
  const [language, setLanguage] = useState<Language>("en");
  const [isMounted, setIsMounted] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [hidden, setHidden] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { scrollY } = useScroll();
  const lastYRef = useRef(0);
  const heroRef = useRef<HTMLElement | null>(null);

  useMotionValueEvent(scrollY, "change", (y) => {
    const difference = y - lastYRef.current;
    if (Math.abs(difference) > 180) {
      setHidden(difference > 0);
      lastYRef.current = y;
    }
    setIsScrolled(y > 50);
  });

  useLayoutEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    heroRef.current = document.querySelector("#hero-section");
  }, []);

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === "en" ? "ar" : "en"));
  };

  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-[100] flex justify-center">
        <motion.nav
          className={cn(
            "w-full max-w-7xl mx-auto pt-3 py-4 px-4 sm:px-6 lg:px-8 transition-all duration-300",
            isScrolled
              ? "bg-white/80 backdrop-blur-md shadow-md rounded-full my-2"
              : "bg-transparent"
          )}
        >
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <div className="relative h-12 w-32 sm:h-14 sm:w-36 md:h-16 md:w-40 flex items-center justify-center">
                {isMounted && <LogoAnimation />}
              </div>
            </Link>

            <div className="hidden md:block text-[#142451]">
              <SlideTabs />
            </div>

            <div className="flex items-center gap-2">
              <AnimatedSearch />
              <ShinyButton
                onClick={toggleLanguage}
                className="bg-gradient-to-tr from-[#862996] to-[#142451] hover:from-[#862996]/80 hover:to-[#142451]/80 rounded-2xl"
              >
                <span
                  className={`text-white font-semibold text-sm ${
                    language === "en" ? "rtl:mr-1" : "ltr:ml-1"
                  }`}
                >
                  {language === "en" ? "ع" : "EN"}
                </span>
              </ShinyButton>
              <button
                className="md:hidden p-2 rounded-full hover:bg-gray-100 transition-colors"
                onClick={() => setIsMobileMenuOpen(true)}
                aria-label="Open menu"
              >
                <Menu className="h-6 w-6 text-[#142451]" />
              </button>
            </div>
          </div>
        </motion.nav>
      </div>
      {isMounted &&
        createPortal(
          <MobileMenu
            key="mobile-menu"
            isOpen={isMobileMenuOpen}
            onClose={() => setIsMobileMenuOpen(false)}
          />,
          document.getElementById("modal-root") || document.body
        )}
    </>
  );
};
