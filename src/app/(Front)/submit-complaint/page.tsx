import { cookies } from 'next/headers'
import SubmitComplaintPage from "@/components/submit-complaint/submit-complaint-page";
import { getGuidelines } from '@/app/actions/pages/guidelines'

export const revalidate = 30

export default async function SubmitComplaint() {
  const cookieStore = cookies()
  const language = (cookieStore.get('NEXT_LOCALE')?.value || 'en') as 'en' | 'ar'
  
  const guidelinesResponse = await getGuidelines(language)
  
  if (!guidelinesResponse.success) {
    return <div>Error loading guidelines data</div>
  }

  return (
    <SubmitComplaintPage guidelines={guidelinesResponse.data} />
  )
}

