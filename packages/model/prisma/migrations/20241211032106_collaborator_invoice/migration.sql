-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "businessProfit" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "collaboratorInvoiceId" TEXT,
ADD COLUMN     "commission" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "OrderProduct" ADD COLUMN     "businessProfit" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "commission" INTEGER NOT NULL DEFAULT 0;

-- CreateTable
CREATE TABLE "CollaboratorProfile" (
    "id" TEXT NOT NULL,
    "businessId" TEXT NOT NULL,
    "collaboratorId" TEXT NOT NULL,
    "historicalProfit" INTEGER NOT NULL DEFAULT 0,
    "totalPendingInvoiceToConfirm" INTEGER NOT NULL DEFAULT 0,
    "totalOrderForPayment" INTEGER NOT NULL DEFAULT 0,
    "totalBusinessProfit" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CollaboratorProfile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CollaboratorInvoice" (
    "id" TEXT NOT NULL,
    "businessId" TEXT NOT NULL,
    "collaboratorId" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,
    "currency" "Currency" NOT NULL,
    "transferCode" TEXT NOT NULL,
    "businessNota" TEXT,
    "collaboratorNota" TEXT,
    "confirmed" BOOLEAN NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CollaboratorInvoice_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "CollaboratorProfile" ADD CONSTRAINT "CollaboratorProfile_businessId_fkey" FOREIGN KEY ("businessId") REFERENCES "Business"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CollaboratorProfile" ADD CONSTRAINT "CollaboratorProfile_collaboratorId_fkey" FOREIGN KEY ("collaboratorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_collaboratorInvoiceId_fkey" FOREIGN KEY ("collaboratorInvoiceId") REFERENCES "CollaboratorInvoice"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CollaboratorInvoice" ADD CONSTRAINT "CollaboratorInvoice_businessId_fkey" FOREIGN KEY ("businessId") REFERENCES "Business"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CollaboratorInvoice" ADD CONSTRAINT "CollaboratorInvoice_collaboratorId_fkey" FOREIGN KEY ("collaboratorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
