"use client";

import { motion } from "framer-motion";
import { useLoading } from "@/context/LoadingContext";

export const LogoAnimation = () => {
  const { isPreloaderComplete } = useLoading();

  const pathVariants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: (i: number) => ({
      pathLength: 1,
      opacity: 1,
      transition: {
        pathLength: { delay: i * 0.1, type: "spring", duration: 1.2, bounce: 0 },
        opacity: { delay: i * 0.1, duration: 0.01 }
      }
    })
  };

  if (!isPreloaderComplete) return null;

  return (
    <motion.svg
      width="150"
      height="75"
      viewBox="0 0 1080 656"
      xmlns="http://www.w3.org/2000/svg"
      initial="hidden"
      animate="visible"
    >
      <defs>
        <linearGradient id="g1" x2="1" gradientUnits="userSpaceOnUse" gradientTransform="matrix(181.162,0,0,239.735,312.809,213.574)">
          <stop offset="0" stopColor="#1e78c2"/>
          <stop offset="1" stopColor="#121a44"/>
        </linearGradient>
        <linearGradient id="g2" x2="1" gradientUnits="userSpaceOnUse" gradientTransform="matrix(217.985,0,0,248.017,517.914,217.623)">
          <stop offset="0" stopColor="#1e78c2"/>
          <stop offset="1" stopColor="#121a44"/>
        </linearGradient>
        <linearGradient id="g3" x2="1" gradientUnits="userSpaceOnUse" gradientTransform="matrix(198.627,0,0,243.152,795.003,213.574)">
          <stop offset="0" stopColor="#1e78c2"/>
          <stop offset="1" stopColor="#121a44"/>
        </linearGradient>
      </defs>
      {Object.entries(techPaths).map(([key, path], index) => (
        <motion.path
          key={`tech-${key}`}
          d={path}
          variants={pathVariants}
          initial="hidden"
          custom={index}
          strokeWidth="2"
          stroke={techStrokes[key]}
          fill="none"
          animate="visible"
          onAnimationComplete={(definition) => {
            if (definition === "visible") {
              const element = document.querySelector(`path[d="${path}"]`);
              if (element) {
                element.setAttribute("fill", techStrokes[key]);
                element.setAttribute("stroke", "none");
              }
            }
          }}
        />
      ))}
      
      {Object.entries(startPaths).map(([key, path], index) => (
        <motion.path
          key={`start-${key}`}
          d={path}
          variants={pathVariants}
          initial="hidden"
          custom={index + Object.keys(techPaths).length} 
          strokeWidth="2"
          stroke={startStrokes[key as keyof typeof startStrokes]}
          fill="none"
          animate="visible"
          onAnimationComplete={(definition) => {
            if (definition === "visible") {
              const element = document.querySelector(`path[d="${path}"]`);
              if (element) {
                element.setAttribute("fill", startStrokes[key as keyof typeof startStrokes]);
                element.setAttribute("stroke", "none");
              }
            }
          }}
        />
      ))}
    </motion.svg>
  );
};

const techPaths: { [key: string]: string } = {
  T: "M254.2 96.1H96.6c-10.9 0-19.3 8.8-19.3 19.3 0 10.5 8.4 19.4 19.3 19.4h57.6v198.9c5.9-4.3 13.2-6.8 21-6.8 7.9 0 15.1 2.5 21.1 6.8V134.8h57.9c10.5 0 19-8.9 19-19.4 0-10.5-8.5-19.3-19-19.3z",
  E: "M334 93.7c-11.9 0-21.2 9.3-21.2 21.2v197.3c0 12 9.3 21.2 21.2 21.2h141.1c10.3 0 18.9-8.2 18.9-18.8 0-10.3-8.6-18.8-18.9-18.8h-120.2v-64.4h103.1c10.3 0 18.8-8.2 18.8-18.5 0-10.6-8.5-19.2-18.8-19.2h-103.1v-62.3h118.5c10.3 0 18.9-8.2 18.9-18.8 0-10.3-8.6-18.9-18.9-18.9z",
  C: "M637.9 93.7c-72.6 2.1-121.9 59.4-119.9 127.6v0.6c2 68.8 55.7 121.7 125.5 119.7 38.7-1.2 64-14.2 86-34.8 3.7-3.5 6.6-8.7 6.4-15.2-0.3-10.6-9.8-19.3-20.4-19-5.2 0.2-9.6 2.4-12.6 5.2-17 15.2-33.9 24-59.2 24.7-45.9 1.4-80.2-35.7-81.6-82.6v-0.6c-1.4-46.9 31.1-85.6 76.6-86.9 22.9-0.7 41 7 57.8 19.9 2.8 1.9 7 3.9 12.8 3.7 11.6-0.3 20.6-9.5 20.3-21.2-0.3-7.5-4.2-13.2-8.8-16.5-20.3-14.7-43.5-24.7-77.6-24.7q-2.6 0-5.3 0.1z",
  H: "M951.5 112.9v80.5h-114.4v-80.5c0-11.7-9.2-20.9-20.9-20.9-11.9 0-21.2 9.2-21.2 20.9v201.4c0 11.6 9.3 20.8 21.2 20.8 11.7 0 20.9-9.2 20.9-20.8v-81.9h114.4v81.9c0 11.6 9.3 20.8 20.9 20.8 12 0 21.2-9.2 21.2-20.8v-201.4c0-11.7-9.2-20.9-21.2-20.9-11.6 0-20.9 9.2-20.9 20.9z",
};

