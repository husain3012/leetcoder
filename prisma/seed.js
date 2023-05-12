const {PrismaClient} = require("@prisma/client")
const {groups, users} = require("./seed_data")
const prisma = new PrismaClient();



async function seed() {

  await prisma.updateQueue.deleteMany()
  await prisma.leetcodeInfo.deleteMany()
  await prisma.user.deleteMany()
  await prisma.group.deleteMany()


  // return;
 
  


  for (const group of groups) {
    await prisma.group.create({
      data: group,
    });
  }


  for (const user of users) {
    await prisma.group.update({
      where:{
        inviteID: groups[0].inviteID
      },
      data: {
        members:{
          connectOrCreate:{
            where:{
              email: user.email
            },
            create:{
              email: user.email,
              name: user.name,
              leetcodeUsername: user.leetcodeUsername,
              lastUpdated: user.lastUpdated,
              lastAccessed: user.lastAccessed,
            }
          }
        }
      },
    });
  }



 
  console.log("Seeding completed.");
}

seed()
  .catch((error) => console.error(error))
  .finally(() => {
    prisma.$disconnect();
  });

