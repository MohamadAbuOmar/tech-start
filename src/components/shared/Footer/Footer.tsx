"use client";

import React from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import {
  Instagram,
  Linkedin,
  Github,
  Youtube,
  Facebook,
  Twitter,
} from "lucide-react";
import AnimatedNetworkBackground from "../Nav/AnimatedBackground";
import Clients from "../Clients/Clients";
import { useLanguage } from "@/context/LanguageContext";
import { LocalizedFooter } from "@/app/actions/pages/footer";

interface FooterProps {
  footer: LocalizedFooter;
}

export default function Footer({ footer }: FooterProps) {
  const { isRTL } = useLanguage();
  const footerRef = React.useRef(null);
  const isInView = useInView(footerRef, { once: false });
  const footerColor = "#1E66AA";

  const gradientStyle = {
    backgroundImage: `linear-gradient(to bottom, white, ${footerColor}40)`,
    backgroundColor: "transparent",
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.05,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3 },
    },
  };

  const letterVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: (i: number) => ({
      y: 0,
      opacity: 1,
      transition: {
        delay: i * 0.05,
        type: "spring",
        damping: 10,
        stiffness: 100,
      },
    }),
  };

  return (
    <footer
      ref={footerRef}
      className={`relative py-16 overflow-hidden border-t border-gray-200 ${isRTL ? 'rtl' : 'ltr'}`}
      style={gradientStyle}
    >
      <AnimatedNetworkBackground color={footerColor} />

      <motion.div
        className="max-w-7xl mx-auto px-4 md:px-6 relative z-10"
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        <div className="flex flex-col items-center space-y-12">
          <motion.div
            className="text-6xl md:text-8xl font-bold"
            style={{
              background: `linear-gradient(135deg, ${footerColor}, #862996)`,
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            {Array.from(footer.techStartTitle).map((letter, i) => (
              <motion.span
                key={i}
                custom={i}
                variants={letterVariants}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                style={{ display: "inline-block" }}
              >
                {letter}
              </motion.span>
            ))}
          </motion.div>

          <motion.div variants={itemVariants} className="w-full py-8">
            <Clients />
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="w-full grid grid-cols-1 md:grid-cols-3 gap-8 items-center"
          >
            <motion.div
              variants={itemVariants}
              className={`flex justify-center ${isRTL ? 'md:justify-end space-x-reverse' : 'md:justify-start'} space-x-6`}
            >
              {[
                { text: footer.privacyPolicy, href: '/privacy-policy' },
                { text: footer.termsOfUse, href: '/terms-of-use' },
                { text: footer.trust, href: '/trust' }
              ].map((item, i) => (
                <Link
                  key={i}
                  href={item.href}
                  className="text-sm font-medium text-gray-600 hover:text-[#91268f] transition-colors"
                >
                  {item.text}
                </Link>
              ))}
            </motion.div>

            <motion.p
              variants={itemVariants}
              className={`text-sm text-gray-600 text-center ${isRTL ? 'text-right' : 'text-left'}`}
            >
              <span>{footer.copyright}</span>
            </motion.p>

            <motion.div
              variants={itemVariants}
              className={`flex justify-center ${isRTL ? 'md:justify-start space-x-reverse' : 'md:justify-end'} space-x-4`}
            >
              {[
                { Icon: Instagram, href: footer.socialLinks.instagram },
                { Icon: Linkedin, href: footer.socialLinks.linkedin },
                { Icon: Youtube, href: footer.socialLinks.youtube },
                { Icon: Facebook, href: footer.socialLinks.facebook },
                { Icon: Twitter, href: footer.socialLinks.twitter }
              ].filter(item => item.href !== null).map(
                ({ Icon, href }, i) => (
                  <Link
                    key={i}
                    href={href || '#'}
                    className="p-2 rounded-full bg-white/80 hover:bg-[#91268f]/10 text-gray-600 hover:text-[#91268f] transition-all duration-300 shadow-lg hover:shadow-xl"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Icon size={20} />
                  </Link>
                )
              )}
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </footer>
  );
}
