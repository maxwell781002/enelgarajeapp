/*
  Warnings:

  - You are about to drop the column `phpne` on the `User` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "OrderStatus" AS ENUM ('CREATED', 'SEND', 'PAYED', 'REJECTED');

-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "status" "OrderStatus" NOT NULL DEFAULT 'CREATED';

-- AlterTable
ALTER TABLE "User" DROP COLUMN "phpne",
ADD COLUMN     "phone" TEXT;
