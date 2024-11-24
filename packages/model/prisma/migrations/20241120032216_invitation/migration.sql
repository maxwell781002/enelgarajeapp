-- CreateEnum
CREATE TYPE "UserBusinessType" AS ENUM ('OWNER', 'COLLABORATOR');

-- AlterTable
ALTER TABLE "UserBusiness" ADD COLUMN     "type" "UserBusinessType" NOT NULL DEFAULT 'OWNER';

-- CreateTable
CREATE TABLE "InvitationLink" (
    "id" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "businessId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "InvitationLink_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "InvitationLink" ADD CONSTRAINT "InvitationLink_businessId_fkey" FOREIGN KEY ("businessId") REFERENCES "Business"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
