import { cookies } from 'next/headers'
import { WorkWithUs } from '@/components/who-we-are/work-with-us'
import { getWorkWithUs } from '@/app/actions/pages/work-with-us'

export const revalidate = 30

export default async function WorkWithUsPage() {
  const cookieStore = cookies()
  const language = (cookieStore.get('NEXT_LOCALE')?.value || 'en') as 'en' | 'ar'
  
  const workWithUsResponse = await getWorkWithUs(language)
  
  if (!workWithUsResponse.success) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className={`text-2xl font-semibold text-gray-800 mb-2 ${language === 'ar' ? 'font-[Noto Sans Arabic]' : ''}`}>
            {language === 'en' ? 'Something went wrong' : 'حدث خطأ ما'}
          </h2>
          <p className={`text-gray-600 ${language === 'ar' ? 'font-[Noto Sans Arabic]' : ''}`}>
            {workWithUsResponse.error || (language === 'en'
              ? 'Unable to load work opportunities. Please try again later.'
              : 'تعذر تحميل فرص العمل. يرجى المحاولة مرة أخرى لاحقاً.')}
          </p>
        </div>
      </div>
    )
  }

  return <WorkWithUs data={workWithUsResponse.data} />
}
