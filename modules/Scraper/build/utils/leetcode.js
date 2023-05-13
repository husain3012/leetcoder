"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLeetcodeStatsToSave = exports.leetcodeStats = void 0;
const parser_1 = require("./parser");
const axios_1 = __importDefault(require("axios"));
const leetcodeStats = (usernames) => __awaiter(void 0, void 0, void 0, function* () {
    let filteredUsernames = usernames.filter((u) => u != "");
    let usersStats = yield Promise.all(filteredUsernames.map((user) => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        try {
            const resp = yield axios_1.default.get(`https://leetcode.com/${user}/`);
            const bodyText = yield resp.data;
            const raw_info = (0, parser_1.parseHTML)(bodyText);
            const transformed_user = (0, parser_1.leetcodeify_user)(raw_info, [
                "tagProblemCounts",
            ]);
            console.log(`Fetched stats for ${user} : Rank ${transformed_user.profile.ranking}`);
            (_a = transformed_user.userCalendar) === null || _a === void 0 ? true : delete _a.submissionCalendar;
            return Object.assign({}, transformed_user);
        }
        catch (error) {
            console.log(error.message);
            return null;
        }
    })));
    usersStats = usersStats.filter((u) => u != null);
    return usersStats;
});
exports.leetcodeStats = leetcodeStats;
const getLeetcodeStatsToSave = (leetcodeUser) => {
    return {
        easySolved: leetcodeUser.submitStatsGlobal.acSubmissionNum.find((s) => s.difficulty == "Easy").count,
        mediumSolved: leetcodeUser.submitStatsGlobal.acSubmissionNum.find((s) => s.difficulty == "Medium").count,
        hardSolved: leetcodeUser.submitStatsGlobal.acSubmissionNum.find((s) => s.difficulty == "Hard").count,
        ranking: leetcodeUser.profile.ranking,
        streak: leetcodeUser.userCalendar.streak,
        avatar: leetcodeUser.profile.userAvatar
    };
};
exports.getLeetcodeStatsToSave = getLeetcodeStatsToSave;
