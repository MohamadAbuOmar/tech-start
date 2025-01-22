"use server";

import db from "@/app/db/db";
import { revalidatePath } from "next/cache";

export async function createProgram(formData: FormData) {
  try {
    if (!formData.get("imageUrl")) {
      return { success: false, error: "Image is required" };
    }

    const program = await db.program.create({
      data: {
        name_en: formData.get("name_en") as string,
        name_ar: formData.get("name_ar") as string,
        description_en: formData.get("description_en") as string,
        description_ar: formData.get("description_ar") as string,
        imageUrl: formData.get("imageUrl") as string,
        nameColor: formData.get("nameColor") as string,
        descColor: formData.get("descColor") as string,
        order: parseInt(formData.get("order") as string) || 0,
      },
    });

    revalidatePath("/admin/pages/programs");
    return { success: true, data: program };
  } catch (error) {
    console.error("Failed to create program:", error);
    return { 
      success: false, 
      error: "Failed to create program. Please try again." 
    };
  }
}

export async function updateProgram(id: string, formData: FormData) {
  try {
    const program = await db.program.update({
      where: { id },
      data: {
        name_en: formData.get("name_en") as string,
        name_ar: formData.get("name_ar") as string,
        description_en: formData.get("description_en") as string,
        description_ar: formData.get("description_ar") as string,
        imageUrl: formData.get("imageUrl") as string,
        nameColor: formData.get("nameColor") as string,
        descColor: formData.get("descColor") as string,
        order: parseInt(formData.get("order") as string) || 0,
      },
    });
    revalidatePath("/admin/pages/programs");
    return { success: true, data: program };
  } catch (error) {
    console.error("Failed to update program:", error);
    return { success: false, error: "Failed to update program" };
  }
}

export async function deleteProgram(id: string) {
  try {
    await db.program.delete({ where: { id } });
    revalidatePath("/admin/pages/programs");
    return { success: true };
  } catch (error) {
    console.error("Failed to delete program:", error);
    return { success: false, error: "Failed to delete program" };
  }
}

export async function getPrograms() {
  try {
    const programs = await db.program.findMany({
      orderBy: { order: "asc" },
    });
    return { success: true, data: programs };
  } catch (error) {
    console.error("Failed to fetch programs:", error);
    return { success: false, error: "Failed to fetch programs" };
  }
}

export async function getProgram(id: string) {
  try {
    const program = await db.program.findUnique({
      where: { id },
    });
    return { success: true, data: program };
  } catch (error) {
    console.error("Failed to fetch program:", error);
    return { success: false, error: "Failed to fetch program" };
  }
}
