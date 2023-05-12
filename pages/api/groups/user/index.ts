import { nanoid } from "nanoid";
import db from "../../../../db";
import type { NextApiRequest, NextApiResponse } from "next";
import { ApiError } from "next/dist/server/api-utils";
import RequestError from "../../../../errors";


const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case "GET":
      await getHandler(req, res);

      break;

    default:
      return res.send(404);
      break;
  }
};

const getHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const lcUsername = req.query.leetcodeUsername as string;


  try {
    const groups = await db.user.findUnique({
      where: {
       leetcodeUsername: lcUsername
      },
      include:{
        groups:{
            select:{
                coverPhoto:true,
                description:true,
                id:true,
                name:true,
                _count:true,

            }
        },
        leetcodeStats: true
      },
      
     
    });
    return res.send(groups);
  } catch (error) {
    console.log(error);
    RequestError.response(req, res, error);
  }
};

export default handler;
