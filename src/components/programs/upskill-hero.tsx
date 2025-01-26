"use client";

import ReusableHero from "./reusable-hero";
import { useLanguage } from "@/context/LanguageContext";

interface UpskillHeroProps {
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

export default function UpskillHero({ data }: UpskillHeroProps) {
  const { language } = useLanguage();
  
  const features = [
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
            d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
          />
        </svg>
      ),
      title: language === 'en' ? "Student Internship" : "التدريب الطلابي",
      description: language === 'en' 
        ? "Stipends for students in their last 2 years of university studies."
        : "منح للطلاب في السنتين الأخيرتين من دراستهم الجامعية.",
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
            d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
          />
        </svg>
      ),
      title: language === 'en' ? "Train-to-hire" : "التدريب للتوظيف",
      description: language === 'en'
        ? "Stipends for graduates and new hires to gain practical skills."
        : "منح للخريجين والموظفين الجدد لاكتساب المهارات العملية.",
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
            d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
          />
        </svg>
      ),
      title: language === 'en' ? "On-the-job Training" : "التدريب أثناء العمل",
      description: language === 'en'
        ? "Stipends for new IT staff to gain advanced skills for international projects."
        : "منح لموظفي تكنولوجيا المعلومات الجدد لاكتساب مهارات متقدمة للمشاريع الدولية.",
    },
  ];

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
      features={features}
    />
  );
}
