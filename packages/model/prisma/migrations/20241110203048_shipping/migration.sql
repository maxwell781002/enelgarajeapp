-- AlterTable
ALTER TABLE "Address" ADD COLUMN     "neighborhoodId" TEXT;

-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "hasShipping" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "shipping" INTEGER NOT NULL DEFAULT 0;

-- CreateTable
CREATE TABLE "Neighborhood" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "city" TEXT NOT NULL,

    CONSTRAINT "Neighborhood_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BusinessNeighborhood" (
    "id" TEXT NOT NULL,
    "shipping" INTEGER NOT NULL DEFAULT 0,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "businessId" TEXT NOT NULL,
    "neighborhoodId" TEXT NOT NULL,

    CONSTRAINT "BusinessNeighborhood_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Address" ADD CONSTRAINT "Address_neighborhoodId_fkey" FOREIGN KEY ("neighborhoodId") REFERENCES "Neighborhood"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BusinessNeighborhood" ADD CONSTRAINT "BusinessNeighborhood_businessId_fkey" FOREIGN KEY ("businessId") REFERENCES "Business"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BusinessNeighborhood" ADD CONSTRAINT "BusinessNeighborhood_neighborhoodId_fkey" FOREIGN KEY ("neighborhoodId") REFERENCES "Neighborhood"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
