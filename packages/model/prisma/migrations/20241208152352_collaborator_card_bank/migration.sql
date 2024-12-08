-- CreateTable
CREATE TABLE "CollaboratorCardBank" (
    "id" TEXT NOT NULL,
    "alias" TEXT,
    "cardNumber" TEXT NOT NULL,
    "currency" "Currency" NOT NULL DEFAULT 'CUP',
    "phone" TEXT NOT NULL,
    "businessId" TEXT NOT NULL,
    "collaboratorId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CollaboratorCardBank_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "CollaboratorCardBank" ADD CONSTRAINT "CollaboratorCardBank_businessId_fkey" FOREIGN KEY ("businessId") REFERENCES "Business"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CollaboratorCardBank" ADD CONSTRAINT "CollaboratorCardBank_collaboratorId_fkey" FOREIGN KEY ("collaboratorId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
