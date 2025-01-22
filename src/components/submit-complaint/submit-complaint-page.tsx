"use client"

import { motion } from "framer-motion"
import { Guidelines } from "./guidelines"
import { ComplaintForm } from "./complaint-form"

export default function SubmitComplaintPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-screen-2xl mx-auto"
      >
        <h1 className="text-4xl font-bold text-center text-blue-900 mb-8">Submit a Complaint</h1>
        <Guidelines />
        <ComplaintForm />
      </motion.div>
    </div>
  )
}

