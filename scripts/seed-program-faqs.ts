import { PrismaClient } from "@prisma/client";
const db = new PrismaClient();

async function createProgramFaqCategories() {
  try {
    // Create Pioneer Program FAQ Category
    const pioneerCategory = await db.faqCategory.create({
      data: {
        nameEn: "Pioneer Program",
        nameAr: "برنامج بايونير",
        slug: "pioneer-program",
        order: 10
      }
    });

    // Create Upskill Program FAQ Category
    const upskillCategory = await db.faqCategory.create({
      data: {
        nameEn: "Upskill Program",
        nameAr: "برنامج التطوير المهني",
        slug: "upskill-program",
        order: 11
      }
    });

    console.log("Successfully created program FAQ categories:", {
      pioneer: pioneerCategory.id,
      upskill: upskillCategory.id
    });
  } catch (error) {
    console.error("Error creating program FAQ categories:", error);
  }
}

createProgramFaqCategories()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
