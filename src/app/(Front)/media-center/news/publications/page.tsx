import { cookies } from 'next/headers'
import { ContentGrid } from "@/components/News-blog/content-grid"
import { getPublications } from "@/app/actions/pages/posts";

export const revalidate = 30;

export default async function Publications() {
  const cookieStore = cookies()
  const language = (cookieStore.get('NEXT_LOCALE')?.value || 'en') as 'en' | 'ar'
  
  const publicationsResponse = await getPublications(language)
  
  if (!publicationsResponse.success) {
    return <div>Error loading publications</div>
  }

  return (
    <ContentGrid 
      title={language === 'en' ? "Publications" : "المنشورات"} 
      items={publicationsResponse.data} 
    />
  );
}

