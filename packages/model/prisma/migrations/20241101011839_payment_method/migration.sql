/*
  Warnings:

  - A unique constraint covering the columns `[defaultPaymentMethodId]` on the table `Business` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateEnum
CREATE TYPE "PaymentMethodType" AS ENUM ('TRANSFERMOVIL', 'ENZONA');

-- AlterTable
ALTER TABLE "Business" ADD COLUMN     "defaultPaymentMethodId" TEXT;

-- CreateTable
CREATE TABLE "PaymentMethod" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "type" "PaymentMethodType" NOT NULL,
    "data" JSONB NOT NULL,
    "businessId" TEXT NOT NULL,

    CONSTRAINT "PaymentMethod_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Business_defaultPaymentMethodId_key" ON "Business"("defaultPaymentMethodId");

-- AddForeignKey
ALTER TABLE "Business" ADD CONSTRAINT "Business_defaultPaymentMethodId_fkey" FOREIGN KEY ("defaultPaymentMethodId") REFERENCES "PaymentMethod"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PaymentMethod" ADD CONSTRAINT "PaymentMethod_businessId_fkey" FOREIGN KEY ("businessId") REFERENCES "Business"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
