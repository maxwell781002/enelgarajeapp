-- CreateEnum
CREATE TYPE "Currency" AS ENUM ('CUP', 'USD');

-- AlterTable
ALTER TABLE "Business" ADD COLUMN     "currency" "Currency" NOT NULL DEFAULT 'CUP';
