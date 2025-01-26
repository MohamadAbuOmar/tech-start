"use client";

import { motion } from "framer-motion";
import OurTeam from "../OurTeam/OurTeam";
import AboutHero from "./about-hero";
import { WhoWeAre } from "./who-we-are";
import FoucesArea from "../shared/Hero/FoucesArea";
import { LocalizedAboutUs } from "@/app/actions/pages/about-us";
import { LocalizedTeamMember } from "@/app/actions/pages/team-actions";
import { LocalizedFocusArea } from "@/app/actions/pages/focus-area";

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

interface AboutUsContentProps {
  aboutData: LocalizedAboutUs;
  teamData: LocalizedTeamMember[];
  focusAreasData: LocalizedFocusArea[];
}

export default function AboutUsContent({ aboutData, teamData, focusAreasData }: AboutUsContentProps) {
  // Early return with a message if all data is empty
  if (!aboutData.title && !teamData.length && !focusAreasData.length) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-purple-50 to-white text-gray-800">
        <p className="text-xl text-gray-600">Content is being updated. Please check back later.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white text-gray-800">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <AboutHero aboutData={aboutData} />

        <motion.section variants={sectionVariants}>
          <WhoWeAre whoWeAreData={aboutData.whoWeAre} />
        </motion.section>

        <FoucesArea focusAreasData={focusAreasData} />
        <motion.section variants={sectionVariants}>
          <OurTeam teamData={teamData} />
        </motion.section>
      </motion.div>
    </div>
  );
}
