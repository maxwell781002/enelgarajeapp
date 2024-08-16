import prisma from "../prisma/prisma-client";

export const clearBd = async () => {
  await prisma.orderProduct.deleteMany();
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();
  await prisma.order.deleteMany();
  await prisma.business.deleteMany();
};

export const categoryFactory = (data: any = {}) => {
  return prisma.category.create({
    data: {
      name: "Category",
      ...data,
    },
  });
};

export const businessFactory = (data = {}) => {
  return prisma.business.create({
    data: {
      name: "Business",
      ...data,
    },
  });
};

export const productFactory = async (data: any = {}) => {
  if (!data.businessId) {
    data.businessId = (await businessFactory()).id;
  }
  if (!data.categoryId) {
    data.categoryId = (
      await categoryFactory({ businessId: data.businessId })
    ).id;
  }
  return prisma.product.create({
    data: {
      name: "Product",
      description: "Description",
      price: 100,
      image: "Image",
      ...data,
    },
  });
};

export const userFactory = async (data = {}) => {
  return prisma.user.create({ data: {} });
};

export const orderFactory = async (data: any) => {
  return prisma.order.create({ data: { productsDetails: "[]", ...data } });
};
