-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "changedByOrderId" TEXT,
ADD COLUMN     "changedOrderNote" TEXT;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_changedByOrderId_fkey" FOREIGN KEY ("changedByOrderId") REFERENCES "Order"("id") ON DELETE SET NULL ON UPDATE CASCADE;
