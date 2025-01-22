"use client";

import Image from "next/image";
import React, { useEffect, useRef } from "react";
import { motion, useAnimation, useInView } from "framer-motion";
import { WordPullUpDemo } from "../../ui/FoucursTitle";

const services = [
  {
    icon: "/images/S6.png",
    title: "Improving IT Service Capabilities",
    description:
      "Take your business to the next level with our web design and development services",
  },
  {
    icon: "/images/S1.png",
    title: "Improving Market Access and Increasing Demand and Investments",
    description:
      "Get your website to the top of search engine results with our SEO services",
  },
  {
    icon: "/images/S5.png",
    title: "Improving IT Services Ecosystem",
    description:
      "Boost your brand's online presence with our social media marketing services",
  },
];

const ServiceCard = ({
  service,
  index,
}: {
  service: { icon: string; title: string; description: string };
  index: number;
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={{
        hidden: { opacity: 0, y: 50 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.5, delay: index * 0.1 },
        },
      }}
      className="relative flex flex-col justify-between h-full space-y-4 text-center bg-white p-6 cursor-pointer group rounded-lg shadow-lg overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-secondary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
      <div className="absolute inset-0 bg-dot-pattern opacity-10"></div>
      <Image
        src={service.icon}
        width={1200}
        height={1400}
        className="object-contain mx-auto w-40 h-40 mb-4 transition-transform duration-300 group-hover:scale-110"
        alt={service.title}
      />
      <h2 className="text-xl font-semibold text-primary">{service.title}</h2>
      <p className="text-gray-600 group-hover:text-gray-800 transition-colors duration-300">
        {service.description}
      </p>
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-secondary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
    </motion.div>
  );
};

export default function FoucesArea() {
  return (
    <div className="relative py-24 mb-[5rem] px-6 overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      <div className="absolute inset-0 bg-dot-pattern opacity-5"></div>
      <div className="relative max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-4xl font-bold text-center mb-4">
            <WordPullUpDemo />
          </div>
          <p className="text-center py-4 max-w-2xl mx-auto text-xl text-gray-600">
            All of our services are designed to help your business stand out
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
          {services.map((service, index) => (
            <ServiceCard key={service.title} service={service} index={index} />
          ))}
        </div>
      </div>
    </div>
  );
}
