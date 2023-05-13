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
const client_1 = require("@prisma/client");
const dayjs_1 = __importDefault(require("dayjs"));
const utils_1 = require("./utils");
const node_cron_1 = __importDefault(require("node-cron"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const db = new client_1.PrismaClient();
let isFunctionRunning = false;
const AGE = Number(process.env.UPDATE_AGE) || 3600;
const LIMIT = Number(process.env.UPDATE_LIMIT) || 20;
const TIMEOUT = Number(process.env.UPDATE_TIMEOUT) || 200;
const updateQueue = (age = AGE, limit = LIMIT, timeout = TIMEOUT) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(`age: ${age}, limit: ${limit}, timeout: ${timeout}`);
    let updatedUsers = [];
    try {
        const usersToUpdate = yield db.user.findMany({
            where: {
                lastUpdated: {
                    lte: (0, dayjs_1.default)().subtract(age, "seconds").toDate(),
                },
            },
            select: {
                lastAccessed: true,
                lastUpdated: true,
                leetcodeUsername: true,
                id: true,
            },
            orderBy: {
                lastUpdated: "asc",
            },
            take: limit,
        });
        console.log(`Currently processing ${usersToUpdate.length} users:  `, usersToUpdate.map(u => u.leetcodeUsername));
        for (let user of usersToUpdate) {
            const leetcodeStatsData = yield (0, utils_1.leetcodeStats)([user.leetcodeUsername]);
            const userLeetcodeData = leetcodeStatsData.length != 0 && leetcodeStatsData[0];
            const leetcodeStatsToSave = (0, utils_1.getLeetcodeStatsToSave)(userLeetcodeData);
            yield db.user.update({
                where: {
                    id: user.id,
                },
                data: Object.assign({ lastUpdated: (0, dayjs_1.default)().toDate() }, (leetcodeStatsData.length != 0
                    ? {
                        leetcodeStats: {
                            upsert: {
                                update: leetcodeStatsToSave,
                                create: leetcodeStatsToSave,
                            },
                        },
                    }
                    : {})),
            });
            updatedUsers.push({
                username: user.leetcodeUsername,
                success: leetcodeStatsData.length != 0,
            });
            yield new Promise((resolve) => setTimeout(resolve, timeout));
        }
    }
    catch (error) {
        console.log(error);
    }
    console.log("Done ✅");
});
node_cron_1.default.schedule('*/2 * * * *', () => __awaiter(void 0, void 0, void 0, function* () {
    console.log("⏲️ Triggering CRON JOB!");
    if (isFunctionRunning) {
        console.log("⚠️ Job skipped: ALREADY RUNNING");
    }
    ;
    isFunctionRunning = true;
    yield updateQueue(100, 50, Math.floor(200 + Math.random() * 100));
    isFunctionRunning = false;
}));
