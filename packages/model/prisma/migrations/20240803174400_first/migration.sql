-- CreateTable
CREATE TABLE "Business" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "address" TEXT,
    "howToArrive" TEXT,
    "coordinates" DOUBLE PRECISION[],
    "slug" TEXT,

    CONSTRAINT "Business_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Category" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT,
    "businessId" TEXT NOT NULL,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Plate" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT,
    "image" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "offerPrice" INTEGER,
    "ingredients" TEXT[],
    "images" TEXT[],
    "businessId" TEXT NOT NULL,
    "categoryId" TEXT NOT NULL,

    CONSTRAINT "Plate_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "email" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Order" (
    "id" TEXT NOT NULL,
    "userId" TEXT,
    "productsDetails" JSONB NOT NULL,
    "total" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "Order_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OrderProduct" (
    "productId" TEXT NOT NULL,
    "orderId" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,

    CONSTRAINT "OrderProduct_pkey" PRIMARY KEY ("productId","orderId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Business_slug_key" ON "Business"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Category_slug_key" ON "Category"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Plate_slug_key" ON "Plate"("slug");

-- AddForeignKey
ALTER TABLE "Category" ADD CONSTRAINT "Category_businessId_fkey" FOREIGN KEY ("businessId") REFERENCES "Business"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Plate" ADD CONSTRAINT "Plate_businessId_fkey" FOREIGN KEY ("businessId") REFERENCES "Business"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Plate" ADD CONSTRAINT "Plate_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderProduct" ADD CONSTRAINT "OrderProduct_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Plate"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderProduct" ADD CONSTRAINT "OrderProduct_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
