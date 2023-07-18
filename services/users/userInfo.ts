import { group } from "console";
import { initializeDB } from "../../db";


const db = initializeDB();

export const getUserInfo = async (leetcodeUsername: string) => {
  const groups = await db.user.findUnique({
    where: {
      leetcodeUsername
    },
    include: {
      groups: {
        select: {
          coverPhoto: true,
          description: true,
          id: true,
          urlSlug: true,
          name: true,
          _count: true,

        }
      },
      leetcodeStats: true
    },


  });


  return ({ ...groups, id: groups.id.toString(), groups: groups.groups.map(g => ({ ...g, id: g.id.toString() })), leetcodeStats:{...groups.leetcodeStats, id:groups.leetcodeStats.id.toString()}})
}