"use client";

import React, { useRef, useEffect, useState } from "react";
import Lottie from "lottie-react";
import { motion, useScroll, AnimatePresence } from "framer-motion";
import Escp from "@/../public/svg/ESCP.json";
import ESMF from "@/../public/svg/ESMF.json";
import LMP from "@/../public/svg/LMP.json";
import SEP from "@/../public/svg/SEP.json";

const SafeG = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const sections = [
    {
      domain: "ESMF",
      title: "The Environmental and Social Management Framework",
      subtitle:
        "(ESMF) for Technology for Youth and Jobs Project & Additional Financing: Updated version of the ESMF (January 2023) has been prepared in line with the Additional Financing, to scale up activities and provide support to the Palestinian IT sector through the existing components of the project.",
      animation: ESMF,
      bgColor: "from-purple-100 to-purple-200",
      attachmentUrl: "/TechStart-BrandBook-2.pdf",
    },
    {
      domain: "SEP",
      title: "The Stakeholder engagement plan",
      subtitle:
        "defines a plan of action for stakeholder engagement throughout the project life cycle, including appropriate approaches for public consultation, information disclosure, and grievance redress. The goal of the SEP is to improve and facilitate decision making and actively involve project-affected people and other stakeholders in a timely manner, and to ensure that vulnerable groups are provided sufficient opportunity to voice their opinions and concerns, that may influence Project decisions.",
      animation: SEP,
      bgColor: "from-pink-100 to-pink-200",
      attachmentUrl: "/documents/SEP.pdf",
    },
    {
      domain: "LMP",
      title: "The Labor Management Procedure",
      subtitle:
        "for Technology for Youth and Jobs Project and Additional Financing: Updated version of the LMP (January 2023) has been prepared in line with the Additional Financing, to scale up activities and provide support to the Palestinian IT sector through the existing components of the project.",
      animation: LMP,
      bgColor: "from-blue-100 to-blue-200",
      attachmentUrl: "/documents/LMP.pdf",
    },
    {
      domain: "ESCP",
      title: "The Environmental and Social Commitment Plan",
      subtitle:
        "for Technology for Youth and Jobs Project & Additional Financing: Updated version of the ESCP (January 2023) has been prepared in line with the Additional Financing, to scale up activities and provide support to the Palestinian IT sector through the existing components of the project. The ESCP sets out a summary of the required environmental and social material measures and actions under TechStart project, as well as timelines for implementation.",
      animation: Escp,
      bgColor: "from-orange-100 to-orange-200",
      attachmentUrl: "/documents/ESCP.pdf",
    },
  ];

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  useEffect(() => {
    const unsubscribe = scrollYProgress.onChange((latest) => {
      const newIndex = Math.floor(latest * sections.length);
      if (newIndex !== currentIndex && newIndex < sections.length) {
        setCurrentIndex(newIndex);
      }
    });

    return () => unsubscribe();
  }, [scrollYProgress, currentIndex, sections.length]);

  const variants = {
    initial: (direction: number) => ({
      x: direction > 0 ? "100%" : "-100%",
      opacity: 0,
      scale: 0.8,
    }),
    animate: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        x: { type: "spring", stiffness: 300, damping: 30 },
        opacity: { duration: 0.2 },
        scale: { duration: 0.2 },
      },
    },
    exit: (direction: number) => ({
      x: direction < 0 ? "100%" : "-100%",
      opacity: 0,
      scale: 0.8,
      transition: {
        x: { type: "spring", stiffness: 300, damping: 30 },
        opacity: { duration: 0.2 },
        scale: { duration: 0.2 },
      },
    }),
  };

  return (
    <div ref={containerRef} className="relative">
      <div className="text-center space-y-3 mb-12 md:mb-16">
        <h2 className="text-4xl md:text-5xl font-bold tracking-tight bg-gradient-to-r from-gray-900 via-purple-900 to-gray-900 bg-clip-text text-transparent">
          Our Safety Guidelines
        </h2>
        <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-blue-500 mx-auto rounded-full" />
        <p className="mt-4 text-lg md:text-xl leading-8 text-gray-600 max-w-2xl mx-auto">
          Commitment to ensuring a safe and secure environment for everyone.
        </p>
      </div>
      {sections.map((section, index) => (
        <div
          key={index}
          className="h-screen flex items-center justify-center sticky top-0"
        >
          <motion.div
            className={`w-full h-full absolute inset-0 bg-gradient-to-br ${section.bgColor}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: currentIndex === index ? 1 : 0 }}
            transition={{ duration: 0.5 }}
          />
          <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between relative z-10">
            <div className="w-full md:w-1/2 mb-8 md:mb-0">
              <motion.div
                className="space-y-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{
                  opacity: currentIndex === index ? 1 : 0,
                  y: currentIndex === index ? 0 : 20,
                }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <span className="text-gray-600 text-lg font-semibold">
                  {section.domain}
                </span>
                <h2 className="text-4xl md:text-5xl font-bold text-gray-800">
                  {section.title}
                </h2>
                <p className="text-lg text-gray-600">{section.subtitle}</p>
                <a
                  href={section.attachmentUrl}
                  download
                  className="inline-block px-6 py-3 bg-gray-800 text-white rounded-full hover:bg-gray-700 transition-colors"
                >
                  Download Attachment
                </a>
              </motion.div>
            </div>
            <div className="w-full md:w-1/2">
              <AnimatePresence initial={false} custom={currentIndex}>
                {currentIndex === index && (
                  <motion.div
                    key={index}
                    custom={currentIndex}
                    variants={variants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    className="w-full aspect-square max-w-md mx-auto"
                  >
                    <Lottie
                      animationData={section.animation}
                      loop={true}
                      className="w-full h-full"
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SafeG;
