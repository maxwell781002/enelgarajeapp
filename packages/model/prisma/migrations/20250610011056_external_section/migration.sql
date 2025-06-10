-- CreateTable
CREATE TABLE "ExternalSection" (
    "id" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "ExternalSection_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ExternalSection_token_key" ON "ExternalSection"("token");

-- AddForeignKey
ALTER TABLE "ExternalSection" ADD CONSTRAINT "ExternalSection_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
