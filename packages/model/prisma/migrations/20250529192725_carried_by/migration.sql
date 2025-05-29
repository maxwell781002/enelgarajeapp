-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "messengerId" TEXT;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_messengerId_fkey" FOREIGN KEY ("messengerId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
