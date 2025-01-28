import { Metadata } from "next";
import { LangPageProps } from "@/types/page";
import { ServerGallery } from "@/components/shared/gallery/ServerGallery";
import { ServerVideoGallery } from "@/components/shared/gallery/ServerVideoGallery";

export async function generateMetadata(
  props: LangPageProps
): Promise<Metadata> {
  const { lang } = await props.params;
  return {
    title: lang === 'ar' ? 'معرض الصور | تك ستارت' : 'Gallery | Tech Start',
    description: lang === 'ar' 
      ? 'استكشف معرض صور وفيديوهات تك ستارت'
      : 'Explore Tech Start photo and video gallery.',
    openGraph: {
      type: 'website',
      url: 'https://tech-start.org/gallery',
      title: lang === 'ar' ? 'معرض الصور | تك ستارت' : 'Gallery | Tech Start',
      description: lang === 'ar' 
        ? 'استكشف معرض صور وفيديوهات تك ستارت'
        : 'Explore Tech Start photo and video gallery.',
      siteName: 'Tech Start'
    }
  }
}

export default async function GalleryPage(props: LangPageProps) {
  const { lang } = await props.params;

  return (
    <main className="min-h-screen py-16" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
      <div className="container mx-auto px-4">
        <h1 className={`text-4xl font-bold mb-12 text-center ${lang === 'ar' ? 'text-right' : 'text-left'}`}>
          {lang === 'ar' ? 'معرض الصور والفيديو' : 'Gallery'}
        </h1>
        <div className="space-y-16">
          <div>
            <h2 className={`text-3xl font-semibold mb-8 ${lang === 'ar' ? 'text-right' : 'text-left'}`}>
              {lang === 'ar' ? 'الصور' : 'Images'}
            </h2>
            <ServerGallery language={lang} />
          </div>
          <div>
            <h2 className={`text-3xl font-semibold mb-8 ${lang === 'ar' ? 'text-right' : 'text-left'}`}>
              {lang === 'ar' ? 'الفيديوهات' : 'Videos'}
            </h2>
            <ServerVideoGallery language={lang} />
          </div>
        </div>
      </div>
    </main>
  );
}
