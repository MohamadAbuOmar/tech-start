"use server";

import { createPostSchema } from "@/lib/schema/schema";
import db from "../db/db";
import { revalidatePath } from "next/cache";

export async function createPost(formData: FormData) {
  console.log("Received formData:", Object.fromEntries(formData));

  if (!formData) {
    console.error("FormData is null or undefined");
    return { error: "Invalid form data" };
  }

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
    console.error("Validation error:", validatedFields.error);
    return { error: validatedFields.error.flatten().fieldErrors };
  }

  try {
    const post = await db.post.create({
      data: {
        ...validatedFields.data,
        imageUrl: validatedFields.data.imageUrl || null,
        tags: {
          connectOrCreate:
            validatedFields.data.tags?.map((tag) => ({
              where: { name: tag },
              create: {
                name: tag,
                slug: tag.toLowerCase().replace(/\s+/g, "-"),
              },
            })) || [],
        },
      },
    });
    console.log("Post created successfully:", post);
    revalidatePath("/admin/blog");
    return { success: true, post };
  } catch (error) {
    console.error("Failed to create post:", error);
    return { error: "Failed to create post" };
  }
}

