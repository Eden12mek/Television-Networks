/*
  Warnings:

  - You are about to drop the column `videoUrlId` on the `Movies` table. All the data in the column will be lost.
  - You are about to drop the `VideoUrl` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `videoUrl` to the `Movies` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Movies" DROP CONSTRAINT "Movies_videoUrlId_fkey";

-- DropIndex
DROP INDEX "Movies_videoUrlId_key";

-- AlterTable
ALTER TABLE "Movies" DROP COLUMN "videoUrlId",
ADD COLUMN     "videoUrl" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "imgUrl" DROP NOT NULL;

-- DropTable
DROP TABLE "VideoUrl";
