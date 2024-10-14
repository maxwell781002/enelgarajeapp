-- CreateTable
CREATE TABLE "TelegramBusiness" (
    "id" TEXT NOT NULL,
    "groupId" TEXT NOT NULL,
    "invitationLink" TEXT NOT NULL DEFAULT '',
    "businessId" TEXT NOT NULL,

    CONSTRAINT "TelegramBusiness_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "TelegramBusiness_businessId_key" ON "TelegramBusiness"("businessId");

-- AddForeignKey
ALTER TABLE "TelegramBusiness" ADD CONSTRAINT "TelegramBusiness_businessId_fkey" FOREIGN KEY ("businessId") REFERENCES "Business"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
