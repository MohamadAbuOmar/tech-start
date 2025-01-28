"use client";

import { LocalizedVideoGallery } from "@/app/actions/pages/gallery";
import { useLanguage } from "@/context/LanguageContext";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";

interface ClientVideoGalleryProps {
  galleries: LocalizedVideoGallery[];
}

export default function ClientVideoGallery({ galleries }: ClientVideoGalleryProps) {
  const { isRTL } = useLanguage();
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);

  const getEmbedUrl = (url: string) => {
    if (url.includes('youtube.com') || url.includes('youtu.be')) {
      const videoId = url.split('v=')[1] || url.split('/').pop();
      return `https://www.youtube.com/embed/${videoId}`;
    }
    return url;
  };

  return (
    <>
      <AnimatePresence mode="wait">
        <div className={`space-y-12 ${isRTL ? 'rtl' : 'ltr'}`}>
          {galleries.map((gallery) => (
            <motion.div
              key={gallery.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="space-y-6"
            >
              <h2 className={`text-2xl font-bold ${isRTL ? 'text-right' : 'text-left'}`}>
                {gallery.title}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {gallery.videos.map((video) => (
                  <motion.div
                    key={video.id}
                    whileHover={{ scale: 1.02 }}
                    className="cursor-pointer"
                    onClick={() => setSelectedVideo(video.url)}
                  >
                    <div className="aspect-video relative rounded-lg overflow-hidden bg-muted">
                      <iframe
                        src={getEmbedUrl(video.url)}
                        title={video.title}
                        className="w-full h-full"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    </div>
                    <h3 className={`mt-2 font-medium ${isRTL ? 'text-right' : 'text-left'}`}>
                      {video.title}
                    </h3>
                    {video.description && (
                      <p className={`mt-1 text-sm text-muted-foreground ${isRTL ? 'text-right' : 'text-left'}`}>
                        {video.description}
                      </p>
                    )}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </AnimatePresence>

      <Dialog open={!!selectedVideo} onOpenChange={() => setSelectedVideo(null)}>
        <DialogContent className="max-w-4xl">
          {selectedVideo && (
            <div className="relative aspect-video w-full">
              <iframe
                src={getEmbedUrl(selectedVideo)}
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
