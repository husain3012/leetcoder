import { updateQueue } from "../../utils";

const handler = async (req, res) => {
    const updatedUsers = await updateQueue(50, 60*30, 1100)
  res.status(200).end(updatedUsers);
};

export default handler;
