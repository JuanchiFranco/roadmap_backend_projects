import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  // Create some categories
  const categories = await prisma.category.createMany({
    data: [
      { name: 'Groceries' },
      { name: 'Leisure' },
      { name: 'Electronics' },
      { name: 'Utilities' },
      { name: 'Clothing' },
      { name: 'Health' },
      { name: 'Others' },
    ],
    skipDuplicates: true, // Skip duplicates if they already exist
  });

    console.log('Categories created:', categories);
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });