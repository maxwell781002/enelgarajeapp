-- AlterEnum
ALTER TYPE "UserBusinessType" ADD VALUE 'MESSENGER';

-- AlterTable
ALTER TABLE "InvitationLink" ADD COLUMN     "type" "UserBusinessType" NOT NULL DEFAULT 'COLLABORATOR';
