import { nanoid } from "nanoid";
import {initializeDB} from "../../../../db";
import type { NextApiRequest, NextApiResponse } from "next";

import { ApiError } from "next/dist/server/api-utils";

import RequestError from "../../../../errors";
import { getGroupStatus } from "../../../../services/groups/status";

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
  try {
    if (!req.query.tag) throw new ApiError(401, "Group ID Required");

    const group_tag = req.query.tag as string;

    const group = await getGroupStatus(group_tag);



    return res.send(group);
  } catch (error) {
    console.log(error);
    RequestError.response(req, res, error);
  }
};

export default handler;
