import db from "../db";
import dayjs from "dayjs";
import { getLeetcodeStatsToSave, leetcodeStats } from "./leetcode";
export const updateQueue = async (
  limit: number,
  age: number,
  timeout: number = 0
) => {
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

    console.log("Currently processing: ", usersToUpdate);

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
  return updatedUsers;
};
