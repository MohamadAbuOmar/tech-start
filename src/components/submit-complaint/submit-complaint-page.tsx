"use client"

import { motion } from "framer-motion"
import { Guidelines } from "./guidelines"
import { ComplaintForm } from "./complaint-form"
import { useLanguage } from "@/context/LanguageContext"

interface Guideline {
  id: string;
  title: string;
  description: string;
}

interface SubmitComplaintPageProps {
  guidelines: Guideline[];
}

export default function SubmitComplaintPage({ guidelines }: SubmitComplaintPageProps) {
  const { language } = useLanguage();
  const pageTitle = language === 'en' ? 'Submit a Complaint' : 'تقديم شكوى';

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-screen-2xl mx-auto"
      >
        <h1 className="text-4xl font-bold text-center text-blue-900 mb-8">{pageTitle}</h1>
        <Guidelines guidelines={guidelines} />
        <ComplaintForm />
      </motion.div>
    </div>
  )
}

