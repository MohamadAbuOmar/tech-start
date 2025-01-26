"use server";

// Set runtime to nodejs to avoid edge runtime issues
import { cache } from "react";
import db from "@/app/db/db";
import { ApiResponse } from "@/types/api";

export interface LocalizedMediaItem {
  id: string;
  title: string;
  description?: string;
  imageUrl: string;
  type: "news" | "press" | "gallery" | "video";
  link: string;
}

export const getMediaItems = cache(async (language: 'en' | 'ar' = 'en'): Promise<ApiResponse<LocalizedMediaItem[]>> => {
  try {
    const [latestPost, latestPress, latestGallery, latestVideo] = await Promise.all([
      db.post.findFirst({
        where: { type: 'news', published: true },
        orderBy: { createdAt: 'desc' }
      }),
      db.post.findFirst({
        where: { type: 'press', published: true },
        orderBy: { createdAt: 'desc' }
      }),
      db.gallery.findFirst({
        include: { images: { take: 1 } },
        orderBy: { createdAt: 'desc' }
      }),
      db.video.findFirst({
        orderBy: { createdAt: 'desc' }
      })
    ]);

    const mediaItems: LocalizedMediaItem[] = [];

    if (latestPost) {
      mediaItems.push({
        id: latestPost.id.toString(),
        title: language === 'en' ? latestPost.title_en : latestPost.title_ar,
        description: language === 'en' ? latestPost.description_en : latestPost.description_ar,
        imageUrl: latestPost.imageUrl || '/assets/img30.jpg',
        type: 'news',
        link: '/news'
      });
    }

    if (latestPress) {
      mediaItems.push({
        id: latestPress.id.toString(),
        title: language === 'en' ? latestPress.title_en : latestPress.title_ar,
        description: language === 'en' ? latestPress.description_en : latestPress.description_ar,
        imageUrl: latestPress.imageUrl || '/assets/img29.jpg',
        type: 'press',
        link: '/press'
      });
    }

    if (latestGallery) {
      mediaItems.push({
        id: latestGallery.id,
        title: language === 'en' ? latestGallery.title_en : latestGallery.title_ar,
        imageUrl: latestGallery.images[0]?.url || '/assets/img28.jpg',
        type: 'gallery',
        link: '/gallery'
      });
    }

    if (latestVideo) {
      mediaItems.push({
        id: latestVideo.id,
        title: language === 'en' ? latestVideo.title_en : latestVideo.title_ar,
        description: language === 'en' ? latestVideo.description_en : latestVideo.description_ar,
        imageUrl: '/assets/img27.jpg',
        type: 'video',
        link: '/videos'
      });
    }

    return {
      success: true,
      data: mediaItems
    };
  } catch (error) {
    console.error('Error fetching media items:', error);
    return {
      success: false,
      error: 'Failed to fetch media items'
    };
  }
});
