-- CreateEnum
CREATE TYPE "BusinessPlan" AS ENUM ('BASIC', 'ENTERPRISE');

-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_categoryId_fkey";

-- AlterTable
ALTER TABLE "Business" ADD COLUMN     "plan" "BusinessPlan" NOT NULL DEFAULT 'BASIC';

-- AlterTable
ALTER TABLE "Product" ALTER COLUMN "categoryId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE SET NULL ON UPDATE CASCADE;
