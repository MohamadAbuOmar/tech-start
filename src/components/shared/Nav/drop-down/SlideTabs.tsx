"use client";

import React, { useState, useRef, Dispatch, SetStateAction } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ProgramsDropdown } from "./ProgramsDropdown";
import { AboutUsDropdown } from "./AboutUsDropdown";
import { ContactUsDropdown } from "./ContactUsDropdown";
import { MediaCenterDropdown } from "./MediaCenterDropdown";

type Position = {
  left: number;
  width: number;
  opacity: number;
};

export const SlideTabs = () => {
  const [position, setPosition] = useState<Position>({
    left: 0,
    width: 0,
    opacity: 0,
  });

  return (
    <ul
      onMouseLeave={() => {
        setPosition((pv) => ({
          ...pv,
          opacity: 0,
        }));
      }}
      className="relative mx-auto flex w-fit rounded-full border border-gray-200/50 bg-white/80 p-1 backdrop-blur-md shadow-lg shadow-purple-500/5"
    >
      <AboutUsDropdown setPosition={setPosition} />
      <ProgramsDropdown setPosition={setPosition} />
      <MediaCenterDropdown setPosition={setPosition} />
      <Link href="/Safeguards">
        <Tab setPosition={setPosition}>Safeguards</Tab>
      </Link>
      <ContactUsDropdown setPosition={setPosition} />

      <Cursor position={position} />
    </ul>
  );
};

const Tab = ({
  children,
  setPosition,
}: {
  children: string;
  setPosition: Dispatch<SetStateAction<Position>>;
}) => {
  const ref = useRef<null | HTMLLIElement>(null);

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
      }}
      className="relative z-10 block cursor-pointer px-3 py-1.5 text-base font-medium text-[#1b316e] transition-colors hover:text-white"
    >
      {children}
    </li>
  );
};

const Cursor = ({ position }: { position: Position }) => {
  return (
    <motion.li
      animate={{
        ...position,
      }}
      className="absolute z-0 h-8 rounded-full bg-gradient-to-r from-[#142451] to-[#862996] bg-opacity-45"
    />
  );
};

