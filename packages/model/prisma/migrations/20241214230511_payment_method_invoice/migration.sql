/*
  Warnings:

  - Added the required column `paymentMethodId` to the `CollaboratorInvoice` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "CollaboratorInvoice" ADD COLUMN     "paymentMethodId" TEXT NOT NULL,
ALTER COLUMN "confirmed" SET DEFAULT false;

-- AddForeignKey
ALTER TABLE "CollaboratorInvoice" ADD CONSTRAINT "CollaboratorInvoice_paymentMethodId_fkey" FOREIGN KEY ("paymentMethodId") REFERENCES "PaymentMethod"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
