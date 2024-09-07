import prisma from "../prisma/prisma-client";
import { BaseRepository } from "../lib/base-repository";
import { CategoryModel, CompleteCategory } from "../prisma/zod";
import { PaginateData as BasePaginateData } from "../types/pagination";

type PaginateData = {
  businessId?: string;
} & BasePaginateData;

export class CategoryRepository extends BaseRepository<
  CompleteCategory,
  typeof prisma.category
> {
  constructor() {
    super(CategoryModel.omit({ id: true }), prisma.category);
  }

  getAll(businessId: string) {
    return this.model.findMany({ where: { businessId } });
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

export const categoryRepository = new CategoryRepository();
