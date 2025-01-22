"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function AboutHero() {
  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-pink-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div>
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-8"
            >
              <div className="space-y-4">
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="inline-block px-4 py-1 rounded-full bg-blue-100 text-blue-700 text-sm font-medium"
                >
                  About Us
                </motion.span>
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-4xl lg:text-6xl font-bold tracking-tight text-gray-900"
                >
                  GET TO KNOW US
                  <span className="text-blue-600 m-3 relative">
                    Who We Are
                    <motion.svg
                      width="120"
                      height="20"
                      viewBox="0 0 120 20"
                      fill="none"
                      className="absolute -bottom-2 left-0 w-full"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ delay: 0.5, duration: 0.8 }}
                    >
                      <path
                        d="M3 17C32.3385 7.45614 93.1615 -2.04386 117 17"
                        stroke="#FCD34D"
                        strokeWidth="4"
                        strokeLinecap="round"
                      />
                    </motion.svg>
                  </span>
                </motion.h1>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="text-xl text-gray-600 max-w-2xl"
                >
                  Palestine Technology for Youth and Jobs Project (TechStart) is
                  a project for the benefit of the Ministry of
                  Telecommunications and Digital Economy (MTDE), funded by the
                  World Bank, the European Union, the Swiss Agency for
                  Development and Cooperation, and the Government of the Kingdom
                  of Netherlands, and implemented by DAI.
                </motion.p>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="relative lg:h-[600px]"
            >
              <Image
                src="/images/About.png"
                alt="Tech illustration"
                width={1200}
                height={1600}
                className="object-contain"
                priority
              />
            </motion.div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="grid md:grid-cols-3 gap-8 pb-20"
        >
          <div className="bg-white rounded-2xl p-8 shadow-lg shadow-blue-100">
            <div className="size-12 rounded-lg bg-blue-100 flex items-center justify-center mb-6">
              <svg
                className="size-6 text-blue-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Innovation First</h3>
            <p className="text-gray-600">
              We&apos;re constantly pushing boundaries and exploring new
              technologies to solve complex challenges.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-lg shadow-blue-100">
            <div className="size-12 rounded-lg bg-blue-100 flex items-center justify-center mb-6">
              <svg
                className="size-6 text-blue-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Customer Focused</h3>
            <p className="text-gray-600">
              Our solutions are built with our customers&apos; needs at heart,
              ensuring maximum value and satisfaction.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-lg shadow-blue-100">
            <div className="size-12 rounded-lg bg-blue-100 flex items-center justify-center mb-6">
              <svg
                className="size-6 text-blue-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Global Impact</h3>
            <p className="text-gray-600">
              We&apos;re building solutions that make a difference worldwide,
              connecting people and technologies.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
