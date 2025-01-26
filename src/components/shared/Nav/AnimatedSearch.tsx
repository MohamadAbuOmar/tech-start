"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/context/LanguageContext";

const AnimatedSearch = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const { language, isRTL } = useLanguage();

  const toggleSearch = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <motion.div
      className="relative flex items-center"
      initial={false}
      animate={isExpanded ? "expanded" : "collapsed"}
    >
      <motion.input
        type="text"
        placeholder={language === 'en' ? 'Search here...' : 'ابحث هنا...'}
        className="bg-white text-zinc-600 font-mono ring-1 ring-zinc-400 focus:ring-2 focus:ring-zinc-400 outline-none duration-300 placeholder:text-zinc-600 placeholder:opacity-50 rounded-full px-4 py-2 shadow-md focus:shadow-lg focus:shadow-zinc-400"
        variants={{
          expanded: { width: "200px", padding: "8px 40px 8px 16px" },
          collapsed: { width: "40px", padding: "8px" }
        }}
        transition={{ duration: 0.3 }}
      />
      <motion.button
        className={`absolute ${isRTL ? 'left-2' : 'right-2'} bg-white rounded-full p-2`}
        onClick={toggleSearch}
        variants={{
          expanded: { right: "4px" },
          collapsed: { right: "0px" }
        }}
        transition={{ duration: 0.3 }}
      >
        <Search className={cn('w-full h-full text-black', 
            isExpanded ? 'w-4 h-4' : 'w-full h-full'
        )} />
      </motion.button>
    </motion.div>
  );
};

export default AnimatedSearch;

