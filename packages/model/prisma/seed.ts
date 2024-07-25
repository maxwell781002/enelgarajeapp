import prisma from "./prisma-client";
import sampleData from "./sample-data/data";

async function createBusiness(name: string) {
  const business = await prisma.business.create({
    data: {
      name,
    },
  });
  return Promise.all(
    sampleData.map(async ({ plates, ...category }) => {
      const categoryEntity = await prisma.category.create({
        data: {
          ...category,
          businessId: business.id,
        },
      });

      return Promise.all(
        plates.map(async (plate) =>
          prisma.plate.create({
            data: {
              ...plate,
              businessId: business.id,
              categoryId: categoryEntity.id,
            },
          }),
        ),
      );
    }),
  );
}

async function main() {
  await createBusiness("La cueva del pirata");
  await createBusiness("Nápoles");
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
