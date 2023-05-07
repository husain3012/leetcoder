-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "leetcodeUsername" TEXT NOT NULL,
    "lastAccessed" TIMESTAMP(3) NOT NULL,
    "lastUpdated" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Group" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "coverPhoto" TEXT,
    "createdByEmail" TEXT NOT NULL,
    "inviteID" TEXT NOT NULL,

    CONSTRAINT "Group_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LeetcodeInfo" (
    "id" SERIAL NOT NULL,
    "leetcodeUsername" TEXT NOT NULL,
    "ranking" INTEGER NOT NULL,
    "streak" INTEGER NOT NULL,
    "easySolved" INTEGER NOT NULL,
    "mediumSolved" INTEGER NOT NULL,
    "hardSolved" INTEGER NOT NULL,

    CONSTRAINT "LeetcodeInfo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UpdateQueue" (
    "id" SERIAL NOT NULL,
    "inTime" TIMESTAMP(3) NOT NULL,
    "username" TEXT NOT NULL,

    CONSTRAINT "UpdateQueue_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_GroupToUser" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_leetcodeUsername_key" ON "User"("leetcodeUsername");

-- CreateIndex
CREATE UNIQUE INDEX "Group_name_key" ON "Group"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Group_inviteID_key" ON "Group"("inviteID");

-- CreateIndex
CREATE UNIQUE INDEX "LeetcodeInfo_leetcodeUsername_key" ON "LeetcodeInfo"("leetcodeUsername");

-- CreateIndex
CREATE UNIQUE INDEX "UpdateQueue_username_key" ON "UpdateQueue"("username");

-- CreateIndex
CREATE UNIQUE INDEX "_GroupToUser_AB_unique" ON "_GroupToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_GroupToUser_B_index" ON "_GroupToUser"("B");

-- AddForeignKey
ALTER TABLE "LeetcodeInfo" ADD CONSTRAINT "LeetcodeInfo_leetcodeUsername_fkey" FOREIGN KEY ("leetcodeUsername") REFERENCES "User"("leetcodeUsername") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_GroupToUser" ADD CONSTRAINT "_GroupToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "Group"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_GroupToUser" ADD CONSTRAINT "_GroupToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
