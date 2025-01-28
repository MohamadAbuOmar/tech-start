import { getGalleries } from "@/app/actions/pages/gallery";
import ClientGallery from "./ClientGallery";
import { Suspense } from "react";

interface ServerGalleryProps {
  language: 'en' | 'ar';
}

export async function ServerGallery({ language }: ServerGalleryProps) {
  const galleryResponse = await getGalleries(language);

  if (!galleryResponse.success || !galleryResponse.data) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">
          {language === 'ar' ? 'لا توجد صور متاحة.' : 'No images available.'}
        </p>
      </div>
    );
  }

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <Suspense fallback={
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="aspect-square bg-muted rounded-lg"></div>
                <div className="h-4 bg-muted rounded mt-4 w-3/4"></div>
              </div>
            ))}
          </div>
        }>
          <ClientGallery galleries={galleryResponse.data} />
        </Suspense>
      </div>
    </section>
  );
}
