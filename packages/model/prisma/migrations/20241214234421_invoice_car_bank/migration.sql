/*
  Warnings:

  - Added the required column `cardBankId` to the `CollaboratorInvoice` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "CollaboratorInvoice" ADD COLUMN     "cardBankId" TEXT NOT NULL,
ALTER COLUMN "confirmed" SET DEFAULT false;

-- AddForeignKey
ALTER TABLE "CollaboratorInvoice" ADD CONSTRAINT "CollaboratorInvoice_cardBankId_fkey" FOREIGN KEY ("cardBankId") REFERENCES "CollaboratorCardBank"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
