import { PrismaClient } from "@prisma/client";

let db : PrismaClient | null = null;

if(db===null && typeof(window)==="undefined"){
    console.log("Creating Prisma Client")
    db = new PrismaClient();
}

export default db;