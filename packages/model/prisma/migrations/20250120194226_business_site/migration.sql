-- CreateTable
CREATE TABLE "BusinessSite" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "logo" JSONB NOT NULL,
    "businessId" TEXT NOT NULL,

    CONSTRAINT "BusinessSite_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "BusinessSite_businessId_key" ON "BusinessSite"("businessId");

-- AddForeignKey
ALTER TABLE "BusinessSite" ADD CONSTRAINT "BusinessSite_businessId_fkey" FOREIGN KEY ("businessId") REFERENCES "Business"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
