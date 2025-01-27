import { z } from "zod";

export const programFormSchema = z.object({
  type: z.enum(["PIONEER", "UPSKILL"]),
  name_en: z.string().min(3, "Name must be at least 3 characters"),
  name_ar: z.string().min(3, "Name must be at least 3 characters"),
  description_en: z.string().min(10, "Description must be at least 10 characters"),
  description_ar: z.string().min(10, "Description must be at least 10 characters"),
  nameColor: z.string().min(4),
  descColor: z.string().min(4),
  order: z.coerce.number().min(0),
  imageUrl: z.string().nullable(),
  badge_en: z.string().min(2, "Badge text must be at least 2 characters"),
  badge_ar: z.string().min(2, "Badge text must be at least 2 characters"),
  heroTitle_en: z.string().min(3, "Hero title must be at least 3 characters"),
  heroTitle_ar: z.string().min(3, "Hero title must be at least 3 characters"),
  heroDesc_en: z.string().min(10, "Hero description must be at least 10 characters"),
  heroDesc_ar: z.string().min(10, "Hero description must be at least 10 characters"),
  heroImage: z.string().nullable(),
  overview_en: z.string().min(10, "Overview must be at least 10 characters"),
  overview_ar: z.string().min(10, "Overview must be at least 10 characters"),
  features: z.array(z.object({
    icon: z.string(),
    title_en: z.string().min(3),
    title_ar: z.string().min(3),
    description_en: z.string().min(10),
    description_ar: z.string().min(10),
  }))
});

export type ProgramFormValues = z.infer<typeof programFormSchema>;
