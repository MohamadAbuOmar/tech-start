import { Metadata } from "next";
import { LangPageProps } from "@/types/page";
import { ServerBlog } from "@/components/shared/blog/ServerBlog";

export async function generateMetadata(
  props: LangPageProps
): Promise<Metadata> {
  const { lang } = await props.params;
  return {
    title: lang === 'ar' ? 'المدونة | تك ستارت' : 'Blog | Tech Start',
    description: lang === 'ar' 
      ? 'اقرأ أحدث المقالات والأخبار من تك ستارت'
      : 'Read the latest articles and news from Tech Start.',
    openGraph: {
      type: 'website',
      url: 'https://tech-start.org/blog',
      title: lang === 'ar' ? 'المدونة | تك ستارت' : 'Blog | Tech Start',
      description: lang === 'ar' 
        ? 'اقرأ أحدث المقالات والأخبار من تك ستارت'
        : 'Read the latest articles and news from Tech Start.',
      siteName: 'Tech Start'
    }
  }
}

export default async function BlogPage(props: LangPageProps) {
  const { lang } = await props.params;

  return (
    <main className="min-h-screen py-16" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
      <div className="container mx-auto px-4">
        <h1 className={`text-4xl font-bold mb-12 text-center ${lang === 'ar' ? 'text-right' : 'text-left'}`}>
          {lang === 'ar' ? 'المدونة' : 'Blog'}
        </h1>
        <ServerBlog language={lang} />
      </div>
    </main>
  );
}
