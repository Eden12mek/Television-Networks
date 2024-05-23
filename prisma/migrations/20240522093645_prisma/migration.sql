/*
  Warnings:

  - You are about to drop the column `name` on the `Program` table. All the data in the column will be lost.
  - You are about to drop the column `firstname` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `lastname` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `phone` on the `User` table. All the data in the column will be lost.
  - Added the required column `duration` to the `Program` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `Program` table without a default value. This is not possible if the table is not empty.
  - Added the required column `video` to the `Program` table without a default value. This is not possible if the table is not empty.
  - Added the required column `favoredBy` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `imgUrl` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lastNotified` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `notificationCount` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `passwordResetHash` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phoneNum` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `refreshToken` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `roles` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `stars` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `suspended` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `username` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Channel" ADD COLUMN     "suspend" BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE "Program" DROP COLUMN "name",
ADD COLUMN     "duration" INTEGER NOT NULL,
ADD COLUMN     "suspend" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "title" TEXT NOT NULL,
ADD COLUMN     "video" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "firstname",
DROP COLUMN "lastname",
DROP COLUMN "phone",
ADD COLUMN     "favoredBy" JSONB NOT NULL,
ADD COLUMN     "favoredNumber" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "imgUrl" TEXT NOT NULL,
ADD COLUMN     "lastNotified" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "notificationCount" INTEGER NOT NULL,
ADD COLUMN     "passwordResetHash" TEXT NOT NULL,
ADD COLUMN     "phoneNum" INTEGER NOT NULL,
ADD COLUMN     "refreshToken" TEXT NOT NULL,
ADD COLUMN     "roles" INTEGER NOT NULL,
ADD COLUMN     "stars" INTEGER NOT NULL,
ADD COLUMN     "suspended" BOOLEAN NOT NULL,
ADD COLUMN     "username" TEXT NOT NULL;