const startPaths = {
  S: "M314 556.6c-4.3-3.1-7.3-8.3-7.3-14.5 0-9.8 8-17.5 17.8-17.5 5.2 0 8.6 1.5 11.1 3.3 17.9 14.2 37 22.2 60.4 22.2 23.4 0 38.1-11.1 38.1-27.1v-0.6c0-15.4-8.6-23.7-48.6-32.9-45.9-11.1-71.8-24.7-71.8-64.4v-0.6c0-37 30.8-62.5 73.6-62.5 27.1 0 49 7 68.4 20 4.3 2.4 8.3 7.7 8.3 15.1 0 9.8-8 17.5-17.8 17.5-3.7 0-6.8-0.9-9.9-2.7-16.6-10.8-32.6-16.4-49.6-16.4-22.2 0-35.1 11.4-35.1 25.6v0.6c0 16.6 9.9 24 51.4 33.9 45.6 11.1 69 27.4 69 63.1v0.6c0 40.4-31.7 64.4-77 64.4-29.2 0-56.9-9.2-81-27.1z",
  T: "M518.5 535.6v-85.6h-6.1c-8.9 0-16-7-16-16 0-8.9 7.1-16 16-16h6.1v-27.7c0-10.2 8.4-18.5 18.8-18.5 10.2 0 18.5 8.3 18.5 18.5v27.7h29.3c8.9 0 16.3 7.1 16.3 16 0 9-7.4 16-16.3 16h-29.3v79.8c0 14.5 7.4 20.3 20 20.3 4.3 0 8-0.9 9.3-0.9 8.3 0 15.7 6.8 15.7 15.4 0 6.8-4.7 12.3-9.9 14.5-8 2.7-15.7 4.3-25.5 4.3-27.5 0-46.9-12-46.9-47.8z",
  A: "M626.8 533.8v-0.6c0-35.1 27.4-52.4 67.1-52.4 18.2 0 31.1 2.8 43.7 6.8v-4c0-23.1-14.2-35.4-40.3-35.4-14.2 0-25.9 2.5-36.1 6.5-2.1 0.6-4 0.9-5.8 0.9-8.6 0-15.7-6.8-15.7-15.4 0-6.8 4.6-12.6 10.1-14.8 15.4-5.8 31.2-9.5 52.4-9.5 24.3 0 42.5 6.4 53.9 18.1 12 11.7 17.5 29 17.5 50.2v80.1c0 10.2-8 17.9-18.1 17.9-10.8 0-18.2-7.4-18.2-15.8v-6.1c-11.1 13.2-28 23.7-53 23.7-30.4 0-57.5-17.6-57.5-50.2zm111.4-11.7v-11.1c-9.5-3.7-22.1-6.5-36.9-6.5-24 0-38.2 10.2-38.2 27.1v0.7c0 15.7 13.8 24.6 31.7 24.6 24.6 0 43.4-14.2 43.4-34.8z",
  R: "M818.3 435c0-10.5 8-18.8 18.5-18.8 10.5 0 18.8 8.3 18.8 18.8v16.6c8.6-20.3 24.6-35.7 40.9-35.7 11.7 0 18.5 7.7 18.5 18.4 0 9.9-6.5 16.4-14.8 17.9-26.4 4.6-44.6 24.9-44.6 63.4v48.1c0 10.1-8.3 18.4-18.8 18.4-10.2 0-18.5-8-18.5-18.4z",
  T2: "M953.2 535.7v-85.6h-6.2c-8.9 0-16-7.1-16-16.1 0-8.9 7.1-16 16-16h6.2v-27.7c0-10.1 8.3-18.5 18.8-18.5 10.2 0 18.5 8.4 18.5 18.5v27.7h29.2c9 0 16.3 7.1 16.3 16 0 9-7.3 16.1-16.3 16.1h-29.2v79.7c0 14.5 7.4 20.3 20 20.3 4.3 0 8-0.9 9.2-0.9 8.3 0 15.7 6.8 15.7 15.4 0 6.8-4.6 12.3-9.8 14.5-8 2.8-15.7 4.3-25.6 4.3-27.4 0-46.8-12-46.8-47.7z",
  T_dot: "M175.2 342.1c-11.6 0-21 9.4-21 21v42.2c0 11.5 9.5 20.7 21 20.7 11.6 0 21.1-9.2 21.1-20.7v-42.2c0-11.6-9.5-21-21.1-21z",
  Power: "M174.7 583.5c-59.3 0-107.6-48.3-107.6-107.6 0-31.2 13.5-60.8 37.2-81.3 7.1-6.2 18-5.4 24.2 1.8 6.2 7.1 5.4 18-1.8 24.2-16.1 13.9-25.3 34.1-25.3 55.3 0 40.4 32.9 73.3 73.3 73.3 40.3 0 73.2-32.9 73.2-73.3 0-20.9-9-40.9-24.7-54.8-7.1-6.3-7.7-17.1-1.4-24.2 6.2-7.1 17.1-7.7 24.2-1.4 23 20.4 36.2 49.7 36.2 80.4 0 59.3-48.2 107.6-107.5 107.6zm21.7-178.2v65.1c0 12.3-10.8 21.9-23.4 20.6-10.8-1.2-18.7-10.9-18.7-21.7v-64c0 11.5 9.5 20.7 21 20.7 11.6 0 21.1-9.2 21.1-20.7z"
};

const techStrokes: { [key: string]: string } = {
  T: "#1e78c2",
  E: "url(#g1)",
  C: "url(#g2)",
  H: "url(#g3)",
};

const startStrokes = {
  S: "#872996",
  T: "#872996",
  A: "#872996",
  R: "#872996",
  T2: "#872996",
  T_dot: "#222794",
  Power: "#872996"
};