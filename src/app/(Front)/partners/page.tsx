import { cookies } from 'next/headers'
import PartnersPage from '@/components/shared/Clients/PartnersPage'
import { getPartners } from '@/app/actions/pages/partners'

export const revalidate = 30

export default async function PartnersPageA() {
  const cookieStore = cookies()
  const language = (cookieStore.get('NEXT_LOCALE')?.value || 'en') as 'en' | 'ar'
  
  try {
    const partnersResponse = await getPartners(language)
    
    if (!partnersResponse.success) {
      console.error('Failed to fetch partners:', partnersResponse.error);
      return (
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h2 className={`text-2xl font-semibold text-gray-800 mb-2 ${language === 'ar' ? 'font-[Noto Sans Arabic]' : ''}`}>
              {language === 'en' ? 'Something went wrong' : 'حدث خطأ ما'}
            </h2>
            <p className={`text-gray-600 ${language === 'ar' ? 'font-[Noto Sans Arabic]' : ''}`}>
              {partnersResponse.error || (language === 'en' 
                ? 'Unable to load partners data. Please try again later.' 
                : 'تعذر تحميل بيانات الشركاء. يرجى المحاولة مرة أخرى لاحقاً.')}
            </p>
          </div>
        </div>
      );
    }

    if (!partnersResponse.data || partnersResponse.data.length === 0) {
      return (
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h2 className={`text-2xl font-semibold text-gray-800 mb-2 ${language === 'ar' ? 'font-[Noto Sans Arabic]' : ''}`}>
              {language === 'en' ? 'No Partners Found' : 'لم يتم العثور على شركاء'}
            </h2>
            <p className={`text-gray-600 ${language === 'ar' ? 'font-[Noto Sans Arabic]' : ''}`}>
              {language === 'en'
                ? 'There are currently no partners to display.'
                : 'لا يوجد شركاء لعرضهم حالياً.'}
            </p>
          </div>
        </div>
      );
    }

    return (
      <PartnersPage partners={partnersResponse.data} />
    )
  } catch (error) {
    console.error('Error in partners page:', error);
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className={`text-2xl font-semibold text-gray-800 mb-2 ${language === 'ar' ? 'font-[Noto Sans Arabic]' : ''}`}>
            {language === 'en' ? 'Something went wrong' : 'حدث خطأ ما'}
          </h2>
          <p className={`text-gray-600 ${language === 'ar' ? 'font-[Noto Sans Arabic]' : ''}`}>
            {language === 'en' 
              ? 'An unexpected error occurred. Please try again later.'
              : 'حدث خطأ غير متوقع. يرجى المحاولة مرة أخرى لاحقاً.'}
          </p>
        </div>
      </div>
    );
  }
}
