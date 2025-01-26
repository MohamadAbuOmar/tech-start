"use client";

import ReusableHero from "./reusable-hero";

interface PioneerHeroProps {
  data: {
    badge: string;
    title: string;
    highlightedWord: string;
    description: string;
    primaryButtonText: string;
    secondaryButtonText: string;
    imageSrc: string;
    imageAlt: string;
  };
}

export default function PioneerHero({ data }: PioneerHeroProps) {
  return (
    <ReusableHero
      badge={data.badge}
      title={data.title}
      highlightedWord={data.highlightedWord}
      description={data.description}
      primaryButtonText={data.primaryButtonText}
      secondaryButtonText={data.secondaryButtonText}
      imageSrc={data.imageSrc}
      imageAlt={data.imageAlt}
      features={[
        {
          icon: (
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
          ),
          title: "Innovation Support",
          description: "Funding for innovative tech solutions and product development.",
        },
        {
          icon: (
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
                d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
              />
            </svg>
          ),
          title: "R&D Projects",
          description: "Support for research and development initiatives.",
        },
        {
          icon: (
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
                d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z"
              />
            </svg>
          ),
          title: "Technology Adoption",
          description: "Support for adopting cutting-edge technologies.",
        },
      ]}
    />
  );
}
