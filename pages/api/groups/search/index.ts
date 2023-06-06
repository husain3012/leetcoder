import { nanoid } from "nanoid";
import {initializeDB} from "../../../../db";
import type { NextApiRequest, NextApiResponse } from "next";
import { ApiError } from "next/dist/server/api-utils";
import RequestError from "../../../../errors";


const db = initializeDB();


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
  const query = req.query.name as string;
  const offset = (req.query.offset || 0) as number;
  const testGroups = await db.group.findMany();

  try {
    const groups = await db.group.findMany({
      where: {
        name: {
          contains: query,
        },
      },
      take: 20,
      skip: offset,
      select: {
        id: true,
        name: true,
        createdByEmail: true,
        description: true,
        coverPhoto: true,
        inviteID: false,
        _count:true,
        urlSlug: true,
      },
     
    });
    return res.send(groups);
  } catch (error) {
    console.log(error);
    RequestError.response(req, res, error);
  }
};

export default handler;
