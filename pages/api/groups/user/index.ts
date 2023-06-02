
import type { NextApiRequest, NextApiResponse } from "next";
import { ApiError } from "next/dist/server/api-utils";
import RequestError from "../../../../errors";
import { getUserInfo } from "../../../../services/users/userInfo";


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
    const groups = await getUserInfo(lcUsername)
    

    return res.send(groups);
  } catch (error) {
    console.log(error);
    RequestError.response(req, res, error);
  }
};

export default handler;
