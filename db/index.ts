import { PrismaClient } from "@prisma/client";

let db: PrismaClient | null = null;
let count = 0;
export const initializeDB = () => {
  if (db === null) {
    count++;
    console.log(`Creating Prisma client (count: ${count})`);
    db = new PrismaClient();
  }
  return db;
};


