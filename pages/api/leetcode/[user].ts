import { parseHTML } from "../../../utils/parser";
const handler = async (req, res) => {
  const { user } = req.query;
  if (!user || user == "") return { error: "INVALID_USER" };
  const resp = await fetch(`https://leetcode.com/${user}/`);
  const bodyText = await resp.text();

  return res.send(parseHTML(bodyText));


};

export default handler;
