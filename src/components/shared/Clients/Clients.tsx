/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

const clients = [
  {
    src: "/Clients/mtde.png",
    alt: "MTDE",
    label: "A Project of",
    showLabel: true,
  },
  {
    src: "/Clients/WordBank.jpg",
    alt: "World Bank",
    label: "Funded By",
    showLabel: false,
  },
  {
    src: "/Clients/NethGov.jpg",
    alt: "Netherlands Government",
    label: "Funded By",
    showLabel: false,
  },
  {
    src: "/Clients/Eur.jpg",
    alt: "European Union",
    label: "Funded By",
    showLabel: false,
  },
  { src: "/Clients/Sc.png", alt: "SC", label: "Funded By", showLabel: false },
  {
    src: "/Clients/DAI.png",
    alt: "DAI",
    label: "Implemented By",
    showLabel: true,
  },
];

const Clients = () => {
  return (
    <section className="relative">
      <div className="container mx-auto">
        <div className="max-w-7xl mx-auto">
          {/* Labels row */}
          <div className="flex justify-between items-center mb-6 px-4">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-lg text-[#1b316e] font-semibold"
            >
              A Project of
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-lg text-[#1b316e] font-semibold"
            >
              Funded By
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-lg text-[#1b316e] font-semibold"
            >
              Implemented By
            </motion.span>
          </div>

          {/* Logos row */}
          <div className="flex justify-between items-center">
            {/* MTDE Logo */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="w-[200px]"
            >
              <div className="bg-white rounded-xl p-4 shadow-md hover:shadow-lg transition-all duration-300">
                <div className="relative h-[100px]">
                  <Image
                    src="/Clients/mtde.png"
                    alt="MTDE"
                    fill
                    className="object-contain"
                    priority
                  />
                </div>
              </div>
            </motion.div>

            {/* Funders Logos */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="flex-grow mx-8"
            >
              <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  {clients.slice(1, 5).map((client, index) => (
                    <div key={index} className="relative h-[80px]">
                      <Image
                        src={client.src}
                        alt={client.alt}
                        fill
                        className="object-contain"
                        priority={index < 2}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* DAI Logo */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="w-[200px]"
            >
              <div className="bg-white rounded-xl p-4 shadow-md hover:shadow-lg transition-all duration-300">
                <div className="relative h-[100px]">
                  <Image
                    src="/Clients/DAI.png"
                    alt="DAI"
                    fill
                    className="object-contain"
                    priority
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Clients;
