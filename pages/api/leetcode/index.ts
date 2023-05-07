import { parseHTML } from "../../../utils/parser";
import type { NextApiRequest, NextApiResponse } from "next";


const handler = async (req: NextApiRequest , res:NextApiResponse) => {
  
  const user = req.query.user as string;

  if (!user || user == "") return { error: "INVALID_USER" };
  const resp = await fetch(`https://leetcode.com/${user}/`);
  const bodyText = await resp.text();

  return res.send(parseHTML(bodyText));


};

export default handler;
