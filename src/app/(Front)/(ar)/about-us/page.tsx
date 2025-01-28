import { Suspense } from 'react'
import { cookies } from 'next/headers'
import AboutUsContent from '@/components/who-we-are/about-us-content'
import { getAboutUs } from '@/app/actions/pages/about-us'
import { getTeamMembers } from '@/app/actions/pages/team-actions'
import { getFocusAreas } from '@/app/actions/pages/focus-area'

export default async function AboutUsPage() {
  const cookieStore = await cookies()
  const language = (cookieStore.get('NEXT_LOCALE')?.value || 'en') as 'en' | 'ar'

  const [aboutResponse, teamResponse, focusAreasResponse] = await Promise.all([
    getAboutUs(language),
    getTeamMembers(language),
    getFocusAreas(language)
  ])

  // Provide default/empty data if any of the responses fail
  const aboutData = aboutResponse.success ? aboutResponse.data : {
    id: '',
    title: '',
    description: '',
    imageUrl: null,
    cards: [],
    whoWeAre: []
  };

  const teamData = teamResponse.success ? teamResponse.data : [];
  const focusAreasData = focusAreasResponse.success ? focusAreasResponse.data : [];

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AboutUsContent 
        aboutData={aboutData}
        teamData={teamData}
        focusAreasData={focusAreasData}
      />
    </Suspense>
  )
}

