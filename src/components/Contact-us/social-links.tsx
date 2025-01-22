"use client"

import { motion } from "framer-motion"
import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react"

export function SocialLinks() {
  return (
    <div className="flex justify-center space-x-4">
      {[
        { icon: Facebook, label: "Facebook" },
        { icon: Instagram, label: "Instagram" },
        { icon: Linkedin, label: "LinkedIn" },
        { icon: Twitter, label: "Twitter" },
      ].map((social) => (
        <motion.a
          key={social.label}
          href="#"
          className="p-2 bg-gradient-to-r from-[#24386F] to-[#872996] text-white rounded-full hover:from-[#1c2d59] hover:to-[#6e217a] transition-all duration-300"
          aria-label={social.label}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <social.icon className="w-5 h-5" />
        </motion.a>
      ))}
    </div>
  )
}

