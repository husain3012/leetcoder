import { initializeDB } from "../../db";

const db = initializeDB();

export const getGroupStatus = async (group_tag: string) => {
  const group = await db.group.findUnique({
    where: {
      urlSlug: group_tag
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


  const serialized = {
    ...group,
    id: group.id.toString(),
    members: group.members.map(m => ({
      ...m, id: m.id.toString(),
      leetcodeStats: m.leetcodeStats?{ ...m.leetcodeStats, id: m.leetcodeStats.id.toString() } :null
    }))


  }

  return serialized;
};
