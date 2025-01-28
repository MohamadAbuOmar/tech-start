const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function seedBlog() {
  try {
    const techTag = await prisma.tag.create({
      data: {
        slug: 'technology',
        name_en: 'Technology',
        name_ar: 'تكنولوجيا'
      }
    });

    const newsTag = await prisma.tag.create({
      data: {
        slug: 'news',
        name_en: 'News',
        name_ar: 'أخبار'
      }
    });

    await prisma.post.create({
      data: {
        slug: 'tech-start-launches-new-programs',
        type: 'article',
        title_en: 'Tech Start Launches New Programs',
        title_ar: 'تك ستارت تطلق برامج جديدة',
        description_en: 'Exciting new opportunities for tech professionals in Palestine',
        description_ar: 'فرص جديدة مثيرة لمحترفي التكنولوجيا في فلسطين',
        content_en: 'Tech Start is proud to announce the launch of several new programs...',
        content_ar: 'يسر تك ستارت أن تعلن عن إطلاق العديد من البرامج الجديدة...',
        imageUrl: '/assets/blog/new-programs.jpg',
        readTime: '5 min',
        published: true,
        featured: true,
        tags: {
          connect: [{ id: techTag.id }, { id: newsTag.id }]
        }
      }
    });

    console.log('Blog data seeded successfully');
  } catch (error) {
    console.error('Error seeding blog data:', error);
  } finally {
    await prisma.$disconnect();
  }
}

seedBlog();
