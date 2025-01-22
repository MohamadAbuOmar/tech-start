"use client";

import ReusableHero from "./reusable-hero";

export default function UpskillHero() {
  return (
    <ReusableHero
      badge="Programs"
      title="Empowering IT firms with"
      highlightedWord="UPSKILL"
      description="The Upskill Program focuses on helping IT firms upskill their workforce to scale up their business, increase growth opportunities, and attract new local and international clients."
      primaryButtonText="Apply Now"
      secondaryButtonText="Learn More"
      imageSrc="/images/UpskillHero.png"
      imageAlt="UPSKILL Program Illustration"
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
                d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
              />
            </svg>
          ),
          title: "Student Internship",
          description: "Stipends for students in their last 2 years of university studies.",
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
          title: "Train-to-hire",
          description: "Stipends for graduates and new hires to gain practical skills.",
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
          title: "On-the-job Training",
          description: "Stipends for new IT staff to gain advanced skills for international projects.",
        },
      ]}
    />
  );
}
