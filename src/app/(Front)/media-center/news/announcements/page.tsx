import { cookies } from 'next/headers'
import { ContentGrid } from "@/components/News-blog/content-grid"
// Removed unused import
import { getAnnouncements } from "@/app/actions/pages/posts";

export const revalidate = 30;

export default async function Announcements() {
  const cookieStore = cookies()
  const language = (cookieStore.get('NEXT_LOCALE')?.value || 'en') as 'en' | 'ar'
  
  const announcementsResponse = await getAnnouncements(language)
  
  if (!announcementsResponse.success) {
    return <div>Error loading announcements</div>
  }

  return (
    <ContentGrid 
      title={language === 'en' ? "Announcements" : "الإعلانات"} 
      items={announcementsResponse.data} 
    />
  );
}
