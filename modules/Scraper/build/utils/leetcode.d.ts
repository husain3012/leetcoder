import type ILeetcodeUser from "../@types/leetcode_user";
export declare const leetcodeStats: (usernames: string[]) => Promise<(ILeetcodeUser)[]>;
export declare const getLeetcodeStatsToSave: (leetcodeUser: ILeetcodeUser) => {
    easySolved: number;
    mediumSolved: number;
    hardSolved: number;
    ranking: number;
    streak: number;
    avatar: string;
};
