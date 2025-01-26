"use server";

// Runtime configuration handled in route segments

import { cache } from "react";
import db from "@/app/db/db";
import { ApiResponse } from "@/types/api";

export interface LocalizedTag {
  id: number;
  name: string;
  slug: string;
}

export interface LocalizedPost {
  id: number;
  slug: string;
  type: string;
  title: string;
  description: string | null;
  content: string;
  imageUrl: string | null;
  readTime: string | null;
  published: boolean;
  featured: boolean;
  createdAt: Date;
  updatedAt: Date;
  tags: LocalizedTag[];
}

export const getPosts = cache(async (language: 'en' | 'ar' = 'en'): Promise<ApiResponse<LocalizedPost[]>> => {
  try {
    const posts = await db.post.findMany({
      include: {
        tags: true
      },
      where: {
        published: true
      },
      orderBy: { createdAt: 'desc' },
    });

    const localizedPosts = posts.map(post => ({
      id: post.id,
      slug: post.slug,
      type: post.type,
      title: language === 'en' ? post.title_en : post.title_ar,
      description: post.description_en && post.description_ar ? 
        (language === 'en' ? post.description_en : post.description_ar) : 
        null,
      content: language === 'en' ? post.content_en : post.content_ar,
      imageUrl: post.imageUrl,
      readTime: post.readTime,
      published: post.published,
      featured: post.featured,
      createdAt: post.createdAt,
      updatedAt: post.updatedAt,
      tags: post.tags.map(tag => ({
        id: tag.id,
        name: language === 'en' ? tag.name_en : tag.name_ar,
        slug: tag.slug,
      }))
    }));

    return {
      success: true,
      data: localizedPosts
    };
  } catch (error) {
    console.error('Error fetching posts:', error);
    return {
      success: false,
      error: 'Failed to fetch posts'
    };
  }
});

export const getAnnouncements = cache(async (language: 'en' | 'ar' = 'en'): Promise<ApiResponse<LocalizedPost[]>> => {
  try {
    const posts = await db.post.findMany({
      include: { tags: true },
      where: {
        published: true,
        type: 'announcement'
      },
      orderBy: { createdAt: 'desc' },
    });

    const localizedPosts = posts.map(post => ({
      id: post.id,
      slug: post.slug,
      type: post.type,
      title: language === 'en' ? post.title_en : post.title_ar,
      description: post.description_en && post.description_ar ? 
        (language === 'en' ? post.description_en : post.description_ar) : 
        null,
      content: language === 'en' ? post.content_en : post.content_ar,
      imageUrl: post.imageUrl,
      readTime: post.readTime,
      published: post.published,
      featured: post.featured,
      createdAt: post.createdAt,
      updatedAt: post.updatedAt,
      tags: post.tags.map(tag => ({
        id: tag.id,
        name: language === 'en' ? tag.name_en : tag.name_ar,
        slug: tag.slug,
      }))
    }));

    return {
      success: true,
      data: localizedPosts
    };
  } catch (error) {
    console.error('Error fetching announcements:', error);
    return {
      success: false,
      error: 'Failed to fetch announcements'
    };
  }
});

export const getPublications = cache(async (language: 'en' | 'ar' = 'en'): Promise<ApiResponse<LocalizedPost[]>> => {
  try {
    const posts = await db.post.findMany({
      include: { tags: true },
      where: {
        published: true,
        type: 'publication'
      },
      orderBy: { createdAt: 'desc' },
    });

    const localizedPosts = posts.map(post => ({
      id: post.id,
      slug: post.slug,
      type: post.type,
      title: language === 'en' ? post.title_en : post.title_ar,
      description: post.description_en && post.description_ar ? 
        (language === 'en' ? post.description_en : post.description_ar) : 
        null,
      content: language === 'en' ? post.content_en : post.content_ar,
      imageUrl: post.imageUrl,
      readTime: post.readTime,
      published: post.published,
      featured: post.featured,
      createdAt: post.createdAt,
      updatedAt: post.updatedAt,
      tags: post.tags.map(tag => ({
        id: tag.id,
        name: language === 'en' ? tag.name_en : tag.name_ar,
        slug: tag.slug,
      }))
    }));

    return {
      success: true,
      data: localizedPosts
    };
  } catch (error) {
    console.error('Error fetching publications:', error);
    return {
      success: false,
      error: 'Failed to fetch publications'
    };
  }
});

export const getAllContent = cache(async (language: 'en' | 'ar' = 'en'): Promise<ApiResponse<LocalizedPost[]>> => {
  try {
    const posts = await db.post.findMany({
      include: { tags: true },
      where: {
        published: true,
      },
      orderBy: { createdAt: 'desc' },
    });

    const localizedPosts = posts.map(post => ({
      id: post.id,
      slug: post.slug,
      type: post.type,
      title: language === 'en' ? post.title_en : post.title_ar,
      description: post.description_en && post.description_ar ? 
        (language === 'en' ? post.description_en : post.description_ar) : 
        null,
      content: language === 'en' ? post.content_en : post.content_ar,
      imageUrl: post.imageUrl,
      readTime: post.readTime,
      published: post.published,
      featured: post.featured,
      createdAt: post.createdAt,
      updatedAt: post.updatedAt,
      tags: post.tags.map(tag => ({
        id: tag.id,
        name: language === 'en' ? tag.name_en : tag.name_ar,
        slug: tag.slug,
      }))
    }));

    return {
      success: true,
      data: localizedPosts
    };
  } catch (error) {
    console.error('Error fetching all content:', error);
    return {
      success: false,
      error: 'Failed to fetch all content'
    };
  }
});

export const getFeaturedPosts = cache(async (language: 'en' | 'ar' = 'en'): Promise<ApiResponse<LocalizedPost[]>> => {
  try {
    const featuredPosts = await db.post.findMany({
      include: {
        tags: true
      },
      where: {
        published: true,
        featured: true
      },
      orderBy: { createdAt: 'desc' },
    });

    const localizedPosts = featuredPosts.map(post => ({
      id: post.id,
      slug: post.slug,
      type: post.type,
      title: language === 'en' ? post.title_en : post.title_ar,
      description: post.description_en && post.description_ar ? 
        (language === 'en' ? post.description_en : post.description_ar) : 
        null,
      content: language === 'en' ? post.content_en : post.content_ar,
      imageUrl: post.imageUrl,
      readTime: post.readTime,
      published: post.published,
      featured: post.featured,
      createdAt: post.createdAt,
      updatedAt: post.updatedAt,
      tags: post.tags.map(tag => ({
        id: tag.id,
        name: language === 'en' ? tag.name_en : tag.name_ar,
        slug: tag.slug,
      }))
    }));

    return {
      success: true,
      data: localizedPosts
    };
  } catch (error) {
    console.error('Error fetching featured posts:', error);
    return {
      success: false,
      error: 'Failed to fetch featured posts'
    };
  }
});
