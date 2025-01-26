'use client'

import { motion } from 'framer-motion'
import { useLanguage } from "@/context/LanguageContext";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6
    }
  }
}

interface WhoWeAreProps {
  whoWeAreData: {
    id: string;
    title: string;
    description: string;
  }[];
}

export function WhoWeAre({ whoWeAreData }: WhoWeAreProps) {
  const { isRTL } = useLanguage();
  
  // Use language context for dynamic layout
  const containerClasses = `bg-white py-24 ${isRTL ? 'rtl' : 'ltr'}`;
  return (
    <div className={containerClasses}>
      <motion.div
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div className="text-center mb-16" variants={itemVariants}>
        </motion.div>

        <motion.div className="grid lg:grid-cols-3 gap-16 lg:gap-24">
          {whoWeAreData.map((section, index) => (
            <motion.div key={section.id} variants={itemVariants} className="relative">
              <div className="flex items-start gap-6">
                <span className="text-[120px] font-bold leading-none text-gray-100">{index + 1}</span>
                <div className="pt-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">{section.title}</h3>
                  <p className="text-gray-600">{section.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  )
}

