-- DropForeignKey
ALTER TABLE "Movies" DROP CONSTRAINT "Movies_videoUrlId_fkey";

-- AddForeignKey
ALTER TABLE "Movies" ADD CONSTRAINT "Movies_videoUrlId_fkey" FOREIGN KEY ("videoUrlId") REFERENCES "VideoUrl"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
