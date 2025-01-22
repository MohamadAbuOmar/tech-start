"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { GalleryFilters } from "./GalleryFilters";
import { ChevronLeft, ChevronRight, X, Calendar } from "lucide-react";

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

const events: Event[] = [
  {
    id: "event1",
    name: "Gaza Tech and Innovative Recovery",
    date: "2023-05-15",
    images: [
      {
        src: "https://www.techstart.ps//public/files/resized/490x245/galleries/1366x768/3-1634469578.jpg",
        title: "Opening Ceremony",
      },
      {
        src: "https://www.techstart.ps//public/files/resized/490x245/galleries/1366x768/1-1634469590.jpg",
        title: "Panel Discussion",
      },
      {
        src: "https://www.techstart.ps//public/files/resized/490x245/galleries/1366x768/6-1634469601.jpg",
        title: "Networking Session",
      },
    ],
  },
  {
    id: "event2",
    name: "TechStart Presentation Event",
    date: "2023-06-20",
    images: [
      {
        src: "https://www.techstart.ps//public/files/resized/490x245/galleries/1366x768/14-1669299686.jpg",
        title: "Keynote Speaker",
      },
      {
        src: "https://www.techstart.ps//public/files/resized/490x245/galleries/1366x768/13-1669299686.jpg",
        title: "Q&A Session",
      },
      {
        src: "https://www.techstart.ps//public/files/resized/490x245/galleries/1366x768/12-1669299685.jpg",
        title: "Product Demo",
      },
      {
        src: "https://www.techstart.ps//public/files/resized/490x245/galleries/1366x768/10-1669299684.jpg",
        title: "Audience Engagement",
      },
      {
        src: "https://www.techstart.ps//public/files/resized/490x245/galleries/1366x768/9-1669299684.jpg",
        title: "Closing Remarks",
      },
      {
        src: "https://www.techstart.ps//public/files/resized/490x245/galleries/1366x768/3-1669299683.jpg",
        title: "Networking Break",
      },
    ],
  },
  {
    id: "event3",
    name: "TechStart Meet & Greet event",
    date: "2023-07-10",
    images: [
      {
        src: "https://www.techstart.ps//public/files/resized/490x245/galleries/1366x768/8-1679836859.jpg",
        title: "Welcome Reception",
      },
      {
        src: "https://www.techstart.ps//public/files/resized/490x245/galleries/1366x768/1-1679836857.jpg",
        title: "Group Discussion",
      },
      {
        src: "https://www.techstart.ps//public/files/resized/490x245/galleries/1366x768/5-1679836857.jpg",
        title: "Mentorship Session",
      },
      {
        src: "https://www.techstart.ps//public/files/resized/490x245/galleries/1366x768/4-1679836857.jpg",
        title: "Startup Pitches",
      },
    ],
  },
  {
    id: "event4",
    name: "TechStart Job Fair at An-Najah University",
    date: "2023-08-05",
    images: [
      {
        src: "https://www.techstart.ps//public/files/resized/490x245/galleries/1366x768/15-1688625991.JPG",
        title: "Company Booths",
      },
      {
        src: "https://www.techstart.ps//public/files/resized/490x245/galleries/1366x768/14-1688625991.JPG",
        title: "Resume Workshop",
      },
      {
        src: "https://www.techstart.ps//public/files/resized/490x245/galleries/1366x768/13-1688625990.JPG",
        title: "Interview Practice",
      },
    ],
  },
];

export const PhotoGallery = ({ className }: { className?: string }) => {
  const [filteredEvents, setFilteredEvents] = useState(events);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const filtered = events.filter((event) =>
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
  }, [searchTerm, sortOrder]);

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
          title="TechStart Image Gallery"
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
              <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-white"
                  onClick={prevImage}
                >
                  <ChevronLeft size={36} />
                </Button>
              </div>
              <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-white"
                  onClick={nextImage}
                >
                  <ChevronRight size={36} />
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
