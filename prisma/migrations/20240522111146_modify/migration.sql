/*
  Warnings:

  - You are about to drop the column `moviesId` on the `Category` table. All the data in the column will be lost.
  - You are about to drop the column `video` on the `Movies` table. All the data in the column will be lost.
  - You are about to drop the column `categoryId` on the `favorite` table. All the data in the column will be lost.
  - You are about to drop the `Program` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `categoryId` to the `Movies` table without a default value. This is not possible if the table is not empty.
  - Added the required column `channelId` to the `Movies` table without a default value. This is not possible if the table is not empty.
  - Added the required column `description` to the `Movies` table without a default value. This is not possible if the table is not empty.
  - Added the required column `duration` to the `Movies` table without a default value. This is not possible if the table is not empty.
  - Added the required column `typeId` to the `Movies` table without a default value. This is not possible if the table is not empty.
  - Added the required column `videoUrl` to the `Movies` table without a default value. This is not possible if the table is not empty.
  - Added the required column `moviesId` to the `favorite` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Category" DROP CONSTRAINT "Category_moviesId_fkey";

-- DropForeignKey
ALTER TABLE "Program" DROP CONSTRAINT "Program_channelId_fkey";

-- DropForeignKey
ALTER TABLE "favorite" DROP CONSTRAINT "favorite_categoryId_fkey";

-- AlterTable
ALTER TABLE "Category" DROP COLUMN "moviesId";

-- AlterTable
ALTER TABLE "Movies" DROP COLUMN "video",
ADD COLUMN     "categoryId" INTEGER NOT NULL,
ADD COLUMN     "channelId" INTEGER NOT NULL,
ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "duration" INTEGER NOT NULL,
ADD COLUMN     "suspend" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "typeId" INTEGER NOT NULL,
ADD COLUMN     "videoUrl" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "favorite" DROP COLUMN "categoryId",
ADD COLUMN     "moviesId" INTEGER NOT NULL;

-- DropTable
DROP TABLE "Program";

-- CreateTable
CREATE TABLE "Type" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Type_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Movies" ADD CONSTRAINT "Movies_channelId_fkey" FOREIGN KEY ("channelId") REFERENCES "Channel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Movies" ADD CONSTRAINT "Movies_typeId_fkey" FOREIGN KEY ("typeId") REFERENCES "Type"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Movies" ADD CONSTRAINT "Movies_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "favorite" ADD CONSTRAINT "favorite_moviesId_fkey" FOREIGN KEY ("moviesId") REFERENCES "Movies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
