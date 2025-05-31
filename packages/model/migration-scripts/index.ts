import prisma from "@repo/model/prisma/prisma-client";

const main = () => {
  return prisma().$transaction(async (tx) => {
    const businesses = await tx.business.findMany();
    for (const business of businesses) {
      console.log(business.name);
    }
  });
};

main()
  .then(async () => {
    await prisma().$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma().$disconnect();
    process.exit(1);
  });
