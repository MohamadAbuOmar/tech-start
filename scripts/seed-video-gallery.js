const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function seedVideoGallery() {
  try {
    const projectVideos = await prisma.videoGallery.create({
      data: {
        title_en: 'Project Videos',
        title_ar: 'فيديوهات المشروع',
        videos: {
          create: [
            {
              url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
              title_en: 'Tech Start Overview',
              title_ar: 'نظرة عامة على تك ستارت',
              description_en: 'Learn about our mission and impact',
              description_ar: 'تعرف على مهمتنا وتأثيرنا',
              type: 'youtube',
              featured: true
            }
          ]
        }
      }
    });

    const successStories = await prisma.videoGallery.create({
      data: {
        title_en: 'Success Stories',
        title_ar: 'قصص النجاح',
        videos: {
          create: [
            {
              url: 'https://www.youtube.com/watch?v=kJQP7kiw5Fk',
              title_en: 'Pioneer Success Story',
              title_ar: 'قصة نجاح بايونير',
              description_en: 'How Pioneer program transformed tech businesses',
              description_ar: 'كيف غير برنامج بايونير الشركات التقنية',
              type: 'youtube',
              featured: true
            },
            {
              url: 'https://www.youtube.com/watch?v=9bZkp7q19f0',
              title_en: 'Upskill Impact',
              title_ar: 'تأثير برنامج التطوير',
              description_en: 'The impact of our Upskill program',
              description_ar: 'تأثير برنامج التطوير المهني',
              type: 'youtube',
              featured: false
            }
          ]
        }
      }
    });

    console.log('Video gallery data seeded successfully');
  } catch (error) {
    console.error('Error seeding video gallery data:', error);
  } finally {
    await prisma.$disconnect();
  }
}

seedVideoGallery();
