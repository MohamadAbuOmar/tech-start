import dynamic from "next/dynamic"
import ProgramsSec from "@/components/shared/program/ProgramsSec"
import { ServerMediaCenter } from "@/components/shared/Hero/ServerMediaCenter"
import { ServerSafeguardsBanner } from "@/components/shared/banners/ServerSafeguardsBanner"
import Hero from "@/components/shared/Hero/Hero"
import { Metadata } from "next"
import { cookies } from "next/headers"

export async function generateMetadata({
  params: { lang },
}: {
  params: { lang: string };
}): Promise<Metadata> {
  return {
    title: lang === 'ar' ? 'تك ستارت | الصفحة الرئيسية' : 'Tech Start | Home',
    description: lang === 'ar' 
      ? 'منصة تك ستارت - بوابتك نحو التطور التقني والابتكار'
      : 'Tech Start Platform - Your Gateway to Technical Innovation',
  }
}

export default async function HomePage({
  params: { lang },
}: {
  params: { lang: string };
}) {
  if (!['en', 'ar'].includes(lang)) {
    return null;
  }

  return (
    <main className="min-h-screen">
      <Hero />
      <ProgramsSec />
      <section>
        <ServerMediaCenter />
      </section>
      <ServerSafeguardsBanner />
    </main>
  )
}
