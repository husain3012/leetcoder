import { PrismaClient } from "@prisma/client";
import dayjs from "dayjs";
import { leetcodeStats, getLeetcodeStatsToSave } from "./utils";
import cron from "node-cron"
const db = new PrismaClient();
let isFunctionRunning = false;
const updateQueue = async (age = 1000, limit = 10, timeout = 200) => {
  console.log(`age: ${age}, limit: ${limit}, timeout: ${timeout}`)
  let updatedUsers = [];
  try {
    const usersToUpdate = await db.user.findMany({
      where: {
        lastUpdated: {
          lte: dayjs().subtract(age, "seconds").toDate(),
        },
      },
      select: {
        lastAccessed: true,
        lastUpdated: true,
        leetcodeUsername: true,
        id: true,
      },
      orderBy: {
        lastUpdated: "asc",
      },
      take: limit,
    });

console.log(`Currently processing ${usersToUpdate.length} users:  `, usersToUpdate.map(u=>u.leetcodeUsername));

    for (let user of usersToUpdate) {
      const leetcodeStatsData = await leetcodeStats([user.leetcodeUsername]);
      const userLeetcodeData =
        leetcodeStatsData.length != 0 && leetcodeStatsData[0];
      const leetcodeStatsToSave = getLeetcodeStatsToSave(userLeetcodeData);

      await db.user.update({
        where: {
          id: user.id,
        },
        data: {
          lastUpdated: dayjs().toDate(),
          ...(leetcodeStatsData.length != 0
            ? {
                leetcodeStats: {
                  upsert: {
                    update: leetcodeStatsToSave,
                    create: leetcodeStatsToSave,
                  },
                },
              }
            : {}),
        },
      });
      updatedUsers.push({
        username: user.leetcodeUsername,
        success: leetcodeStatsData.length != 0,
      });
      await new Promise((resolve) => setTimeout(resolve, timeout));
    }
  } catch (error) {
    console.log(error);
  }
  console.log("Done ✅")
};

cron.schedule('*/2 * * * *', async ()=> {
  console.log("⏲️ Triggering CRON JOB!")
  if(isFunctionRunning) {
    console.log("⚠️ Job skipped: ALREADY RUNNING")
  };
 isFunctionRunning = true;

 await updateQueue(100, 50, Math.floor(200+Math.random()*100))
 isFunctionRunning = false;


})