/*
  Warnings:

  - You are about to drop the column `videoUrl` on the `Movies` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[videoUrlId]` on the table `Movies` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `videoUrlId` to the `Movies` table without a default value. This is not possible if the table is not empty.
  - Made the column `imgUrl` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Movies" DROP COLUMN "videoUrl",
ADD COLUMN     "videoUrlId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "imgUrl" SET NOT NULL;

-- CreateTable
CREATE TABLE "VideoUrl" (
    "id" SERIAL NOT NULL,
    "movieId" INTEGER NOT NULL,
    "url" TEXT NOT NULL,

    CONSTRAINT "VideoUrl_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "VideoUrl_movieId_key" ON "VideoUrl"("movieId");

-- CreateIndex
CREATE UNIQUE INDEX "VideoUrl_url_key" ON "VideoUrl"("url");

-- CreateIndex
CREATE UNIQUE INDEX "Movies_videoUrlId_key" ON "Movies"("videoUrlId");

-- AddForeignKey
ALTER TABLE "Movies" ADD CONSTRAINT "Movies_videoUrlId_fkey" FOREIGN KEY ("videoUrlId") REFERENCES "VideoUrl"("id") ON DELETE CASCADE ON UPDATE CASCADE;
