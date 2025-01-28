"use server";

// Runtime configuration handled in route segments

import { cache } from "react";
import db from "@/app/db/db";
import { ApiResponse } from "@/types/api";

export interface LocalizedImage {
  id: string;
  url: string;
  title: string | null;
  featured: boolean;
  type: string;
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
  featured: boolean;
}

export interface LocalizedVideoGallery {
  id: string;
  title: string;
  videos: LocalizedVideo[];
}

export const getGalleries = cache(async (language: 'en' | 'ar' = 'en'): Promise<ApiResponse<LocalizedGallery[]>> => {
  try {
    const galleries = await db.gallery.findMany({
      include: {
        images: true
      },
      orderBy: { createdAt: 'desc' },
    });

    const localizedGalleries = galleries.map(gallery => ({
      id: gallery.id,
      title: language === 'en' ? gallery.title_en : gallery.title_ar,
      images: gallery.images.map(image => ({
        id: image.id,
        url: image.url,
        title: image.title_en && image.title_ar ? 
          (language === 'en' ? image.title_en : image.title_ar) : 
          null,
        featured: image.featured ?? false,
        type: image.type ?? 'image'
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
        type: video.type ?? 'local',
        featured: video.featured ?? false
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
