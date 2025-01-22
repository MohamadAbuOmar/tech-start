'use client'

import { motion } from 'framer-motion'

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

export function WhoWeAre() {
  return (
    <div className="bg-white py-24">
      <motion.div
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div className="text-center mb-16" variants={itemVariants}>
        </motion.div>

        <motion.div className="grid lg:grid-cols-3 gap-16 lg:gap-24">
          <motion.div variants={itemVariants} className="relative">
            <div className="flex items-start gap-6">
              <span className="text-[120px] font-bold leading-none text-gray-100">1</span>
              <div className="pt-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Project Scale & Scope</h3>
                <p className="text-gray-600">
                  TechStart is an 8-Year, US$30 million project that aims to increase economic opportunities for IT service firms in the West Bank and Gaza through four major focus areas which seek to improve IT services capabilities, develop the IT service ecosystem, improve market access, and increase demand and investments in the Palestinian IT sector.
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="relative">
            <div className="flex items-start gap-6">
              <span className="text-[120px] font-bold leading-none text-gray-100">2</span>
              <div className="pt-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Focus Areas</h3>
                <p className="text-gray-600">
                  Our project focuses on four key areas: improving IT services capabilities, developing a robust IT service ecosystem, enhancing market access opportunities, and driving increased demand and investments in the Palestinian IT sector. Each area is strategically designed to contribute to the overall growth of the industry.
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="relative">
            <div className="flex items-start gap-6">
              <span className="text-[120px] font-bold leading-none text-gray-100">3</span>
              <div className="pt-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Development Goals</h3>
                <p className="text-gray-600">
                  The project aligns with the World Bank&apos;s and development partners&apos; objective to address market failures in the digital economy ecosystem. This includes tackling constraints in human capital, financing, product markets, enabling policies, institutional support, connectivity, and overall sector competitiveness.
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  )
}

