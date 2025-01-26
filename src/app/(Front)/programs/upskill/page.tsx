import { cookies } from 'next/headers'
import GrantTabs from "@/components/programs/grant-tabs";
import UpskillHero from "@/components/programs/upskill-hero";
import { getUpskillProgram } from "@/app/actions/pages/programs";

export const revalidate = 30;

export default async function UpskillProgramPage() {
  const cookieStore = cookies()
  const language = (cookieStore.get('NEXT_LOCALE')?.value || 'en') as 'en' | 'ar'
  
  const programResponse = await getUpskillProgram(language)
  
  if (!programResponse.success) {
    return <div>Error loading program data</div>
  }

  return (
    <main className="min-h-screen flex flex-col">
      <UpskillHero data={programResponse.data.hero} />
      <GrantTabs data={programResponse.data.tabs} />
    </main>
  );
}

