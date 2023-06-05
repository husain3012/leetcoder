import db from "../../db";

export const getGroupStatus = async (group_tag: string) => {
  return await db.group.findUnique({
    where: {
      urlSlug:group_tag
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
