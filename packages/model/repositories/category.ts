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

  protected getObject(data: FormData) {
    const object: Partial<CompleteCategory> = super.getObject(data);
    if (object.priority) object.priority = Number(object.priority);
    if (object.active) object.active = (object.active as any) === "true";
    return object;
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
