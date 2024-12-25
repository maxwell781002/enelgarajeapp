import { INFINITE_NUMBER, NUMBER_OF_PRODUCTS } from "../configs/plans";
import { getPlanFeature } from "../lib/plans-feature";
import { commissionCalculate } from "../lib/utils";
import prisma from "../prisma/prisma-client";
import { CompleteBusiness } from "../prisma/zod";
import { productRepository } from "../repositories/product";

export const getBySlug = async (slug: string) => {
  return addProductFields(
    await prisma().product.findUnique({
      where: { slug },
      include: { priceValues: true },
    }),
  );
};

export const getById = (id: string) => {
  return prisma().product.findUnique({ where: { id } });
};

export const addProductFields = (product: any) => {
  const _isOffer = !!(product.offerPrice && product.offerPrice < product.price);
  const price = _isOffer ? product.offerPrice : product.price;
  const [commission, businessProfit] = commissionCalculate(
    price,
    product.priceValues?.commissionType,
    product.priceValues?.commissionValue || 0,
  );
  return {
    ...product,
    _commission: commission,
    _businessProfit: businessProfit,
    _isOffer,
    _price: price,
    _outOfStock:
      !product.allowOrderOutOfStock &&
      product.isExhaustible &&
      product.stock <= 0,
  };
};

export const paginateFrontend = async (parameters: any) => {
  const { data, ...props } =
    await productRepository.paginateFrontend(parameters);
  const products = data.map(async (item: any) => addProductFields(item));
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
