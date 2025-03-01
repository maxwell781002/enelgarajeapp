/*
  Warnings:

  - A unique constraint covering the columns `[phone]` on the table `WhatsappConnect` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "WhatsappConnect_phone_key" ON "WhatsappConnect"("phone");
