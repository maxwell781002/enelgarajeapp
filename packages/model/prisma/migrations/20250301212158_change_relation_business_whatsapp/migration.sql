/*
  Warnings:

  - You are about to drop the column `businessId` on the `WhatsappConnect` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "WhatsappConnect" DROP CONSTRAINT "WhatsappConnect_businessId_fkey";

-- DropIndex
DROP INDEX "WhatsappConnect_businessId_key";

-- AlterTable
ALTER TABLE "Business" ADD COLUMN     "whatsappConnectId" TEXT;

-- AlterTable
ALTER TABLE "WhatsappConnect" DROP COLUMN "businessId";

-- AddForeignKey
ALTER TABLE "Business" ADD CONSTRAINT "Business_whatsappConnectId_fkey" FOREIGN KEY ("whatsappConnectId") REFERENCES "WhatsappConnect"("id") ON DELETE SET NULL ON UPDATE CASCADE;
