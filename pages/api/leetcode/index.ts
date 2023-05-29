import ILeetcodeUser from "../../../@types/leetcode_user";
import { leetcodeify_user, parseHTML } from "../../../utils";
import type { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const user = req.query.user as string;

  if (!user || user == "") return { error: "INVALID_USER" };
  const resp = await fetch(`https://leetcode.com/${user}/`);
  const bodyText = await resp.text();
  const parsedInfo = parseHTML(bodyText);
  const info = leetcodeify_user(parsedInfo);

  return res.send(info);
};

export default handler;
