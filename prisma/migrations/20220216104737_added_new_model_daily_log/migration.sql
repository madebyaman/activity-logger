/*
  Warnings:

  - You are about to drop the column `date` on the `Log` table. All the data in the column will be lost.
  - You are about to drop the column `noOfBlocksPerHour` on the `Profile` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Log" DROP COLUMN "date",
ADD COLUMN     "dailyLogId" TEXT;

-- AlterTable
ALTER TABLE "Profile" DROP COLUMN "noOfBlocksPerHour";

-- CreateTable
CREATE TABLE "DailyLog" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "date" TEXT NOT NULL,
    "blocksPerHour" INTEGER NOT NULL,

    CONSTRAINT "DailyLog_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "DailyLog_date_key" ON "DailyLog"("date");

-- AddForeignKey
ALTER TABLE "Log" ADD CONSTRAINT "Log_dailyLogId_fkey" FOREIGN KEY ("dailyLogId") REFERENCES "DailyLog"("date") ON DELETE SET NULL ON UPDATE CASCADE;
