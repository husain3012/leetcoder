import { leetcodeify_user, parseHTML } from "./parser";
import type ILeetcodeUser from "../@types/leetcode_user";
import axios from "axios";
import { getRandomProxy } from "./proxies";

export const leetcodeStats = async (
  usernames: string[]
): Promise<(ILeetcodeUser)[]> => {
  // TODO replace with regex to validate leetcode usernames
  let filteredUsernames = usernames.filter((u) => u != "");

  let usersStats = await Promise.all(
    filteredUsernames.map(async (user) => {
      try {
        const resp = await axios.get(`https://leetcode.com/${user}/`);

        const bodyText = await resp.data;
        const raw_info = parseHTML(bodyText) as any[];
        const transformed_user = leetcodeify_user(raw_info, [
          "tagProblemCounts",
        ]);

        console.log(
          `Fetched stats for ${user} : Rank ${transformed_user.profile.ranking}`
        );
        delete transformed_user.userCalendar?.submissionCalendar;
        return { ...transformed_user};
      } catch (error) {
        console.log(error.message)
        return null;
      }
    })
  );
  usersStats = usersStats.filter((u) => u != null);

  return usersStats;
};


export const getLeetcodeStatsToSave = (leetcodeUser: ILeetcodeUser) => {
  return {
    easySolved: leetcodeUser.submitStatsGlobal.acSubmissionNum.find(
      (s) => s.difficulty == "Easy"
    ).count,
    mediumSolved: leetcodeUser.submitStatsGlobal.acSubmissionNum.find(
      (s) => s.difficulty == "Medium"
    ).count,
    hardSolved: leetcodeUser.submitStatsGlobal.acSubmissionNum.find(
      (s) => s.difficulty == "Hard"
    ).count,
    ranking: leetcodeUser.profile.ranking,
    streak: leetcodeUser.userCalendar.streak,
  };
};
