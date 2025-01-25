-- AlterTable
ALTER TABLE "CollaboratorProfile" ADD COLUMN     "totalPaymentReferred" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "referredById" TEXT;

-- AlterTable
ALTER TABLE "UserBusiness" ADD COLUMN     "referredCode" TEXT;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_referredById_fkey" FOREIGN KEY ("referredById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
