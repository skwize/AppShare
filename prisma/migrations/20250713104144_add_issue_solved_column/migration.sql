-- AlterTable
ALTER TABLE "App" ALTER COLUMN "link" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Issue" ADD COLUMN     "solved" BOOLEAN NOT NULL DEFAULT false;
