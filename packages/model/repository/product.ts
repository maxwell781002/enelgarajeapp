import prisma from "../prisma/prisma-client";
import { productRepository } from "../repositories/product";
import { getCurrentOrder, hasProduct } from "./order";

export const getBySlug = (slug: string) => {
  return prisma.product.findUnique({ where: { slug } });
};

export const getById = (id: string) => {
  return prisma.product.findUnique({ where: { id } });
};

export const paginateFrontend = async (parameters: any) => {
  const order = await getCurrentOrder()
  const { data, ...props } = await productRepository.paginateFrontend(parameters);
  const products = data.map(async (item: any) => ({
    ...item,
    _inCart: await hasProduct(item.id, order),
  }));
  return {
    data: await Promise.all(products),
    ...props,
  };
};
