import { cookies } from 'next/headers'
import { PhotoGallery } from "@/components/Gallery/imagesGallery";
import { getGalleryPhotos } from "@/app/actions/pages/gallery";

export const revalidate = 30;

export default async function PhotoGalleryPage() {
  const cookieStore = cookies()
  const language = (cookieStore.get('NEXT_LOCALE')?.value || 'en') as 'en' | 'ar'
  
  const photosResponse = await getGalleryPhotos(language)
  
  if (!photosResponse.success) {
    console.error('Error loading gallery photos:', photosResponse.error);
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            {language === 'en' ? 'Error Loading Gallery' : 'خطأ في تحميل المعرض'}
          </h2>
          <p className="text-gray-600">
            {language === 'en' 
              ? 'Please try again later' 
              : 'يرجى المحاولة مرة أخرى لاحقاً'}
          </p>
        </div>
      </div>
    );
  }

  // Transform data to match the expected format
  const transformedData = photosResponse.data.map(gallery => ({
    id: gallery.id,
    name: gallery.title,
    date: new Date().toLocaleDateString(language === 'en' ? 'en-US' : 'ar-SA'),
    images: gallery.images.map(image => ({
      src: image.url,
      title: image.title || '',
      featured: image.featured
    }))
  }));

  return <PhotoGallery photos={transformedData} className="min-h-screen" />;
}

