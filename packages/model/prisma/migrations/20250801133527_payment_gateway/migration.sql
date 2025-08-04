-- CreateEnum
CREATE TYPE "PaymentGatewayType" AS ENUM ('TROPIPAY', 'QVAPAY', 'MANUAL');

-- CreateTable
CREATE TABLE "PaymentGateway" (
    "id" TEXT NOT NULL,
    "type" "PaymentGatewayType" NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "data" JSONB NOT NULL,
    "businessId" TEXT NOT NULL,

    CONSTRAINT "PaymentGateway_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "PaymentGateway" ADD CONSTRAINT "PaymentGateway_businessId_fkey" FOREIGN KEY ("businessId") REFERENCES "Business"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
