/*
  Warnings:

  - You are about to drop the column `sendOrderToWhatsapp` on the `Business` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Business" DROP COLUMN "sendOrderToWhatsapp";

-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "socialNetworksDescription" TEXT;
