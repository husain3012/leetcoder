import { NextApiRequest, NextApiResponse } from "next";

import { updateQueue } from "../../../../utils/queueUpdater";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {

  try {
    const limit = Number(req.query.limit) || 10;
    const age = Number(req.query.age) || 1 * 60 * 60;
    const updatedUsers = await updateQueue(limit, age);


    return res.status(201).send(updatedUsers);
  } catch (error) {
    console.log(error);
    return res.status(500).send(error.message);
  }
};


export default handler;
