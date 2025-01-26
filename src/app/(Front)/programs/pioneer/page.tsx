import { cookies } from 'next/headers'
import PioneerTabs from "@/components/programs/pioneer-tabs";
import PioneerHero from "@/components/programs/pioneer-hero";
import { getPioneerProgram } from "@/app/actions/pages/programs";

export const revalidate = 30;

export default async function PioneerProgramPage() {
  const cookieStore = cookies()
  const language = (cookieStore.get('NEXT_LOCALE')?.value || 'en') as 'en' | 'ar'
  
  const programResponse = await getPioneerProgram(language)
  
  if (!programResponse.success) {
    return <div>Error loading program data</div>
  }

  return (
    <main className="min-h-screen flex flex-col">
      <PioneerHero data={programResponse.data.hero} />
      <PioneerTabs data={programResponse.data.tabs} />
    </main>
  );
}
