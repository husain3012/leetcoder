import { initializeDB } from "../../db";

const db = initializeDB();

export const getInviteInfo = async (inviteID: string) => {
  const group = await db.group.findUnique({
    where: {
      inviteID: inviteID
    },
    select: {
      name: true,
      coverPhoto: true,
      createdByEmail: true,
      description: true,
      id: true,

      _count:true
    },
  });


  const serialized = {
    ...group,
    id: group.id.toString()
  }

  return serialized;
};
