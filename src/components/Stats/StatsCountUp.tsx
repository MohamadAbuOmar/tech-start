"use client";

import { useCountUp } from "@/lib/useCountUp";
import { motion } from "framer-motion";
import { Building, Briefcase, Building2, DollarSign } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { LocalizedStat } from "@/app/actions/pages/stats";

const getIconByType = (type: string) => {
  switch (type) {
    case 'firms':
      return Building;
    case 'jobs':
      return Briefcase;
    case 'new_firms':
      return Building2;
    case 'grants':
      return DollarSign;
    default:
      return Building;
  }
};

interface StatsCountUpProps {
  stats: LocalizedStat[];
}

export default function StatsCountUp({ stats }: StatsCountUpProps) {
  const { language, isRTL } = useLanguage();
  return (
    <section className="bg-gradient-to-b from-white to-gray-50 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:max-w-none">
          <div className="text-center">
            <h2 className={`text-3xl font-bold tracking-tight bg-gradient-to-r from-[#1b316e] to-[#862996] bg-clip-text text-transparent sm:text-4xl ${isRTL ? 'text-right' : 'text-left'}`}>
              {language === 'en' ? 'TechStart in numbers' : 'تك ستارت بالأرقام'}
            </h2>
            <div className="w-32 h-1.5 bg-gradient-to-r from-[#1b316e] to-[#862996] mx-auto rounded-full mt-4 mb-8" />
            <p className={`mt-4 text-lg leading-8 text-[#142451] ${isRTL ? 'text-right' : 'text-left'}`}>
              {language === 'en' 
                ? 'Discover the scale of our global tech initiatives'
                : 'اكتشف حجم مبادراتنا التقنية العالمية'}
            </p>
          </div>
          <dl className={`mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4 ${isRTL ? 'rtl' : 'ltr'}`}>
            {stats.map((stat) => (
              <Stat 
                key={stat.id} 
                name={stat.name}
                value={stat.value}
                icon={getIconByType(stat.type)}
              />
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}

function Stat({
  name,
  value,
  icon: Icon,
}: {
  name: string;
  value: number;
  icon: React.ElementType;
}) {
  const { count, ref, controls } = useCountUp(value);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={controls}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`relative flex flex-col h-[200px] rounded-2xl bg-white px-6 py-8 shadow-lg transition-all hover:shadow-xl ${isRTL ? 'rtl' : 'ltr'}`}
    >
      <dt className={`flex items-center gap-3 text-lg font-semibold leading-7 text-[#142451] ${isRTL ? 'flex-row-reverse' : ''}`}>
        <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-gray-50">
          <Icon className="h-6 w-6 text-[#862996]" />
        </div>
        {name}
      </dt>
      <dd className="mt-auto">
        <div className={`flex items-baseline ${isRTL ? 'flex-row-reverse' : ''}`}>
          <p className="text-4xl font-bold tracking-tight text-[#142451]">
            {count.toLocaleString(language === 'en' ? 'en-US' : 'ar-SA')}
          </p>
          <p className={`${isRTL ? 'ml-2' : 'mr-2'} text-sm font-medium text-[#862996]`}>
            {language === 'en' ? 'total' : 'المجموع'}
          </p>
        </div>
        <div className="mt-4 h-1.5 w-full bg-gray-200 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-[#4169E1] to-[#000080]"
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ duration: 2, ease: "easeOut" }}
          />
        </div>
      </dd>
    </motion.div>
  );
}
