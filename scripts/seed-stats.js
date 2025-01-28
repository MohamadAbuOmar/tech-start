const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  try {
    await prisma.stat.deleteMany();
    
    const stats = [
      {
        name_en: "Local firms benefiting",
        name_ar: "الشركات المحلية المستفيدة",
        value: parseInt("150", 10),
        icon: "firms"
      },
      {
        name_en: "New IT jobs created",
        name_ar: "وظائف تكنولوجيا المعلومات الجديدة",
        value: parseInt("300", 10),
        icon: "jobs"
      },
      {
        name_en: "New firms established",
        name_ar: "الشركات الجديدة المؤسسة",
        value: parseInt("75", 10),
        icon: "new_firms"
      },
      {
        name_en: "Total awarded grants amounts",
        name_ar: "إجمالي مبالغ المنح الممنوحة",
        value: parseInt("500", 10),
        icon: "grants"
      }
    ];

    for (const stat of stats) {
      await prisma.stat.create({ data: stat });
    }
    
    console.log('Stats seeded successfully');
  } catch (error) {
    console.error('Error seeding stats:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main();
