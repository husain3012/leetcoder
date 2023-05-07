import { updateQueue } from "../../utils/queueUpdater";

const handler = async (req, res) => {
    const updatedUsers = await updateQueue(3, 60*30)
  res.status(200).end(updatedUsers);
};

export default handler;
