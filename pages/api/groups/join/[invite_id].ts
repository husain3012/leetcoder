import { nanoid } from "nanoid";
import { ApiError } from "next/dist/server/api-utils";
import db from "../../../../db";
import type { NextApiRequest, NextApiResponse } from "next";
import IUser from "../../../../@types/user";
import dayjs from "dayjs";
import { leetcodeStats, getLeetcodeStatsToSave} from "../../../../utils";
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case "POST":
      await postHandler(req, res);

      break;

    default:
      return res.send(404);
      break;
  }
};

const postHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { email, name, leetcodeUsername }: IUser = req.body;
  const inviteID = (req.query.invite_id as string) || "";

  try {

    const initialLeetcodeDataFound =  await leetcodeStats([leetcodeUsername]);
    if(initialLeetcodeDataFound.length==0) throw new ApiError(500, "Something went wrong, check your leetcode username once or try again later")

    const leetcodeStatsData = getLeetcodeStatsToSave(initialLeetcodeDataFound[0]);


    
   

    const userToJoin = await db.user.upsert({
      where:{
        leetcodeUsername
      },
      create:{
        email,
        leetcodeUsername,
        name,
        lastUpdated: dayjs().toDate(),
        lastAccessed: dayjs().toDate(),
        leetcodeStats:{
          create:{
            ...leetcodeStatsData
          }
        }
      },
      update:{
        leetcodeUsername,
        name,
        lastUpdated: dayjs().toDate(),
        lastAccessed: dayjs().toDate(),
        leetcodeStats:{
          upsert:{
            create:{
              ...leetcodeStatsData
            },
            update:{
              ...leetcodeStatsData
            }
          }
        }
      }
    })
    const foundGroup = await db.group.update({
      where: {
        inviteID,
      },
      data: {
        members: {
          connect:{
            id: userToJoin.id
          }
        },
      },
      include: {
        members: true
      }
    });

    return res.json(foundGroup);
  } catch (error) {
    res
      .status(error.status || 500)
      .send(error.message || "Something went wrong, Try Again Later");
  }
};

export default handler;
