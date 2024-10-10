import prisma from "../prisma/prisma-client";
import { productRepository } from "../repositories/product";
import { getCurrentOrder, hasProduct, ShopCartOrder } from "./order";

export const getBySlug = async (slug: string) => {
  const order = await getCurrentOrder();
  return addProductFields(
    await prisma.product.findUnique({ where: { slug } }),
    order,
  );
};

export const getById = (id: string) => {
  return prisma.product.findUnique({ where: { id } });
};

export const addProductFields = async (
  product: any,
  order: ShopCartOrder | null | undefined,
) => {
  return {
    ...product,
    _inCart: order && await hasProduct(product.id, order),
    _isOffer: product.offerPrice && product.offerPrice < product.price,
  };
};

export const paginateFrontend = async (parameters: any) => {
  const order = await getCurrentOrder();
  const { data, ...props } =
    await productRepository.paginateFrontend(parameters);
  const products = data.map(async (item: any) => addProductFields(item, order));
  return {
    data: await Promise.all(products),
    ...props,
  };
};
