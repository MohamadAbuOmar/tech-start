import { cookies } from 'next/headers'
import { FAQSection } from "@/components/faq-section/faq-section"
import { getFaqCategories } from '@/app/actions/pages/faq'

// Enable ISR with 30-second revalidation
export const revalidate = 30

export default async function FAQsPage() {
  const cookieStore = cookies()
  const language = (cookieStore.get('NEXT_LOCALE')?.value || 'en') as 'en' | 'ar'
  
  const faqResponse = await getFaqCategories(language)
  
  if (!faqResponse.success) {
    return <div>Error loading FAQ data</div>
  }

  return (
    <div className="min-h-screen">
      <FAQSection categories={faqResponse.data} />
    </div>
  )
}

