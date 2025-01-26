import { cookies } from 'next/headers'
import { ContentGrid } from "@/components/News-blog/content-grid";
import { getAllContent } from "@/app/actions/pages/posts";

export const revalidate = 30;

export default async function NewsPage() {
  const cookieStore = cookies()
  const language = (cookieStore.get('NEXT_LOCALE')?.value || 'en') as 'en' | 'ar'
  
  const contentResponse = await getAllContent(language)
  
  if (!contentResponse.success) {
    return <div>Error loading news content</div>
  }

  return (
    <ContentGrid
      title={language === 'en' ? "News & Press Releases" : "الأخبار والبيانات الصحفية"}
      subtitle={language === 'en' ? "Stay updated with our latest news, publications, and announcements" : "ابق على اطلاع بآخر الأخبار والمنشورات والإعلانات"}
      items={contentResponse.data}
    />
  );
}
