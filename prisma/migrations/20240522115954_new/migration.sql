/*
  Warnings:

  - You are about to drop the column `favoredBy` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `favoredNumber` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `lastNotified` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `notificationCount` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `passwordResetHash` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `roles` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `stars` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "favoredBy",
DROP COLUMN "favoredNumber",
DROP COLUMN "lastNotified",
DROP COLUMN "notificationCount",
DROP COLUMN "passwordResetHash",
DROP COLUMN "roles",
DROP COLUMN "stars";
