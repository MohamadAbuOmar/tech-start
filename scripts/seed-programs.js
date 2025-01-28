const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  try {
    await prisma.program.deleteMany();
    
    const programs = [
      {
        name_en: "Pioneer Program",
        name_ar: "برنامج بايونير",
        description_en: "Supporting innovative tech startups and entrepreneurs through comprehensive resources and mentorship.",
        description_ar: "دعم الشركات الناشئة في مجال التكنولوجيا ورواد الأعمال من خلال الموارد والتوجيه الشامل.",
        imageUrl: "/assets/programs/pioneer.jpg",
        slug: "pioneer",
        order: 0
      },
      {
        name_en: "Upskill Program",
        name_ar: "برنامج تطوير المهارات",
        description_en: "Enhancing tech talent through specialized training and industry-focused development programs.",
        description_ar: "تعزيز المواهب التقنية من خلال التدريب المتخصص وبرامج التطوير التي تركز على الصناعة.",
        imageUrl: "/assets/programs/upskill.jpg",
        slug: "upskill",
        order: 1
      },
      {
        name_en: "Infrastructure Support",
        name_ar: "دعم البنية التحتية",
        description_en: "Building robust IT infrastructure to support digital transformation initiatives.",
        description_ar: "بناء بنية تحتية قوية لتكنولوجيا المعلومات لدعم مبادرات التحول الرقمي.",
        imageUrl: "/assets/programs/infrastructure.jpg",
        slug: "infrastructure",
        order: 2
      }
    ];

    for (const program of programs) {
      await prisma.program.create({ data: program });
    }
    
    console.log('Programs seeded successfully');
  } catch (error) {
    console.error('Error seeding programs:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main();
