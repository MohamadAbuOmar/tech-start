/* eslint-disable @next/next/no-img-element */
"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, X, Calendar, Play } from 'lucide-react';
import { GalleryFilters } from "./GalleryFilters";

import { useLanguage } from "@/context/LanguageContext";

import { LocalizedVideoGallery } from "@/app/actions/pages/gallery";

interface VideoGalleryProps {
  galleries: LocalizedVideoGallery[];
  className?: string;
}

export const VideoGallery = ({
  galleries,
  className,
}: VideoGalleryProps) => {
  const { language, isRTL } = useLanguage();
  const [filteredGalleries, setFilteredGalleries] = useState(galleries);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [selectedGallery, setSelectedGallery] = useState<LocalizedVideoGallery | null>(null);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const filtered = galleries.filter(gallery => 
      gallery.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    const sorted = [...filtered].sort((a, b) => {
      if (sortOrder === 'asc') {
        return a.title.localeCompare(b.title);
      } else {
        return b.title.localeCompare(a.title);
      }
    });
    setFilteredGalleries(sorted);
  }, [searchTerm, sortOrder, videos]);

  const nextVideo = () => {
    if (selectedGallery) {
      setCurrentVideoIndex((prevIndex) => 
        (prevIndex + 1) % selectedGallery.videos.length
      );
    }
  };

  const prevVideo = () => {
    if (selectedGallery) {
      setCurrentVideoIndex((prevIndex) => 
        (prevIndex - 1 + selectedGallery.videos.length) % selectedGallery.videos.length
      );
    }
  };

  const handleSearch = useCallback((term: string) => {
    setSearchTerm(term);
  }, []);

  const handleSort = useCallback((order: 'asc' | 'desc') => {
    setSortOrder(order);
  }, []);

  return (
    <div className={cn("min-h-screen bg-gray-100", className)}>
       <header className="sticky top-0 z-50 bg-white shadow-sm">
        <GalleryFilters onSearch={handleSearch} onSort={handleSort} title={language === 'en' ? "TechStart Video Gallery" : "معرض الفيديو"} />
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {filteredGalleries.map((gallery) => (
          <motion.section
            key={gallery.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-12 overflow-hidden"
          >
            <div className="p-6 border-b border-gray-200">
              <h2 className={`text-2xl font-bold text-purple-800 ${isRTL ? 'text-right' : 'text-left'}`}>{gallery.title}</h2>
            </div>
            <div className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {gallery.videos.map((video, videoIndex) => (
                <motion.div
                  key={`${gallery.id}-${videoIndex}`}
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.2 }}
                  className="relative group cursor-pointer"
                  onClick={() => {
                    setSelectedGallery(gallery);
                    setCurrentVideoIndex(videoIndex);
                  }}
                >
                  <div className="relative w-full h-48">
                    <img
                      src={video.url}
                      alt={video.title}
                      className="w-full h-full object-cover rounded-lg shadow-md"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-300 rounded-lg flex items-center justify-center">
                      <Play className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" size={48} />
                    </div>
                  </div>
                  <p className={`mt-2 text-sm font-medium text-gray-800 ${isRTL ? 'text-right' : 'text-left'}`}>{video.title}</p>
                  {video.description && (
                    <p className={`mt-1 text-xs text-gray-600 ${isRTL ? 'text-right' : 'text-left'}`}>{video.description}</p>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.section>
        ))}
      </main>

      <AnimatePresence>
        {selectedGallery && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-[200]"
          >
            <div className="relative w-full h-full flex flex-col items-center justify-center p-4">
              <Button
                variant="ghost"
                size="icon"
                className={`absolute top-4 z-[210] ${isRTL ? 'left-4' : 'right-4'} text-white`}
                onClick={() => setSelectedGallery(null)}
              >
                <X size={24} />
              </Button>
              <div className="relative w-full max-w-4xl aspect-video">
                <video
                  ref={videoRef}
                  src={selectedGallery.videos[currentVideoIndex].url}
                  className="w-full h-full rounded-lg"
                  controls
                  autoPlay
                />
              </div>
              <div className="mt-4 text-white text-center">
                <h2 className="text-2xl font-bold mb-2">{selectedGallery.videos[currentVideoIndex].title}</h2>
                <p className="text-lg mb-2">{selectedGallery.title}</p>
                {selectedGallery.videos[currentVideoIndex].description && (
                  <p className="text-sm text-gray-300">{selectedGallery.videos[currentVideoIndex].description}</p>
                )}
              </div>
              <div className={`absolute ${isRTL ? 'right-4' : 'left-4'} top-1/2 transform -translate-y-1/2`}>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-white"
                  onClick={prevVideo}
                >
                  <ChevronLeft size={36} />
                </Button>
              </div>
              <div className={`absolute ${isRTL ? 'left-4' : 'right-4'} top-1/2 transform -translate-y-1/2`}>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-white"
                  onClick={nextVideo}
                >
                  <ChevronRight size={36} />
                </Button>
              </div>
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
                <div className="flex space-x-2">
                  {selectedGallery.videos.map((_, index) => (
                    <button
                      key={index}
                      aria-label={language === 'en' ? `Go to video ${index + 1}` : `الانتقال إلى الفيديو ${index + 1}`}
                      className={`w-2 h-2 rounded-full ${
                        index === currentVideoIndex ? 'bg-white' : 'bg-gray-500'
                      }`}
                      onClick={() => setCurrentVideoIndex(index)}
                    />
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

