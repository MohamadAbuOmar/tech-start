"use client";

import { useState } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/context/LanguageContext";

interface FAQ {
  id: string;
  question: string;
  answer: string;
  order: number;
}

interface Category {
  id: string;
  name: string;
  slug: string;
  order: number;
  faqs: FAQ[];
}

interface FAQSectionClientProps {
  categories: Category[];
}

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 10,
    },
  },
};

export function FAQSectionClient({ categories }: FAQSectionClientProps) {
  const { language, isRTL } = useLanguage();
  const [activeCategory, setActiveCategory] = useState<string>(categories[0]?.id || "");
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  
  const activeCategoryData = categories.find(cat => cat.id === activeCategory);

  return (
    <div className={`min-h-[90vh] bg-white text-gray-900 py-20 px-4 ${isRTL ? 'rtl' : 'ltr'}`}>
      <div className="max-w-4xl mx-auto">
        <motion.p
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-purple-600 text-center mb-4"
        >
          {language === 'en' ? "Let's answer some questions" : "دعنا نجيب على بعض الأسئلة"}
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-5xl font-bold text-center mb-12"
        >
          {language === 'en' ? "FAQs" : "الأسئلة الشائعة"}
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {categories.map((category) => (
            <motion.button
              key={category.id}
              onClick={() => {
                setActiveCategory(category.id);
                setActiveIndex(null);
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={cn(
                "px-6 py-2 rounded-md text-sm font-medium transition-all duration-300",
                activeCategory === category.id
                  ? "bg-purple-600 text-white shadow-lg"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              )}
            >
              <span>{category.name}</span>
            </motion.button>
          ))}
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="space-y-4"
          >
            {activeCategoryData?.faqs.map((faq: FAQ, index: number) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="rounded-xl overflow-hidden shadow-md"
              >
                <motion.button
                  onClick={() =>
                    setActiveIndex(activeIndex === index ? null : index)
                  }
                  className="w-full px-6 py-4 flex items-center justify-between text-left bg-gray-50 hover:bg-gray-100 transition-colors duration-300"
                  whileHover={{ backgroundColor: "rgba(243, 244, 246, 1)" }}
                  aria-expanded={activeIndex === index}
                  aria-controls={`faq-answer-${index}`}
                >
                  <span className="text-lg text-gray-800 font-medium">
                    {faq.question}
                  </span>
                  <motion.div
                    animate={{ rotate: activeIndex === index ? 45 : 0 }}
                    transition={{ duration: 0.3, ease: "backInOut" }}
                  >
                    <Plus className="w-5 h-5 text-purple-600" />
                  </motion.div>
                </motion.button>
                <AnimatePresence>
                  {activeIndex === index && (
                    <motion.div
                      id={`faq-answer-${index}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.5, ease: "easeInOut" }}
                    >
                      <div className="px-6 py-4 bg-white space-y-4">
                        <p className="text-gray-600">{faq.answer}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
