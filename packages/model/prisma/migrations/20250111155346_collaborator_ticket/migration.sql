-- CreateEnum
CREATE TYPE "FormOfPaymentType" AS ENUM ('TRANSFER', 'CASH');

-- AlterEnum
ALTER TYPE "Currency" ADD VALUE 'MLC';

-- AlterTable
ALTER TABLE "Business" ADD COLUMN     "ticketTermsConditions" TEXT;

-- CreateTable
CREATE TABLE "Customer" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "phones" JSONB NOT NULL,
    "identification" TEXT NOT NULL,
    "businessId" TEXT NOT NULL,

    CONSTRAINT "Customer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CollaboratorTicket" (
    "id" TEXT NOT NULL,
    "deliveryDate" TIMESTAMP(3) NOT NULL,
    "currency" "Currency" NOT NULL,
    "formOfPayment" "FormOfPaymentType" NOT NULL,
    "phone" TEXT NOT NULL,
    "nota" TEXT NOT NULL,
    "acceptTerms" BOOLEAN NOT NULL,
    "businessId" TEXT NOT NULL,
    "customerId" TEXT NOT NULL,
    "orderId" TEXT NOT NULL,
    "collaboratorId" TEXT NOT NULL,

    CONSTRAINT "CollaboratorTicket_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Customer" ADD CONSTRAINT "Customer_businessId_fkey" FOREIGN KEY ("businessId") REFERENCES "Business"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CollaboratorTicket" ADD CONSTRAINT "CollaboratorTicket_businessId_fkey" FOREIGN KEY ("businessId") REFERENCES "Business"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CollaboratorTicket" ADD CONSTRAINT "CollaboratorTicket_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CollaboratorTicket" ADD CONSTRAINT "CollaboratorTicket_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CollaboratorTicket" ADD CONSTRAINT "CollaboratorTicket_collaboratorId_fkey" FOREIGN KEY ("collaboratorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
