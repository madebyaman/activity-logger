/*
  Warnings:

  - You are about to drop the column `dailyLogId` on the `Log` table. All the data in the column will be lost.
  - You are about to drop the `DailyLog` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `date` to the `Log` table without a default value. This is not possible if the table is not empty.
  - Added the required column `blocksPerHour` to the `Profile` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "DailyLog" DROP CONSTRAINT "DailyLog_userId_fkey";

-- DropForeignKey
ALTER TABLE "Log" DROP CONSTRAINT "Log_dailyLogId_fkey";

-- AlterTable
ALTER TABLE "Log" DROP COLUMN "dailyLogId",
ADD COLUMN     "date" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Profile" ADD COLUMN     "blocksPerHour" INTEGER NOT NULL;

-- DropTable
DROP TABLE "DailyLog";
