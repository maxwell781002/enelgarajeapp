/*
  Warnings:

  - You are about to drop the column `outOfStock` on the `Product` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Product" DROP COLUMN "outOfStock",
ADD COLUMN     "allowOrderOutOfStock" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "isExhaustible" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "stock" INTEGER NOT NULL DEFAULT 0;
