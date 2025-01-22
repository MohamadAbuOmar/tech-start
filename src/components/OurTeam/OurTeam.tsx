/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, Pause, Play } from "lucide-react";

const OurTeam = () => {
  const team = [
    {
      quote:
        "The attention to detail and innovative features have completely transformed our workflow. This is exactly what we've been looking for.",
      name: "Farah Said",
      designation: "Communication Specialist",
      src: "https://www.techstart.ps//public/files/Final/_MG_1215.jpg",
    },
    {
      quote:
        "Implementation was seamless and the results exceeded our expectations. The platform's flexibility is remarkable.",
      name: "Ali Gharabeh",
      designation: "Monitoring and Evaluation Specialist",
      src: "https://www.techstart.ps//public/files/image/WhatsApp%20Image%202023-09-10%20at%202.05.20%20PM.jpeg",
    },
    {
      quote:
        "This solution has significantly improved our team's productivity. The intuitive interface makes complex tasks simple.",
      name: "Mira Stephan",
      designation: "Environmental and Social Officer",
      src: "https://www.techstart.ps//public/files/mira%20modified%20.jpeg",
    },
    {
      quote:
        "Outstanding support and robust features. It's rare to find a product that delivers on all its promises.",
      name: "Hasan AlAref",
      designation: "IT Service Capabilities Program Manager",
      src: "https://www.techstart.ps//public/files/Hasan.jpg",
    },
    {
      quote:
        "The scalability and performance have been game-changing for our organization. Highly recommend to any growing business.",
      name: "Leen El-Far",
      designation: "Technical and Grants Support Officer",
      src: "https://www.techstart.ps//public/files/leen%20website.jpg",
    },
    {
      quote:
        "The scalability and performance have been game-changing for our organization. Highly recommend to any growing business.",
      name: "Abdallah Abu Ajamieh",
      designation: "Project Development Consultant",
      src: "https://www.techstart.ps//public/files/image/1649195454890-_2_.png",
    },
  ];

  const [currentPage, setCurrentPage] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const itemsPerPage = 3;
  const totalPages = Math.ceil(team.length / itemsPerPage);

  useEffect(() => {
    if (!isAutoPlay) return;
    const timer = setInterval(() => handleNext(), 6000);
    return () => clearInterval(timer);
  }, [currentPage, isAutoPlay]);

  const handleNext = () => {
    setCurrentPage((prev) => (prev + 1) % totalPages);
  };

  const handlePrev = () => {
    setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages);
  };

  const containerVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (index: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.645, 0.045, 0.355, 1],
        delay: index * 0.1,
      },
    }),
    hover: {
      y: -10,
      transition: {
        duration: 0.3,
        ease: "easeOut",
      },
    },
  };

  return (
    <div className="relative overflow-hidden py-24 min-h-screen flex items-center bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(120,119,198,0.3),rgba(255,255,255,0))]" />
        <div className="absolute -top-32 -left-32 w-[30rem] h-[30rem] animate-wave-slow">
          <div className="absolute w-full h-full bg-gradient-to-br from-purple-500/40 via-pink-500/40 to-transparent rounded-[100%] blur-[64px]" />
        </div>
        <div className="absolute -bottom-32 -right-32 w-[30rem] h-[30rem] animate-wave-slow-reverse">
          <div className="absolute w-full h-full bg-gradient-to-tl from-blue-500/40 via-cyan-500/40 to-transparent rounded-[100%] blur-[64px]" />
        </div>
      </div>

      <div className="relative container mx-auto px-4">
        <motion.div
          className="text-center space-y-4 mb-20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-5xl md:text-6xl font-bold tracking-tight bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
            Meet Our Amazing Team
          </h2>
          <div className="w-32 h-1.5 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 mx-auto rounded-full" />
          <p className="mt-6 text-xl leading-8 text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Discover the talented individuals behind our success, bringing
            innovation and expertise to every project.
          </p>
        </motion.div>

        <div className="relative z-10 max-w-7xl mx-auto">
          <AnimatePresence mode="wait" custom={currentPage}>
            <motion.div
              key={currentPage}
              custom={currentPage}
              variants={containerVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 },
              }}
              className="grid grid-cols-1 md:grid-cols-3 gap-8 px-4"
            >
              {team
                .slice(
                  currentPage * itemsPerPage,
                  (currentPage + 1) * itemsPerPage
                )
                .map((member, index) => (
                  <motion.div
                    key={member.name}
                    variants={cardVariants}
                    initial="hidden"
                    animate="visible"
                    whileHover="hover"
                    custom={index}
                    className="group perspective"
                  >
                    <div className="relative bg-white dark:bg-gray-800 rounded-2xl p-6 h-full transform-gpu transition-all duration-500 ease-out shadow-lg hover:shadow-2xl dark:shadow-purple-500/20">
                      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-transparent to-blue-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      <div className="relative z-10">
                        <div className="aspect-[4/5] overflow-hidden rounded-xl mb-6">
                          <motion.img
                            src={member.src}
                            alt={member.name}
                            className="w-full h-full object-cover"
                            whileHover={{ scale: 1.05 }}
                            transition={{ duration: 0.4 }}
                          />
                        </div>
                        <motion.div
                          className="space-y-4"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.2 }}
                        >
                          <h3 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                            {member.name}
                          </h3>
                          <p className="text-sm font-medium text-purple-500/80 dark:text-purple-400/80">
                            {member.designation}
                          </p>
                          <p className="text-gray-600 dark:text-gray-300 line-clamp-3 group-hover:line-clamp-none transition-all duration-300">
                            {member.quote}
                          </p>
                        </motion.div>
                      </div>
                    </div>
                  </motion.div>
                ))}
            </motion.div>
          </AnimatePresence>

          <motion.div
            className="flex justify-center items-center gap-6 mt-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <button
              onClick={handlePrev}
              className="p-3 rounded-full bg-white/80 dark:bg-gray-800/80 backdrop-blur shadow-lg hover:shadow-xl border border-purple-500/20 hover:border-purple-500 transition-all duration-300 group"
            >
              <ArrowLeft className="w-6 h-6 text-purple-600 dark:text-purple-400 group-hover:scale-110 transition-transform duration-300" />
            </button>

            <div className="flex gap-3 items-center">
              {Array.from({ length: totalPages }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i)}
                  aria-label={`Go to slide ${i + 1}`}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    currentPage === i
                      ? "bg-purple-500 scale-125"
                      : "bg-purple-300/30 hover:bg-purple-400"
                  }`}
                />
              ))}
            </div>

            <button
              onClick={handleNext}
              className="p-3 rounded-full bg-white/80 dark:bg-gray-800/80 backdrop-blur shadow-lg hover:shadow-xl border border-purple-500/20 hover:border-purple-500 transition-all duration-300 group"
            >
              <ArrowRight className="w-6 h-6 text-purple-600 dark:text-purple-400 group-hover:scale-110 transition-transform duration-300" />
            </button>

            <button
              onClick={() => setIsAutoPlay(!isAutoPlay)}
              className="p-3 rounded-full bg-white/80 dark:bg-gray-800/80 backdrop-blur shadow-lg hover:shadow-xl border border-purple-500/20 hover:border-purple-500 transition-all duration-300 group"
            >
              {isAutoPlay ? (
                <Pause className="w-6 h-6 text-purple-600 dark:text-purple-400 group-hover:scale-110 transition-transform duration-300" />
              ) : (
                <Play className="w-6 h-6 text-purple-600 dark:text-purple-400 group-hover:scale-110 transition-transform duration-300" />
              )}
            </button>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default OurTeam;
