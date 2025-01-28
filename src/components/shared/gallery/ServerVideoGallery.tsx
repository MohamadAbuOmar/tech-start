import { getVideoGalleries } from "@/app/actions/pages/gallery";
import ClientVideoGallery from "./ClientVideoGallery";
import { Suspense } from "react";

interface ServerVideoGalleryProps {
  language: 'en' | 'ar';
}

export async function ServerVideoGallery({ language }: ServerVideoGalleryProps) {
  const videoResponse = await getVideoGalleries(language);

  if (!videoResponse.success || !videoResponse.data) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">
          {language === 'ar' ? 'لا توجد فيديوهات متاحة.' : 'No videos available.'}
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
                <div className="aspect-video bg-muted rounded-lg"></div>
                <div className="h-4 bg-muted rounded mt-4 w-3/4"></div>
              </div>
            ))}
          </div>
        }>
          <ClientVideoGallery galleries={videoResponse.data} />
        </Suspense>
      </div>
    </section>
  );
}
