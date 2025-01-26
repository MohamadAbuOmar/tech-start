import { cookies } from 'next/headers'
import SafeG from "@/components/safeG/SafeG";
import { getSafeguards } from "@/app/actions/pages/safeguards";

export const revalidate = 30;

export default async function SafeguardsPage() {
  const cookieStore = cookies()
  const language = (cookieStore.get('NEXT_LOCALE')?.value || 'en') as 'en' | 'ar'
  
  const safeguardsResponse = await getSafeguards(language)
  
  if (!safeguardsResponse.success) {
    return <div>Error loading safeguards data</div>
  }

  return (
    <div>
      <SafeG data={safeguardsResponse.data} />
    </div>
  );
}
