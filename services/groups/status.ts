import db from "../../db";

export const getGroupStatus = async (group_id: number) => {
  return await db.group.findUnique({
    where: {
      id: group_id,
    },
    select: {
      name: true,
      coverPhoto: true,
      createdByEmail: true,
      description: true,
      id: true,

      members: {
        select: {
          name: true,
          leetcodeUsername: true,
          lastUpdated: true,
          lastAccessed: true,
          leetcodeStats: true,
          id: true,
        },
        orderBy: {
          leetcodeStats: {
            ranking: "asc",
          },
        },
      },
      
    },
  });
};
