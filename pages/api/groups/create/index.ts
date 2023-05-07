import { nanoid } from "nanoid";
import db from "../../../../db";
import type { NextApiRequest, NextApiResponse } from "next";
import { ApiError } from "next/dist/server/api-utils";
import IGroup from "../../../../@types/group";
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case "POST":
      await postHandler(req, res);

      break;

    default:
      return res.send(404);
      break;
  }
};

const postHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { name, coverPhoto, description, createdByEmail }: IGroup = req.body;

  const existingGroup = await db.group.findFirst({
    where: {
      name,
    },
  });

  if (existingGroup) {
    return res.status(502).send({
      message: "Group already exists!",
    });
  }

  try {
    const newGroup = await db.group.create({
      data: {
        name,
        description,
        coverPhoto,
        createdByEmail,
        inviteID: nanoid(10),
      },
    });

    return res.send(newGroup);
  } catch (error) {
    console.log(error);
    throw new ApiError(500, error.message || "Unknown");
  }
};

export default handler;
