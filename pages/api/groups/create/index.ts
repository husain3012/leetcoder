import { nanoid } from "nanoid";
import {initializeDB} from "../../../../db";
import type { NextApiRequest, NextApiResponse } from "next";
import { ApiError } from "next/dist/server/api-utils";
import IGroup from "../../../../@types/group";
import SITE_CONFIG from "../../../../site_config";

const db = initializeDB();

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
  const { name, coverPhoto, description, createdByEmail, urlSlug}: IGroup = req.body;


  const existingGroup = await db.group.findFirst({
    where: {
      urlSlug,
    },
  });

  if (existingGroup) {
    return res.status(502).send({
      message: "URL Slug already in use!",
    });
  }

  try {
    const newGroup = await db.group.create({
      data: {
        name,
        description,
        coverPhoto: coverPhoto || SITE_CONFIG.defaultCoverPhotos[Math.floor(Math.random()*SITE_CONFIG.defaultCoverPhotos.length)],
        createdByEmail,
        inviteID: nanoid(10),
        urlSlug: urlSlug
      },
    });

    return res.send(newGroup);
  } catch (error) {
    console.log(error);
    throw new ApiError(500, error.message || "Unknown");
  }
};

export default handler;
