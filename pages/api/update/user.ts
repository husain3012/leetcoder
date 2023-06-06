import { NextApiRequest, NextApiResponse } from "next";
import {initializeDB} from "../../../db";
import dayjs from "dayjs";
import { getLeetcodeStatsToSave, leetcodeStats } from "../../../utils/leetcode";
import { ApiError } from "next/dist/server/api-utils";


const db = initializeDB();

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const username = req.query.username as string;
    const leetcodeUserData = await leetcodeStats([username]);
    if(leetcodeUserData.length==0) throw new ApiError(404, "Could not find leetcode profile for the user")
    const userData = getLeetcodeStatsToSave(leetcodeUserData[0]);
    const updatedUser = await db.user.update({
        where:{
            leetcodeUsername: username
        },
        data:{
            lastUpdated: dayjs().toDate(),
            leetcodeStats:{
                upsert:{
                    create: userData,
                    update: userData
                }
            }
        },
        include:{
          leetcodeStats: true
        }
    })
  
    return res.status(201).send(updatedUser);
  } catch (error) {
    console.log(error);
    return res.status(500).send(error.message);
  }
};


export default handler;
