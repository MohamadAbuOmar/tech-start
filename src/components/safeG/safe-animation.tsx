"use client"

import dynamic from "next/dynamic"
import { motion, AnimatePresence } from "framer-motion"

// Dynamically import Lottie with ssr disabled
const Lottie = dynamic(() => import("lottie-react"), { ssr: false })

interface SafeAnimationProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  animation: any
  index: number
  currentIndex: number
}

const variants = {
  initial: (direction: number) => ({
    x: direction > 0 ? "100%" : "-100%",
    opacity: 0,
    scale: 0.8,
  }),
  animate: {
    x: 0,
    opacity: 1,
    scale: 1,
    transition: {
      x: { type: "spring", stiffness: 300, damping: 30 },
      opacity: { duration: 0.2 },
      scale: { duration: 0.2 },
    },
  },
  exit: (direction: number) => ({
    x: direction < 0 ? "100%" : "-100%",
    opacity: 0,
    scale: 0.8,
    transition: {
      x: { type: "spring", stiffness: 300, damping: 30 },
      opacity: { duration: 0.2 },
      scale: { duration: 0.2 },
    },
  }),
}

export function SafeAnimation({ animation, index, currentIndex }: SafeAnimationProps) {
  return (
    <AnimatePresence initial={false} custom={currentIndex}>
      {currentIndex === index && (
        <motion.div
          key={index}
          custom={currentIndex}
          variants={variants}
          initial="initial"
          animate="animate"
          exit="exit"
          className="w-full aspect-square max-w-md mx-auto"
        >
          <Lottie animationData={animation} loop={true} className="w-full h-full" />
        </motion.div>
      )}
    </AnimatePresence>
  )
}

