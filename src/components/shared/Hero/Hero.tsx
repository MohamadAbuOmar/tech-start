"use client";

import { motion, AnimatePresence, useAnimation } from "framer-motion";
import Lottie from "lottie-react";
import { useState, useEffect, useRef, useCallback } from "react";
import { RainbowButton } from "../../ui/rainbow-button";
import { Navbar } from "../Nav/Navbar";
import innovationSvg from "../../../../public/svg/Innovation Hub.json";
import growthSvg from "../../../../public/svg/Market Growth.json";
import developmentSvg from "../../../../public/svg/Talent Development .json";
import infrastructureSvg from "../../../../public/svg/IT Infrastructure .json";
import AnimatedNetworkBackground from "../Nav/AnimatedBackground";

const steps = [
  {
    title: "Innovation Hub",
    tagline: "Future-Ready Solutions",
    description:
      "Revolutionizing business through cutting-edge technology solutions and creative approaches. We help you stay ahead of the curve.",
    color: "#91268f",
    animation: innovationSvg,
  },
  {
    title: "Market Growth",
    tagline: "Expand Your Reach",
    description:
      "Expanding your market reach and driving sustainable business growth strategies. We help you conquer new territories and increase your market share.",
    color: "#1b75bb",
    animation: growthSvg,
  },
  {
    title: "Talent Development",
    tagline: "Empower Your Team",
    description:
      "Nurturing skills and empowering teams to achieve their highest potential. We help you build a workforce ready for the challenges of tomorrow.",
    color: "#1c225b",
    animation: developmentSvg,
  },
  {
    title: "IT Infrastructure",
    tagline: "Solid Foundations",
    description:
      "Building robust and scalable technology foundations for your success. We ensure your IT backbone is strong, secure, and future-proof.",
    color: "#7fafcb",
    animation: infrastructureSvg,
  },
];

const STEP_DURATION = 5000;

const Hero = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [key, setKey] = useState(0);
  const controls = useAnimation();
  const progressControls = useAnimation();
  const containerRef = useRef<HTMLDivElement>(null);

  const nextStep = useCallback(() => {
    setCurrentStep((prev) => (prev + 1) % steps.length);
    setKey((prev) => prev + 1);
  }, []);

  useEffect(() => {
    const interval = setInterval(nextStep, STEP_DURATION);
    return () => clearInterval(interval);
  }, [nextStep]);

  useEffect(() => {
    controls.start({
      backgroundColor: `${steps[currentStep].color}10`,
      transition: { duration: 0.5, ease: "easeInOut" },
    });

    progressControls.set({ width: "0%" });
    progressControls.start({
      width: "100%",
      transition: { duration: STEP_DURATION / 1000, ease: "linear" },
    });
  }, [currentStep, controls, progressControls]);

  const handleTabClick = (index: number) => {
    setCurrentStep(index);
    setKey((prev) => prev + 1);
  };

  const gradientStyle = {
    backgroundImage: `
      radial-gradient(circle at 50% -100px, ${steps[currentStep].color}10, transparent 400px),
      radial-gradient(circle at 100% 50%, ${steps[(currentStep + 1) % steps.length].color}05, transparent 400px),
      radial-gradient(circle at 0% 100%, ${steps[(currentStep + 2) % steps.length].color}05, transparent 400px)
    `,
  };

  return (
    <motion.div
      ref={containerRef}
      className="relative min-h-screen overflow-hidden transition-all duration-500 ease-in-out"
      animate={{
        backgroundColor: `${steps[currentStep].color}05`,
        transition: { duration: 0.5, ease: "easeInOut" },
      }}
      style={gradientStyle}
    >
      <AnimatedNetworkBackground color={steps[currentStep].color} />
      <Navbar />
      <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center min-h-[calc(100vh-80px)] py-20">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="space-y-8"
            >
              <div className="space-y-4">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                  className="inline-block"
                >
                  <span
                    className="inline-flex items-center px-4 py-1.5 rounded-full text-sm font-medium"
                    style={{
                      backgroundColor: `${steps[currentStep].color}20`,
                      color: '#862996',
                    }}
                  >
                    {steps[currentStep].tagline}
                  </span>
                </motion.div>
                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight">
                  <motion.span
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.6 }}
                    className="block bg-clip-text text-transparent"
                    style={{
                      backgroundImage: `linear-gradient(135deg, ${steps[currentStep].color}, ${steps[(currentStep + 1) % steps.length].color})`,
                    }}
                  >
                    {steps[currentStep].title}
                  </motion.span>
                  <span className="block mt-2">Solutions</span>
                </h1>
              </div>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="text-lg sm:text-xl text-[#142451] leading-relaxed max-w-xl"
              >
                {steps[currentStep].description}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="flex flex-col sm:flex-row items-center gap-4 pt-4"
              >
                <RainbowButton
                  className="w-full sm:w-auto px-8 py-4 text-lg font-semibold shadow-lg shadow-current/20 hover:shadow-xl hover:shadow-current/30 transition-all duration-300"
                  style={{
                    backgroundColor: steps[currentStep].color,
                    color: "white",
                  }}
                >
                  Get Started Now
                </RainbowButton>
              </motion.div>
            </motion.div>
          </AnimatePresence>

          <motion.div className="space-y-10">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, scale: 0.95, rotateY: -15 }}
                animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                exit={{ opacity: 0, scale: 1.05, rotateY: 15 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="relative w-full h-[300px] sm:h-[350px] md:h-[400px] lg:h-[450px] xl:h-[500px] rounded-2xl bg-white/50 shadow-xl overflow-hidden backdrop-blur-sm"
                style={{ boxShadow: `0 0 40px ${steps[currentStep].color}30` }}
              >
                <Lottie
                  animationData={steps[currentStep].animation}
                  loop={true}
                  className="w-full h-full object-cover"
                />
                <div
                  className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent"
                  style={{
                    backgroundImage: `linear-gradient(to top, ${steps[currentStep].color}20, transparent)`,
                  }}
                />
              </motion.div>
            </AnimatePresence>

            <div className="space-y-6">
              <div className="flex flex-wrap md:flex-nowrap justify-center md:justify-between gap-4">
                {steps.map((step, index) => (
                  <motion.button
                    key={index}
                    className={`text-xs sm:text-sm font-medium px-4 sm:px-6 py-2 sm:py-3 rounded-full transition-all duration-300 flex-grow md:flex-grow-0 ${
                      index === currentStep
                        ? "text-white shadow-lg"
                        : "bg-white/50 hover:bg-white/80"
                    }`}
                    style={{
                      backgroundColor:
                        index === currentStep ? step.color : "transparent",
                      border: `2px solid ${step.color}`,
                      color: index === currentStep ? "white" : step.color,
                    }}
                    whileHover={{
                      scale: 1.05,
                      backgroundColor: step.color,
                    }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleTabClick(index)}
                  >
                    {step.title}
                  </motion.button>
                ))}
              </div>
              <motion.div
                className="h-2 bg-gray-200 rounded-full overflow-hidden"
              >
                <motion.div
                  key={key}
                  className="h-full"
                  style={{ backgroundColor: steps[currentStep].color }}
                  initial={{ width: "0%" }}
                  animate={progressControls}
                />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default Hero;

