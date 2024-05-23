/*
  Warnings:

  - A unique constraint covering the columns `[phoneNum]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Made the column `phoneNum` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- DropIndex
DROP INDEX "User_username_key";

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "phoneNum" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "User_phoneNum_key" ON "User"("phoneNum");
