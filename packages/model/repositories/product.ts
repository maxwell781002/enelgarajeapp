import prisma from "../prisma/prisma-client";
import { BaseRepository } from "../lib/base-repository";
import { CompleteProduct, ProductModel } from "../prisma/zod";
import { PaginateData as BasePaginateData } from "../types/pagination";

type PaginateData = {
  businessId?: string;
} & BasePaginateData;

export class ProductRepository extends BaseRepository<
  CompleteProduct,
  typeof prisma.product
> {
  constructor() {
    super(ProductModel.omit({ id: true }), prisma.product);
  }

  paginate({ businessId, ...data }: PaginateData = {}) {
    return super.paginate({
      ...data,
      where: {
        businessId,
      },
    });
  }
}

export const productRepository = new ProductRepository();
