-- CreateEnum
CREATE TYPE "WhatsappConnectStatus" AS ENUM ('CREATED', 'CODE_SENT', 'CONNECTED');

-- CreateTable
CREATE TABLE "WhatsappConnect" (
    "id" TEXT NOT NULL,
    "status" "WhatsappConnectStatus" NOT NULL DEFAULT 'CREATED',
    "paring_code" TEXT,
    "secure_code" TEXT,
    "businessId" TEXT NOT NULL,

    CONSTRAINT "WhatsappConnect_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "WhatsappConnect_businessId_key" ON "WhatsappConnect"("businessId");

-- AddForeignKey
ALTER TABLE "WhatsappConnect" ADD CONSTRAINT "WhatsappConnect_businessId_fkey" FOREIGN KEY ("businessId") REFERENCES "Business"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
