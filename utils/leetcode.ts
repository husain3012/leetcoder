import {ILeetCodeUser} from "leetcode-public-api/@types"

export const getLeetcodeStatsToSave = (leetcodeUser:ILeetCodeUser) => {
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
    avatar: leetcodeUser.profile.userAvatar,
    contestAttended: leetcodeUser.contestAttended,
    contestRanking: leetcodeUser.contestRanking,
    contestRating: leetcodeUser.contestRating,
  };
};
