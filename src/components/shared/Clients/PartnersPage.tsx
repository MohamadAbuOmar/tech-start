"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

const clients = [
  {
    src: "/Clients/mtde.png",
    alt: "MTDE",
    label: "A Project of",
    description:
      "MTDE is a key project partner, providing essential support and resources.",
    website: "https://mtde.gov.pk",
  },
  {
    src: "/Clients/WordBank.jpg",
    alt: "World Bank",
    label: "Funded By",
    description:
      "The World Bank funds crucial initiatives to drive sustainable development.",
    website: "https://www.worldbank.org",
  },
  {
    src: "/Clients/NethGov.jpg",
    alt: "Netherlands Government",
    label: "Funded By",
    description:
      "The Netherlands Government contributes to international cooperation and development.",
    website: "https://www.government.nl",
  },
  {
    src: "/Clients/Eur.jpg",
    alt: "European Union",
    label: "Funded By",
    description:
      "The European Union supports various programs aimed at fostering growth and innovation.",
    website: "https://european-union.europa.eu",
  },
  {
    src: "/Clients/Sc.png",
    alt: "SC",
    label: "Funded By",
    description:
      "SC plays a vital role in funding initiatives that make a difference.",
    website: "https://www.sc.com",
  },
  {
    src: "/Clients/DAI.png",
    alt: "DAI",
    label: "Implemented By",
    description:
      "DAI implements transformative development projects across the globe.",
    website: "https://www.dai.com",
  },
];

const PartnersPage = () => {
  return (
    <section className="bg-gradient-to-b from-white to-gray-50 py-32 px-4 md:px-6 relative">
      <div className="container mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl md:text-4xl font-bold mb-12 text-center text-gray-800"
        >
          Our Trusted Partners
        </motion.h2>

        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {clients.map((client, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 p-6 cursor-pointer"
              onClick={() => window.open(client.website, "_blank")}
            >
              <div className="flex flex-col items-center">
                <span className="text-sm text-gray-600 font-medium mb-2">
                  {client.label}
                </span>
                <div className="w-[160px] h-[100px] relative mb-4">
                  <Image
                    src={client.src}
                    alt={client.alt}
                    fill
                    className="object-contain"
                    priority={index < 3}
                    quality={85}
                  />
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  {client.alt}
                </h3>
                <p className="text-sm text-gray-600 text-center">
                  {client.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PartnersPage;
