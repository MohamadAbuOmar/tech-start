"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { GalleryFilters } from "./GalleryFilters";
import { ChevronLeft, ChevronRight, X, Calendar } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

interface Image {
  src: string;
  title: string;
}

interface Event {
  id: string;
  name: string;
  date: string;
  images: Image[];
}

interface PhotoGalleryProps {
  photos: Event[];
  className?: string;
}

export const PhotoGallery = ({ photos, className }: PhotoGalleryProps) => {
  const { language, isRTL } = useLanguage();
  const [filteredEvents, setFilteredEvents] = useState(photos);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const filtered = photos.filter((event) =>
      event.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    const sorted = [...filtered].sort((a, b) => {
      if (sortOrder === "asc") {
        return new Date(a.date).getTime() - new Date(b.date).getTime();
      } else {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      }
    });
    setFilteredEvents(sorted);
  }, [searchTerm, sortOrder, photos]);

  const nextImage = () => {
    if (selectedEvent) {
      setCurrentImageIndex(
        (prevIndex) => (prevIndex + 1) % selectedEvent.images.length
      );
    }
  };

  const prevImage = () => {
    if (selectedEvent) {
      setCurrentImageIndex(
        (prevIndex) =>
          (prevIndex - 1 + selectedEvent.images.length) %
          selectedEvent.images.length
      );
    }
  };

  const handleSearch = useCallback((term: string) => {
    setSearchTerm(term);
  }, []);

  const handleSort = useCallback((order: "asc" | "desc") => {
    setSortOrder(order);
  }, []);

  return (
    <div className={cn("min-h-screen bg-gray-100", className)}>
      <header className="sticky top-0 z-50 bg-white shadow-sm">
        <GalleryFilters
          onSearch={handleSearch}
          onSort={handleSort}
          title={language === 'en' ? "TechStart Image Gallery" : "معرض الصور"}
        />
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
              <h2 className="text-2xl font-bold text-purple-800">
                {event.name}
              </h2>
              <p className="text-gray-600 flex items-center mt-2">
                <Calendar size={18} className="mr-2" />
                {event.date}
              </p>
            </div>
            <div className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {event.images.map((image, imageIndex) => (
                <motion.div
                  key={`${event.id}-${imageIndex}`}
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.2 }}
                  className="relative group cursor-pointer"
                  onClick={() => {
                    setSelectedEvent(event);
                    setCurrentImageIndex(imageIndex);
                  }}
                >
                  <Image
                    src={image.src}
                    alt={`${event.name} - ${image.title}`}
                    width={1300}
                    height={1400}
                    className="w-full h-48 object-cover rounded-lg shadow-md"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-300 rounded-lg flex items-center justify-center">
                    <p className="text-white text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      {image.title}
                    </p>
                  </div>
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
                <Image
                  src={selectedEvent.images[currentImageIndex].src}
                  alt={`${selectedEvent.name} - ${selectedEvent.images[currentImageIndex].title}`}
                  width={1366}
                  height={1600}
                  className="rounded-lg object-contain"
                />
              </div>
              <div className="mt-4 text-white text-center">
                <h2 className="text-2xl font-bold mb-2">
                  {selectedEvent.images[currentImageIndex].title}
                </h2>
                <p className="text-lg mb-2">{selectedEvent.name}</p>
                <p className="text-sm flex items-center justify-center">
                  <Calendar size={14} className="mr-1" />
                  {selectedEvent.date}
                </p>
              </div>
              <div className={`absolute ${isRTL ? 'right-4' : 'left-4'} top-1/2 transform -translate-y-1/2`}>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-white"
                  onClick={prevImage}
                >
                  {isRTL ? <ChevronRight size={36} /> : <ChevronLeft size={36} />}
                </Button>
              </div>
              <div className={`absolute ${isRTL ? 'left-4' : 'right-4'} top-1/2 transform -translate-y-1/2`}>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-white"
                  onClick={nextImage}
                >
                  {isRTL ? <ChevronLeft size={36} /> : <ChevronRight size={36} />}
                </Button>
              </div>

              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
                <div className="flex space-x-2">
                  {selectedEvent.images.map((_, index) => (
                    <button
                      key={index}
                      aria-label={`Go to image ${index + 1}`}
                      className={`w-2 h-2 rounded-full ${
                        index === currentImageIndex ? "bg-white" : "bg-gray-500"
                      }`}
                      onClick={() => setCurrentImageIndex(index)}
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
