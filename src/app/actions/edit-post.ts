"use server";

import { createPostSchema } from "@/lib/schema/schema";
import { revalidatePath } from "next/cache";
import { unlink } from 'fs/promises';
import path from 'path';
import db from "../db/db";

export async function editPost(id: number, formData: FormData) {
  const validatedFields = createPostSchema.safeParse({
    slug: formData.get("slug"),
    type: formData.get("type"),
    title_en: formData.get("title_en"),
    title_ar: formData.get("title_ar"),
    description_en: formData.get("description_en"),
    description_ar: formData.get("description_ar"),
    content_en: formData.get("content_en"),
    content_ar: formData.get("content_ar"),
    imageUrl: formData.get("imageUrl") || null,
    readTime: formData.get("readTime"),
    published: formData.get("published") === "true",
    featured: formData.get("featured") === "true",
    tags: formData.getAll("tags"),
  });

  if (!validatedFields.success) {
    return { error: validatedFields.error.flatten().fieldErrors };
  }

  try {
    const existingPost = await db.post.findUnique({
      where: { id },
      include: { tags: true },
    });

    if (!existingPost) {
      return { error: "Post not found" };
    }

    if (existingPost.imageUrl && existingPost.imageUrl !== validatedFields.data.imageUrl) {
      const oldImagePath = path.join(process.cwd(), 'public', existingPost.imageUrl);
      try {
        await unlink(oldImagePath);
      } catch (error) {
        console.error("Failed to delete old image file:", error);
      }
    }

    await db.post.update({
      where: { id },
      data: {
        ...validatedFields.data,
        imageUrl: validatedFields.data.imageUrl || null,
        tags: {
          set: validatedFields.data.tags.map(tagId => ({ 
            id: parseInt(tagId, 10)  // Convert string ID to number
          })),
        },
      },
    });

    revalidatePath("/admin/blog");
    return { success: true };
  } catch (error) {
    console.error("Failed to edit post:", error);
    return { error: "Failed to edit post. Please try again." };
  }
}

