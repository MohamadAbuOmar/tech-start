import { cookies } from 'next/headers'
import { WorkWithUs } from '@/components/who-we-are/work-with-us'
import { getWorkWithUs } from '@/app/actions/pages/work-with-us'

export const revalidate = 30

export default async function WorkWithUsPage() {
  const cookieStore = cookies()
  const language = (cookieStore.get('NEXT_LOCALE')?.value || 'en') as 'en' | 'ar'
  
  const workWithUsResponse = await getWorkWithUs(language)
  
  if (!workWithUsResponse.success) {
    return <div>Error loading work with us data</div>
  }

  return <WorkWithUs data={workWithUsResponse.data} />
}
