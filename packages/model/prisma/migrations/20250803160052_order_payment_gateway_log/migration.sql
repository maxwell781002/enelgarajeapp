-- CreateEnum
CREATE TYPE "PaymentGatewayOrderLogStatus" AS ENUM ('SENT', 'PAID', 'FAILED');

-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "paymentGatewayType" "PaymentGatewayType" NOT NULL DEFAULT 'MANUAL';

-- CreateTable
CREATE TABLE "PaymentGatewayOrderLog" (
    "id" TEXT NOT NULL,
    "status" "PaymentGatewayOrderLogStatus" NOT NULL DEFAULT 'SENT',
    "logs" JSONB[],
    "orderId" TEXT NOT NULL,

    CONSTRAINT "PaymentGatewayOrderLog_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "PaymentGatewayOrderLog_orderId_key" ON "PaymentGatewayOrderLog"("orderId");

-- AddForeignKey
ALTER TABLE "PaymentGatewayOrderLog" ADD CONSTRAINT "PaymentGatewayOrderLog_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
