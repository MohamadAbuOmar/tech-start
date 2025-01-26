const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function seedAboutUs() {
  try {
    const aboutUs = await prisma.aboutUs.create({
      data: {
        titleEn: 'About Tech Start',
        titleAr: 'عن تك ستارت',
        descriptionEn: 'Tech Start is a pioneering initiative empowering Palestinian tech talent through innovative training and development programs.',
        descriptionAr: 'تك ستارت هي مبادرة رائدة تمكن المواهب التقنية الفلسطينية من خلال برامج تدريب وتطوير مبتكرة.',
        imageUrl: '/images/about/hero.jpg'
      }
    });
    console.log('Created AboutUs record:', aboutUs);
  } catch (error) {
    console.error('Error seeding AboutUs:', error);
  } finally {
    await prisma.$disconnect();
  }
}

seedAboutUs();
