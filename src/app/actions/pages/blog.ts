import { ApiResponse } from "@/types/api";
import { LocalizedPost } from "@/types/blog";
import db from "@/app/db/db";

export async function getBlogPosts(
  language: 'en' | 'ar'
): Promise<ApiResponse<LocalizedPost[]>> {
  try {
    const posts = await db.post.findMany({
      where: { published: true },
      include: { tags: true },
      orderBy: { createdAt: 'desc' }
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
      authorId: post.authorId,
      createdAt: post.createdAt,
      updatedAt: post.updatedAt,
      tags: post.tags.map(tag => ({
        id: tag.id,
        slug: tag.slug,
        name: language === 'en' ? tag.name_en : tag.name_ar
      }))
    }));

    return {
      success: true,
      data: localizedPosts
    };
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return {
      success: false,
      error: 'Failed to fetch blog posts'
    };
  }
}

export async function getFeaturedPosts(
  language: 'en' | 'ar'
): Promise<ApiResponse<LocalizedPost[]>> {
  try {
    const posts = await db.post.findMany({
      where: { published: true, featured: true },
      include: { tags: true },
      orderBy: { createdAt: 'desc' },
      take: 3
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
      authorId: post.authorId,
      createdAt: post.createdAt,
      updatedAt: post.updatedAt,
      tags: post.tags.map(tag => ({
        id: tag.id,
        slug: tag.slug,
        name: language === 'en' ? tag.name_en : tag.name_ar
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
}
