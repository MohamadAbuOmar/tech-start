/* eslint-disable @next/next/no-img-element */
"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, X, Calendar, Play } from 'lucide-react';
import { GalleryFilters } from "./GalleryFilters";

import { useLanguage } from "@/context/LanguageContext";

interface Video {
  src: string;
  title: string;
  thumbnail: string;
}

interface Event {
  id: string;
  name: string;
  date: string;
  videos: Video[];
}

interface VideoGalleryProps {
  videos: Event[];
  className?: string;
}

export const VideoGallery = ({
  videos,
  className,
}: VideoGalleryProps) => {
  const { language } = useLanguage();
  const [filteredEvents, setFilteredEvents] = useState(videos);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const filtered = videos.filter(event => 
      event.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    const sorted = [...filtered].sort((a, b) => {
      if (sortOrder === 'asc') {
        return new Date(a.date).getTime() - new Date(b.date).getTime();
      } else {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      }
    });
    setFilteredEvents(sorted);
  }, [searchTerm, sortOrder, videos]);

  const nextVideo = () => {
    if (selectedEvent) {
      setCurrentVideoIndex((prevIndex) => 
        (prevIndex + 1) % selectedEvent.videos.length
      );
    }
  };

  const prevVideo = () => {
    if (selectedEvent) {
      setCurrentVideoIndex((prevIndex) => 
        (prevIndex - 1 + selectedEvent.videos.length) % selectedEvent.videos.length
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
        {filteredEvents.map((event) => (
          <motion.section
            key={event.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-12 overflow-hidden"
          >
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-purple-800">{event.name}</h2>
              <p className="text-gray-600 flex items-center mt-2">
                <Calendar size={18} className="mr-2" />
                {event.date}
              </p>
            </div>
            <div className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {event.videos.map((video, videoIndex) => (
                <motion.div
                  key={`${event.id}-${videoIndex}`}
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.2 }}
                  className="relative group cursor-pointer"
                  onClick={() => {
                    setSelectedEvent(event);
                    setCurrentVideoIndex(videoIndex);
                  }}
                >
                  <div className="relative w-full h-48">
                    <img
                      src={video.thumbnail}
                      alt={`${event.name} - ${video.title}`}
                      className="w-full h-full object-cover rounded-lg shadow-md"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-300 rounded-lg flex items-center justify-center">
                      <Play className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" size={48} />
                    </div>
                  </div>
                  <p className="mt-2 text-sm font-medium text-gray-800">{video.title}</p>
                </motion.div>
              ))}
            </div>
          </motion.section>
        ))}
      </main>

      <AnimatePresence>
        {selectedEvent && (
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
                className="absolute top-4 z-[210] right-4 text-white"
                onClick={() => setSelectedEvent(null)}
              >
                <X size={24} />
              </Button>
              <div className="relative w-full max-w-4xl aspect-video">
                <video
                  ref={videoRef}
                  src={selectedEvent.videos[currentVideoIndex].src}
                  className="w-full h-full rounded-lg"
                  controls
                  autoPlay
                />
              </div>
              <div className="mt-4 text-white text-center">
                <h2 className="text-2xl font-bold mb-2">{selectedEvent.videos[currentVideoIndex].title}</h2>
                <p className="text-lg mb-2">{selectedEvent.name}</p>
                <p className="text-sm flex items-center justify-center">
                  <Calendar size={14} className="mr-1" />
                  {selectedEvent.date}
                </p>
              </div>
              <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-white"
                  onClick={prevVideo}
                >
                  <ChevronLeft size={36} />
                </Button>
              </div>
              <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
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
                  {selectedEvent.videos.map((_, index) => (
                    <button
                      key={index}
                      aria-label={`Go to video ${index + 1}`}
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

