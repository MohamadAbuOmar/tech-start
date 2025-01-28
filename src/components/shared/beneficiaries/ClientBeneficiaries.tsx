"use client";

import { useLanguage } from "@/context/LanguageContext";
import { LocalizedBeneficiary } from "@/app/actions/pages/beneficiaries";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

interface BeneficiariesProps {
  beneficiaries: LocalizedBeneficiary[];
}

export default function ClientBeneficiaries({ beneficiaries }: BeneficiariesProps) {
  const { isRTL } = useLanguage();

  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 ${isRTL ? 'rtl' : 'ltr'}`}>
      {beneficiaries.map((beneficiary) => (
        <motion.div
          key={beneficiary.id}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-card rounded-lg shadow-md overflow-hidden border border-border"
          dir={isRTL ? 'rtl' : 'ltr'}
        >
          <div className="relative h-48">
            <Image
              src={beneficiary.imageUrl}
              alt={beneficiary.title}
              fill
              className="object-cover"
              priority
            />
          </div>
          <div className="p-6">
            <h3 className={`text-xl font-bold mb-2 text-foreground ${isRTL ? 'text-right' : 'text-left'}`}>{beneficiary.title}</h3>
            <p className={`text-muted-foreground mb-4 ${isRTL ? 'text-right' : 'text-left'}`}>{beneficiary.description}</p>
            <div className={`${isRTL ? 'text-right' : 'text-left'}`}>
              <Link
                href={beneficiary.ctaLink}
                className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
              >
                {beneficiary.ctaText}
              </Link>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
