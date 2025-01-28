const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  try {
    await prisma.beneficiary.deleteMany();
    await prisma.category.deleteMany();
    
    const categories = await prisma.category.createMany({
      data: [
        {
          name_en: "Palestine Leads",
          name_ar: "فلسطين تقود",
          slug: "palestine-leads",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name_en: "Tech Innovators",
          name_ar: "مبتكرو التكنولوجيا",
          slug: "tech-innovators",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name_en: "Digital Entrepreneurs",
          name_ar: "رواد الأعمال الرقميين",
          slug: "digital-entrepreneurs",
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ]
    });

    const allCategories = await prisma.category.findMany();

    for (const category of allCategories) {
      await prisma.beneficiary.create({
        data: {
          title_en: `Success Story - ${category.name_en}`,
          title_ar: `قصة نجاح - ${category.name_ar}`,
          description_en: `Inspiring journey of innovation and growth in the ${category.name_en} program`,
          description_ar: `رحلة ملهمة من الابتكار والنمو في برنامج ${category.name_ar}`,
          longDescription_en: `A remarkable success story showcasing the transformative impact of our ${category.name_en} initiative. Through dedication and support, this beneficiary has achieved significant milestones in their professional journey.`,
          longDescription_ar: `قصة نجاح رائعة تُظهر التأثير التحويلي لمبادرة ${category.name_ar}. من خلال التفاني والدعم، حقق هذا المستفيد إنجازات مهمة في رحلته المهنية.`,
          imageUrl: `/assets/beneficiaries/${category.slug}.jpg`,
          ctaText: "Read More",
          ctaLink: `/beneficiaries/${category.slug}`,
          categoryId: category.id,
          createdAt: new Date(),
          updatedAt: new Date()
        }
      });
    }
    
    console.log('Beneficiaries and categories seeded successfully');
  } catch (error) {
    console.error('Error seeding beneficiaries:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main();
