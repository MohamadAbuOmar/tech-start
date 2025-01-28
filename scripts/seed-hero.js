const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  try {
    console.log('Deleting existing hero steps...');
    await prisma.heroStep.deleteMany();
    
    const heroSteps = [
      {
        title_en: "Innovation Hub",
        title_ar: "مركز الابتكار",
        tagline_en: "Empowering Innovation",
        tagline_ar: "تمكين الابتكار",
        description_en: "Fostering innovation and entrepreneurship in the tech sector through comprehensive support and resources.",
        description_ar: "تعزيز الابتكار وريادة الأعمال في قطاع التكنولوجيا من خلال الدعم والموارد الشاملة.",
        color: "#142451",
        imageUrl: "/assets/hero/innovation-hub.jpg",
        order: 0
      },
      {
        title_en: "Market Growth",
        title_ar: "نمو السوق",
        tagline_en: "Expanding Horizons",
        tagline_ar: "توسيع الآفاق",
        description_en: "Supporting tech companies to scale and access new markets through strategic partnerships.",
        description_ar: "دعم شركات التكنولوجيا للتوسع والوصول إلى أسواق جديدة من خلال الشراكات الاستراتيجية.",
        color: "#862996",
        imageUrl: "/assets/hero/market-growth.jpg",
        order: 1
      },
      {
        title_en: "Talent Development",
        title_ar: "تطوير المواهب",
        tagline_en: "Building Skills",
        tagline_ar: "بناء المهارات",
        description_en: "Developing tech talent through training programs and industry partnerships.",
        description_ar: "تطوير المواهب التقنية من خلال برامج التدريب والشراكات الصناعية.",
        color: "#1b316e",
        imageUrl: "/assets/hero/talent-development.jpg",
        order: 2
      },
      {
        title_en: "IT Infrastructure",
        title_ar: "البنية التحتية لتكنولوجيا المعلومات",
        tagline_en: "Digital Foundation",
        tagline_ar: "الأساس الرقمي",
        description_en: "Building robust IT infrastructure to support digital transformation.",
        description_ar: "بناء بنية تحتية قوية لتكنولوجيا المعلومات لدعم التحول الرقمي.",
        color: "#862996",
        imageUrl: "/assets/hero/it-infrastructure.jpg",
        order: 3
      }
    ];

    console.log('Creating new hero steps...');
    for (const step of heroSteps) {
      const created = await prisma.heroStep.create({ data: step });
      console.log(`Created hero step: ${step.title_en}`);
    }
    
    console.log('Hero steps seeded successfully');
  } catch (error) {
    console.error('Error seeding hero steps:', error);
    console.error('Error details:', error.message);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main();
