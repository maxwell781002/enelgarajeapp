import { Prisma } from "../prisma/prisma-client";
import { BaseRepository } from "../lib/base-repository";
import { CategoryModel, CompleteCategory } from "../prisma/zod";
import { PaginateData as BasePaginateData } from "../types/pagination";

type PaginateData = {
  businessId?: string;
} & BasePaginateData;

export class CategoryRepository extends BaseRepository<
  CompleteCategory,
  typeof Prisma.category
> {
  constructor() {
    super(CategoryModel.omit({ id: true }), Prisma.category);
  }

  getAll(businessId: string) {
    return this.model.findMany({
      where: { businessId, active: true },
      orderBy: { priority: "desc" },
    });
  }

  paginate({ businessId, query, ...data }: PaginateData = {}) {
    const where: any = {
      businessId,
    };
    if (query) {
      where["name"] = {
        contains: query,
        mode: "insensitive",
      };
    }
    return super.paginate({
      ...data,
      where,
    });
  }
}

export const categoryRepository = new CategoryRepository();
