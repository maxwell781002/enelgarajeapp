import prisma from "../prisma/prisma-client";
import { BaseRepository } from "../lib/base-repository";
import { CompleteProduct } from "../prisma/zod";
import { PaginateData as BasePaginateData } from "../types/pagination";
import { put } from "@vercel/blob";
import { ProductValidation } from "../validation/product";

type PaginateData = {
  businessId?: string;
} & BasePaginateData;

export class ProductRepository extends BaseRepository<
  CompleteProduct,
  typeof prisma.product
> {
  constructor() {
    super(ProductValidation, prisma.product);
  }

  protected getObject(data: FormData) {
    const object: Partial<CompleteProduct> = super.getObject(data);
    if (object.offerPrice) object.offerPrice = Number(object.offerPrice);
    if (object.price) object.price = Number(object.price);
    return object;
  }

  protected async doCreate(data: FormData) {
    const imageFile = data.get("image") as File;
    const blob = await put(imageFile.name, imageFile, {
      access: "public",
    });
    return this.model.create({
      data: { ...this.getObject(data), image: blob },
    });
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
