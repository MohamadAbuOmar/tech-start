import dynamic from "next/dynamic";
import React from "react";
import ProgramsSec from "@/components/shared/program/ProgramsSec";
import { MediaCenter } from "@/components/shared/Hero/MediaCenter";
import SafeguardsBanner from "@/components/shared/banners/SafeguardsBanner";

const Hero = dynamic(() => import("@/components/shared/Hero/Hero"), { ssr: true });
const StatsCountUp = dynamic(() => import("@/components/Stats/StatsCountUp"), {
  ssr: true,
});

export default function Page() {
  return (
    <main className="relative">
      <Hero />
      <section>
        <StatsCountUp />
      </section>
      <section>
        <ProgramsSec />
      </section>
      <section>
        <MediaCenter />
      </section>
      <SafeguardsBanner />
    </main>
  );
}

