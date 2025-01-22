"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { BentoGrid, BentoGridItem } from "../../ui/bento-grid";
import { Copy, File, Video, Camera } from "lucide-react";
import AnimatedNetworkBackground from "../Nav/AnimatedBackground";

export function MediaCenter() {
  const bgColor = "#1b316e"; // Updated primary color

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

      <div className="relative text-center space-y-3 mb-16">
        <h2
          id="media-center-title"
          className="text-4xl md:text-5xl font-bold tracking-tight bg-gradient-to-r from-[#1b316e] to-[#862996] bg-clip-text text-transparent animate-fade-up"
        >
          Media Center
        </h2>
        <div className="w-32 h-1.5 bg-gradient-to-r from-[#1b316e] to-[#862996] mx-auto rounded-full animate-fade-up animation-delay-150" />
        <p className="mt-4 text-lg md:text-xl leading-8 text-[#1b316e] max-w-2xl mx-auto animate-fade-up animation-delay-200">
          Stay updated with our latest news, events, and success stories through
          our media gallery
        </p>
      </div>

      <BentoGrid className="relative max-w-4xl mx-auto md:auto-rows-[20rem] gap-4 p-4 bg-white/10 backdrop-blur-sm rounded-2xl shadow-lg">
        {items.map((item, i) => (
          <BentoGridItem
            key={i}
            title={item.title}
            description={item.description}
            header={item.header}
            className={`${item.className} group hover:shadow-xl transition-all duration-300 bg-white/90 backdrop-blur-sm relative hover:-translate-y-1`}
            icon={item.icon}
          >
            <Link
              href={item.link}
              className="absolute inset-0 focus:ring-2 focus:ring-[#862996] focus:outline-none rounded-xl"
            >
              <span className="sr-only">View {item.title}</span>
            </Link>
            <div className="absolute inset-0 bg-gradient-to-br from-[#1b316e] to-[#862996] opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded-xl" />
          </BentoGridItem>
        ))}
      </BentoGrid>
    </motion.section>
  );
}

const items = [
  {
    title: "Latest News & Updates",
    description:
      "Explore our recent achievements and announcements in the tech sector.",
    header: (
      <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl overflow-hidden">
        <Image
          src="/assets/img30.jpg"
          alt="Latest News"
          width={600}
          height={300}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority
        />
      </div>
    ),
    className: "md:col-span-2",
    icon: (
      <Copy className="h-4 w-4 text-[#1b316e] group-hover:text-[#862996] transition-colors duration-300" />
    ),
    link: "/news",
  },
  {
    title: "Press Releases",
    description:
      "Official announcements and press coverage of our initiatives.",
    header: (
      <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl overflow-hidden">
        <Image
          src="/assets/img29.jpg"
          alt="Press Releases"
          width={300}
          height={300}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
    ),
    className: "md:col-span-1",
    icon: (
      <File className="h-4 w-4 text-[#1b316e] group-hover:text-[#862996] transition-colors duration-300" />
    ),
    link: "/press",
  },
  {
    title: "Photo Gallery",
    description: "Visual journey through our events and milestones.",
    header: (
      <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl overflow-hidden">
        <Image
          src="/assets/img28.jpg"
          alt="Photo Gallery"
          width={300}
          height={300}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
    ),
    className: "md:col-span-1",
    icon: (
      <Camera className="h-4 w-4 text-[#1b316e] group-hover:text-[#862996] transition-colors duration-300" />
    ),
    link: "/gallery",
  },
  {
    title: "Video Stories",
    description: "Watch our impact through compelling video content.",
    header: (
      <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl overflow-hidden">
        <Image
          src="/assets/img27.jpg"
          alt="Video Stories"
          width={600}
          height={300}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
    ),
    className: "md:col-span-2",
    icon: (
      <Video className="h-4 w-4 text-[#1b316e] group-hover:text-[#862996] transition-colors duration-300" />
    ),
    link: "/videos",
  },
];
