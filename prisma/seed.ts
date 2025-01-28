import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const stats = [
    {
      name_en: "Local firms benefiting",
      name_ar: "الشركات المحلية المستفيدة",
      value: 150,
      icon: "firms"
    },
    {
      name_en: "New IT jobs created",
      name_ar: "وظائف تكنولوجيا المعلومات الجديدة",
      value: 300,
      icon: "jobs"
    },
    {
      name_en: "New firms established",
      name_ar: "الشركات الجديدة المؤسسة",
      value: 75,
      icon: "new_firms"
    },
    {
      name_en: "Total awarded grants amounts",
      name_ar: "إجمالي مبالغ المنح الممنوحة",
      value: 500,
      icon: "grants"
    }
  ];

  for (const stat of stats) {
    await prisma.stat.create({
      data: stat
    });
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
