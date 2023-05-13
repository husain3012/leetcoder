"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.leetcodeify_user = exports.parseHTML = void 0;
const start = '<script id="__NEXT_DATA__" type="application/json">';
const end = "</script>";
const parseHTML = (html_string) => {
    var _a;
    try {
        let useFullData = [];
        const queries = JSON.parse((_a = html_string.split(start)[1]) === null || _a === void 0 ? void 0 : _a.split(end)[0])["props"]["pageProps"]["dehydratedState"]["queries"];
        queries.forEach((q) => {
            if (q["state"] &&
                q["state"]["data"] &&
                q["state"]["data"]["matchedUser"]) {
                useFullData.push(q["state"]["data"]["matchedUser"]);
            }
        });
        return useFullData;
    }
    catch (error) {
        return {
            error,
        };
    }
};
exports.parseHTML = parseHTML;
const leetcodeify_user = (user, exclude) => {
    let transformed_user = {};
    for (let props of user) {
        for (let key of Object.keys(props)) {
            if (!exclude.includes(key)) {
                transformed_user[key] = props[key];
            }
        }
    }
    return transformed_user;
};
exports.leetcodeify_user = leetcodeify_user;
