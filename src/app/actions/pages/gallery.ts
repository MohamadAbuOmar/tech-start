"use server";

// Runtime configuration handled in route segments
import { cache } from "react";
import { PrismaClient } from "@prisma/client";
import { ApiResponse } from "@/types/api";

const db = new PrismaClient();

export interface LocalizedImage {
  id: string;
  url: string;
  title: string | null;
  featured: boolean;
}

export interface LocalizedGallery {
  id: string;
  title: string;
  images: LocalizedImage[];
}

export interface LocalizedVideo {
  id: string;
  url: string;
  title: string;
  description: string | null;
  type: string;
}

export interface LocalizedVideoGallery {
  id: string;
  title: string;
  videos: LocalizedVideo[];
}

export const validateAndFixFeaturedImages = async (galleryId: string) => {
  const gallery = await db.gallery.findUnique({
    where: { id: galleryId },
    include: { images: true }
  });

  if (!gallery) {
    throw new Error('Gallery not found');
  }

  const featuredImages = gallery.images.filter(img => img.featured);
  
  if (featuredImages.length === 1) {
    return; // Already valid
  }

  // Auto-correct: make the first image featured if none are featured
  if (featuredImages.length === 0 && gallery.images.length > 0) {
    await db.image.update({
      where: { id: gallery.images[0].id },
      data: { featured: true }
    });
  }

  // If multiple featured images, keep only the first one featured
  if (featuredImages.length > 1) {
    await Promise.all(featuredImages.slice(1).map(img => 
      db.image.update({
        where: { id: img.id },
        data: { featured: false }
      })
    ));
  }
};

export const getGalleries = cache(async (language: 'en' | 'ar' = 'en'): Promise<ApiResponse<LocalizedGallery[]>> => {
  try {
    const galleries = await db.gallery.findMany({
      include: {
        images: {
          orderBy: {
            featured: 'desc'
          }
        }
      },
      orderBy: { createdAt: 'desc' },
    });

    // Validate featured images in parallel
    await Promise.all(galleries.map(gallery => validateAndFixFeaturedImages(gallery.id)));

    const localizedGalleries = galleries.map(gallery => ({
      id: gallery.id,
      title: language === 'en' ? gallery.title_en : gallery.title_ar,
      images: gallery.images.map(image => ({
        id: image.id,
        url: image.url,
        title: image.title_en && image.title_ar ? 
          (language === 'en' ? image.title_en : image.title_ar) : 
          null,
        featured: image.featured
      }))
    }));

    return {
      success: true,
      data: localizedGalleries
    };
  } catch (error) {
    console.error('Error fetching galleries:', error);
    return {
      success: false,
      error: 'Failed to fetch galleries'
    };
  }
});

export const addImageToGallery = async (galleryId: string, imageUrl: string, title_en: string, title_ar: string): Promise<ApiResponse<LocalizedImage>> => {
  try {
    const image = await db.image.create({
      data: {
        url: imageUrl,
        title_en,
        title_ar,
        galleryId,
        featured: false
      }
    });

    return {
      success: true,
      data: {
        id: image.id,
        url: image.url,
        title: image.title_en,
        featured: image.featured
      }
    };
  } catch (error) {
    console.error('Error adding image to gallery:', error);
    return {
      success: false,
      error: 'Failed to add image to gallery'
    };
  }
};

export const getGalleryPhotos = cache(async (language: 'en' | 'ar' = 'en'): Promise<ApiResponse<LocalizedGallery[]>> => {
  return getGalleries(language);
});

export const getGalleryVideos = cache(async (language: 'en' | 'ar' = 'en'): Promise<ApiResponse<LocalizedVideoGallery[]>> => {
  return getVideoGalleries(language);
});

export const getVideoGalleries = cache(async (language: 'en' | 'ar' = 'en'): Promise<ApiResponse<LocalizedVideoGallery[]>> => {
  try {
    const videoGalleries = await db.videoGallery.findMany({
      include: {
        videos: true
      },
      orderBy: { createdAt: 'desc' },
    });

    const localizedVideoGalleries = videoGalleries.map(gallery => ({
      id: gallery.id,
      title: language === 'en' ? gallery.title_en : gallery.title_ar,
      videos: gallery.videos.map(video => ({
        id: video.id,
        url: video.url,
        title: language === 'en' ? video.title_en : video.title_ar,
        description: video.description_en && video.description_ar ? 
          (language === 'en' ? video.description_en : video.description_ar) : 
          null,
        type: video.type
      }))
    }));

    return {
      success: true,
      data: localizedVideoGalleries
    };
  } catch (error) {
    console.error('Error fetching video galleries:', error);
    return {
      success: false,
      error: 'Failed to fetch video galleries'
    };
  }
});
