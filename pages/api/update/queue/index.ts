import { NextApiRequest, NextApiResponse } from "next";
import db from "../../../../db";
import dayjs from "dayjs";
import { getLeetcodeStatsToSave, leetcodeStats } from "../../../../utils/leetcode";
import ILeetcodeUser from "../../../../@types/leetcode_user";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const updatedUsers = [];
  try {
    const limit = Number(req.query.limit) || 10;
    const age = Number(req.query.age) || 1 * 60 * 60;

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
      const userLeetcodeData = leetcodeStatsData.length!=0 && leetcodeStatsData[0];

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
                    create: getLeetcodeStatsToSave(userLeetcodeData),
                    update: getLeetcodeStatsToSave(userLeetcodeData),
                  },
                },
              }
            : {}),
        },
      });
      updatedUsers.push({
        username: user.leetcodeUsername,
        success:  leetcodeStatsData.length!=0
      });
    }

    return res.status(201).send(updatedUsers);
  } catch (error) {
    console.log(error);
    return res.status(500).send(updatedUsers);
  }
};


export default handler;
