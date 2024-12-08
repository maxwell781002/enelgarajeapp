import { INFINITE_NUMBER, NUMBER_OF_PRODUCTS } from "../configs/plans";
import { getPlanFeature } from "../lib/plans-feature";
import { commissionCalculate } from "../lib/utils";
import prisma from "../prisma/prisma-client";
import { CompleteBusiness } from "../prisma/zod";
import { productRepository } from "../repositories/product";
import { ShopCartOrder } from "../types/shop-cart";
import { getCurrentOrder, hasProduct } from "./order";

export const getBySlug = async (slug: string) => {
  const order = await getCurrentOrder();
  return addProductFields(
    await prisma().product.findUnique({
      where: { slug },
      include: { priceValues: true },
    }),
    order,
  );
};

export const getById = (id: string) => {
  return prisma().product.findUnique({ where: { id } });
};

export const addProductFields = async (
  product: any,
  order: ShopCartOrder | null | undefined = null,
) => {
  const _isOffer = !!(product.offerPrice && product.offerPrice < product.price);
  const [commission, businessProfit] = commissionCalculate(
    _isOffer ? product.offerPrice : product.price,
    product.priceValues?.commissionType,
    product.priceValues?.commissionValue || 0,
  );
  return {
    ...product,
    _commission: commission,
    _businessProfit: businessProfit,
    _inCart: order && (await hasProduct(product.id, order)),
    _isOffer,
    _outOfStock:
      !product.allowOrderOutOfStock &&
      product.isExhaustible &&
      product.stock <= 0,
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

export const isLimited = async (business: CompleteBusiness) => {
  const featureValue = getPlanFeature<number>(NUMBER_OF_PRODUCTS, business);
  if (featureValue === INFINITE_NUMBER) {
    return false;
  }
  const { totalActive, totalInactive } = await productRepository.getTotals(
    business.id,
  );
  return totalActive + totalInactive >= featureValue;
};
