import prisma from "@repo/model/prisma/prisma-client";
import { skuGenerator } from "../lib/utils";
import { PREFIX_SKU } from "../repositories/product";

// In production the first time does not work. Check it for future scripts.
const main = () => {
  return prisma().$transaction(async (tx) => {
    console.log("START PRODUCT SKU");
    const businesses = await tx.business.findMany();
    for (const business of businesses) {
      console.log(`BUSINESS => ${business.name}`);
      let count = await tx.product.count({
        where: {
          businessId: business.id,
        },
      });
      const products = await tx.product.findMany({
        where: {
          businessId: business.id,
          sku: null,
        },
      });
      for (const product of products) {
        console.log(product.name);
        await tx.product.update({
          where: {
            id: product.id,
          },
          data: {
            sku: skuGenerator(PREFIX_SKU, count + 1),
          },
        });
        count++;
      }
    }
    console.log("END PRODUCT SKU");
  });
};

// main()
//   .then(async () => {
//     await prisma().$disconnect();
//   })
//   .catch(async (e) => {
//     console.error(e);
//     await prisma().$disconnect();
//     process.exit(1);
//   });
