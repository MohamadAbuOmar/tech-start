"use client";

import { motion } from "framer-motion";
import OurTeam from "../OurTeam/OurTeam";
import AboutHero from "./about-hero";
import { WhoWeAre } from "./who-we-are";
import FoucesArea from "../shared/Hero/FoucesArea";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
    },
  },
};

const sectionVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: "easeOut",
    },
  },
};

export default function AboutUsContent() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white text-gray-800">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <AboutHero />

        <motion.section variants={sectionVariants}>
          <WhoWeAre />
        </motion.section>

        <FoucesArea/>
        <motion.section variants={sectionVariants}>
          <OurTeam />
        </motion.section>
      </motion.div>
    </div>
  );
}
