// 1. Import the necessary Prisma modules
const { PrismaClient} = require("@prisma/client");
// 2. Instantiate the Prisma client
const prisma = new PrismaClient();

// 3. Define the migration script
async function main() {
  // 4. Run the migration
  const migration = await prisma.$queryRaw`
  ALTER TABLE "LeetcodeInfo" DROP COLUMN "contestRating";
  DROP COLUMN "contestAttended",
  DROP COLUMN "contestRanking";

`;
  console.log(migration);

  // 5. Update the data in the table (if needed)
  // const updateData = await prisma.leetcodeInfo.updateMany({
  //   where: {
  //     // Add any conditions here if you need to update specific rows
  //   },
  //   data: {
  //     contestRating: Infinity,
  //     contestAttended: Infinity,
  //     contestRanking: Infinity,
  //   },
  // });
  console.log(updateData);
}

// 6. Run the migration script
main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    // 7. Disconnect Prisma client
    await prisma.$disconnect();
  });