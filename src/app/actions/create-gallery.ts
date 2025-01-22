"use server";

import { createGallerySchema } from "@/lib/schema/schema";
import { revalidatePath } from "next/cache";
import db from "../db/db";
import fs from 'fs/promises';
import path from 'path';

export async function createGallery(formData: FormData) {
  const rawData = {
    title_en: formData.get("title_en"),
    title_ar: formData.get("title_ar"),
    date: formData.get("date"),
    imageUrls: formData.getAll("imageUrls"),
    imageTitles_en: formData.getAll("imageTitles_en"),
    imageTitles_ar: formData.getAll("imageTitles_ar"),
  };

  const validatedFields = createGallerySchema.safeParse(rawData);

  if (!validatedFields.success) {
    return {
      success: false,
      error: validatedFields.error.flatten().fieldErrors,
    };
  }

  try {
    const gallery = await db.gallery.create({
      data: {
        title_en: validatedFields.data.title_en,
        title_ar: validatedFields.data.title_ar,
        createdAt: new Date(validatedFields.data.date),
        images: {
          create: validatedFields.data.imageUrls.map((url, index) => ({
            url,
            title_en: validatedFields.data.imageTitles_en[index] || null,
            title_ar: validatedFields.data.imageTitles_ar[index] || null,
          })),
        },
      },
      include: {
        images: true,
      },
    });

    revalidatePath("/admin/ImageGallery");
    return { success: true, gallery };
  } catch (error) {
    console.error("Failed to create gallery:", error);
    return { success: false, error: "Failed to create gallery" };
  }
}

export async function deleteGallery(id: string) {
  try {
    // Use transaction for atomic operations
    const result = await db.$transaction(async (tx) => {
      const gallery = await tx.gallery.findUnique({
        where: { id },
        include: { images: true },
      });

      if (!gallery) {
        throw new Error('Gallery not found');
      }

      // Delete all images first
      await tx.image.deleteMany({
        where: { galleryId: id },
      });

      // Then delete the gallery
      await tx.gallery.delete({
        where: { id },
      });

      return gallery;
    });

    // Delete files after successful DB operation
    if (result.images) {
      for (const image of result.images) {
        if (!image.url) continue;
        const imagePath = path.join(process.cwd(), 'public', image.url.replace(/^\//, ''));
        try {
          await fs.access(imagePath);
          await fs.unlink(imagePath);
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (error) {
          console.log(`Could not delete file: ${imagePath}`);
        }
      }
    }

    revalidatePath('/admin/ImageGallery');
    return { success: true };

  } catch (error) {
    console.error('Error in deleteGallery:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to delete gallery'
    };
  }
}