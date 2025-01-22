"use client"

import { useRef, useEffect, useState } from "react"
import { motion, useScroll } from "framer-motion"
import { SafeAnimation } from "./safe-animation"

interface Section {
  domain: string
  title: string
  subtitle: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  animation: any
  bgColor: string
  attachmentUrl: string
}

interface SafeScrollProps {
  sections: Section[]
}

export function SafeScroll({ sections }: SafeScrollProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [currentIndex, setCurrentIndex] = useState(0)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  })

  useEffect(() => {
    const unsubscribe = scrollYProgress.onChange((latest) => {
      const newIndex = Math.floor(latest * sections.length)
      if (newIndex !== currentIndex && newIndex < sections.length) {
        setCurrentIndex(newIndex)
      }
    })

    return () => unsubscribe()
  }, [scrollYProgress, currentIndex, sections.length])

  return (
    <div ref={containerRef} className="relative">
      {sections.map((section, index) => (
        <div key={index} className="h-screen flex items-center justify-center sticky top-0">
          <motion.div
            className={`w-full h-full absolute inset-0 bg-gradient-to-br ${section.bgColor}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: currentIndex === index ? 1 : 0 }}
            transition={{ duration: 0.5 }}
          />
          <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between relative z-10">
            <div className="w-full md:w-1/2 mb-8 md:mb-0">
              <motion.div
                className="space-y-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{
                  opacity: currentIndex === index ? 1 : 0,
                  y: currentIndex === index ? 0 : 20,
                }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <span className="text-gray-600 text-lg font-semibold">{section.domain}</span>
                <h2 className="text-4xl md:text-5xl font-bold text-gray-800">{section.title}</h2>
                <p className="text-lg text-gray-600">{section.subtitle}</p>
                <a
                  href={section.attachmentUrl}
                  download
                  className="inline-block px-6 py-3 bg-gray-800 text-white rounded-full hover:bg-gray-700 transition-colors"
                >
                  Download Attachment
                </a>
              </motion.div>
            </div>
            <div className="w-full md:w-1/2">
              <SafeAnimation animation={section.animation} index={index} currentIndex={currentIndex} />
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

