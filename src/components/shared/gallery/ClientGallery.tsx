"use client";

import { LocalizedGallery } from "@/app/actions/pages/gallery";
import { useLanguage } from "@/context/LanguageContext";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";

interface ClientGalleryProps {
  galleries: LocalizedGallery[];
}

export default function ClientGallery({ galleries }: ClientGalleryProps) {
  const { isRTL } = useLanguage();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

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
                {gallery.images.map((image) => (
                  <motion.div
                    key={image.id}
                    whileHover={{ scale: 1.02 }}
                    className="cursor-pointer"
                    onClick={() => setSelectedImage(image.url)}
                  >
                    <div className="aspect-square relative rounded-lg overflow-hidden">
                      <Image
                        src={image.url}
                        alt={image.title || ''}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    </div>
                    {image.title && (
                      <p className={`mt-2 text-sm text-muted-foreground ${isRTL ? 'text-right' : 'text-left'}`}>
                        {image.title}
                      </p>
                    )}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </AnimatePresence>

      <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
        <DialogContent className="max-w-4xl">
          {selectedImage && (
            <div className="relative aspect-[4/3] w-full">
              <Image
                src={selectedImage}
                alt=""
                fill
                className="object-contain"
                sizes="(max-width: 1200px) 100vw, 1200px"
              />
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
