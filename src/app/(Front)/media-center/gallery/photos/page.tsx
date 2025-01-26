import { cookies } from 'next/headers'
import { PhotoGallery } from "@/components/Gallery/imagesGallery";
import { getGalleryPhotos } from "@/app/actions/pages/gallery";

export const revalidate = 30;

export default async function PhotoGalleryPage() {
  const cookieStore = cookies()
  const language = (cookieStore.get('NEXT_LOCALE')?.value || 'en') as 'en' | 'ar'
  
  const photosResponse = await getGalleryPhotos(language)
  
  if (!photosResponse.success) {
    return <div>Error loading gallery photos</div>
  }

  return <PhotoGallery photos={photosResponse.data} />;
}

