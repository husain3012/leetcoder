import type ILeetcodeUser from "../@types/leetcode_user";
export declare const parseHTML: (html_string: any) => any[] | {
    error: any;
};
export declare const leetcodeify_user: (user: any[], exclude: string[]) => ILeetcodeUser;
