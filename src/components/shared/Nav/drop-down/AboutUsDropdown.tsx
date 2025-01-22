"use client";

import React, { useState, useRef, Dispatch, SetStateAction } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

type Position = {
  left: number;
  width: number;
  opacity: number;
};

export const AboutUsDropdown = ({
  setPosition,
}: {
  setPosition: Dispatch<SetStateAction<Position>>;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeItem, setActiveItem] = useState<string | null>(null);
  const ref = useRef<null | HTMLLIElement>(null);

  const menuItems = [
    {
      id: "who-we-are",
      name: "Who we are",
      href: "/About-us",
    },
    {
      id: "partners",
      name: "Our Partners",
      hasSubLinks: false,
      href: "/partners",
    },
    {
      id: "Palestinian-IT-leads",
      name: "Palestinian IT leads",
      hasSubLinks: false,
      href: "/Palestinian-IT-leads",
    },
    {
      id: "work-with-us",
      name: "Work with us",
      href: "/work-with-us",
    },
  ];

  return (
    <li
      ref={ref}
      onMouseEnter={() => {
        if (!ref?.current) return;
        const { width } = ref.current.getBoundingClientRect();
        setPosition({
          left: ref.current.offsetLeft,
          width,
          opacity: 1,
        });
        setIsOpen(true);
      }}
      onMouseLeave={() => {
        setIsOpen(false);
        setActiveItem(null);
      }}
      className="relative z-10 block cursor-pointer px-3 py-1.5 text-base font-medium text-[#1b316e] transition-colors hover:text-white"
    >
      About Us
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 100, damping: 15 }}
            className="absolute left-0 mt-2 w-64 rounded-xl bg-white/90 backdrop-blur-md shadow-lg shadow-purple-500/20 border border-purple-100/20 overflow-hidden"
          >
            <div className="py-1">
              {menuItems.map((item) => (
                <div key={item.id}>
                  {item.hasSubLinks ? (
                    <>
                      <button
                        onClick={() =>
                          setActiveItem(activeItem === item.id ? null : item.id)
                        }
                        className="w-full text-left px-4 py-2.5 text-sm text-[#1b316e] hover:bg-gradient-to-r hover:from-purple-50 hover:to-blue-50 hover:text-[#1b316e] transition-all group flex items-center justify-between"
                      >
                        {item.name}
                        <motion.span
                          animate={{
                            rotate: activeItem === item.id ? 180 : 0,
                          }}
                          className="text-xs opacity-50 group-hover:opacity-100"
                        >
                          ▼
                        </motion.span>
                      </button>
                    </>
                  ) : (
                    <Link
                      href={item.href || "#"}
                      className="block px-4 py-2.5 text-sm text-[#1b316e] hover:bg-gradient-to-r hover:from-purple-50 hover:to-blue-50 hover:text-[#1b316e] transition-all"
                    >
                      {item.name}
                    </Link>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </li>
  );
};
