"use client";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import ProgramCard from "./ProgramCard";
import { motion } from "framer-motion";

gsap.registerPlugin(ScrollTrigger);

const programsData = [
  {
    id: "card-1",
    backImage: "/Upskill.png",
    programName: "UpSkill Program",
    description:
      "Accelerate your career with cutting-edge tech skills. Join our comprehensive training program designed for ambitious developers.",
  },
  {
    id: "card-2",
    backImage: "/pioneer_img.jpg",
    programName: "Pioneer Program",
    description:
      "Lead the next wave of innovation. Our pioneer program empowers tech entrepreneurs with resources and expertise.",
  },
  {
    id: "card-3",
    backImage: "/Pro3.png",
    programName: "Accelerate Program",
    description:
      "Fast-track your startup's growth with our intensive acceleration program. Access mentorship, funding, and market opportunities.",
  },
];

export default function ProgramsSec() {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!container.current) return;

      const cards = container.current.querySelectorAll(".program-card");

      cards.forEach((card, index) => {
        gsap.fromTo(
          card,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top bottom-=100",
              end: "bottom top+=100",
              toggleActions: "play none none reverse",
            },
            delay: index * 0.2,
          }
        );
      });
    },
    { scope: container }
  );

  return (
    <div className="relative py-20 md:py-32 px-4 md:px-6 overflow-hidden bg-gradient-to-b from-white via-purple-50/30 to-blue-50/30">
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.03]"></div>
      <div className="absolute inset-0 bg-dot-pattern opacity-[0.03]"></div>

      <div className="relative max-w-7xl mx-auto" ref={container}>
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 bg-gradient-to-r from-[#1b316e] to-[#862996] bg-clip-text text-transparent">
            Explore Our Programs
          </h2>
          <div className="w-32 h-1.5 bg-gradient-to-r from-[#1b316e] to-[#862996] mx-auto rounded-full mb-16" />
        </motion.div>

        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3 px-4">
          {programsData.map((program) => (
            <div key={program.id} className="program-card">
              <ProgramCard
                id={program.id}
                backImage={program.backImage}
                programName={program.programName}
                description={program.description}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

