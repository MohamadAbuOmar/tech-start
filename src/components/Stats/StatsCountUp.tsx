"use client";

import { useCountUp } from "@/lib/useCountUp";
import { motion } from "framer-motion";
import { Building, Briefcase, Building2, DollarSign } from "lucide-react";

const stats = [
  { name: "Local firms benefiting", value: 50, icon: Building },
  { name: "New IT jobs created", value: 100000, icon: Briefcase },
  { name: "New firms established", value: 5000, icon: Building2 },
  { name: "Total awarded grants amounts", value: 30, icon: DollarSign },
];

export default function StatsCountUp() {
  return (
    <section className="bg-gradient-to-b from-white to-gray-50 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:max-w-none">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-[#1b316e] to-[#862996] bg-clip-text text-transparent sm:text-4xl">
              TechStart in numbers
            </h2>
            <div className="w-32 h-1.5 bg-gradient-to-r from-[#1b316e] to-[#862996] mx-auto rounded-full mt-4 mb-8" />
            <p className="mt-4 text-lg leading-8 text-[#142451]">
              Discover the scale of our global tech initiatives
            </p>
          </div>
          <dl className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat) => (
              <Stat key={stat.name} {...stat} />
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
      className="relative flex flex-col h-[200px] rounded-2xl bg-white px-6 py-8 shadow-lg transition-all hover:shadow-xl"
    >
      <dt className="flex items-center gap-3 text-lg font-semibold leading-7 text-[#142451]">
        <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-gray-50">
          <Icon className="h-6 w-6 text-[#862996]" />
        </div>
        {name}
      </dt>
      <dd className="mt-auto">
        <div className="flex items-baseline">
          <p className="text-4xl font-bold tracking-tight text-[#142451]">
            {count.toLocaleString("en-US")}
          </p>
          <p className="ml-2 text-sm font-medium text-[#862996]">total</p>
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
