import { nanoid } from "nanoid";
import { ApiError } from "next/dist/server/api-utils";
import db from "../../../../db";
import type { NextApiRequest, NextApiResponse } from "next";
import IUser from "../../../../@types/user";

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
    const foundGroup = await db.group.update({
      where: {
        inviteID,
      },
      data: {
        members: {
          connectOrCreate: {
            where: {
              email,
            },
            create: {
              email,
              name,
              leetcodeUsername,
              lastAccessed: new Date(),
              lastUpdated: new Date()
            },
            
          },
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
      .send(error.message || "Something went wrong");
  }
};

export default handler;
