-- AlterEnum
ALTER TYPE "WhatsappConnectStatus" ADD VALUE 'DISCONNECTED';

-- AlterTable
ALTER TABLE "WhatsappConnect" ADD COLUMN     "ownerId" TEXT;

-- AddForeignKey
ALTER TABLE "WhatsappConnect" ADD CONSTRAINT "WhatsappConnect_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
