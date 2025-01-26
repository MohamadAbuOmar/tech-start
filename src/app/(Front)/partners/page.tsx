import { cookies } from 'next/headers'
import PartnersPage from '@/components/shared/Clients/PartnersPage'
import { getPartners } from '@/app/actions/pages/partners'

export const revalidate = 30

export default async function PartnersPageA() {
  const cookieStore = cookies()
  const language = (cookieStore.get('NEXT_LOCALE')?.value || 'en') as 'en' | 'ar'
  
  const partnersResponse = await getPartners(language)
  
  if (!partnersResponse.success) {
    return <div>Error loading partners data</div>
  }

  return (
    <PartnersPage partners={partnersResponse.data} />
  )
}
