import { getLCAccount } from "leetcode-public-api";
import type { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const user = req.query.user as string;
  const lcAccount = await getLCAccount(user);
  if (lcAccount.status!=404) return { error: "INVALID_USER" };
  return res.send(lcAccount);
};

export default handler;