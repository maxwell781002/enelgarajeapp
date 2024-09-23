import prisma from "../prisma/prisma-client";
import { BaseRepository } from "../lib/base-repository";
import { CompleteProduct } from "../prisma/zod";
import { PaginateData as BasePaginateData } from "../types/pagination";
import { del, put } from "@vercel/blob";
import {
  ProductUpdateValidation,
  ProductValidation,
} from "../validation/product";

type PaginateData = {
  businessId?: string;
} & BasePaginateData;

export class ProductRepository extends BaseRepository<
  CompleteProduct,
  typeof prisma.product
> {
  constructor() {
    super(ProductValidation, prisma.product);
    this.addValidator("update", ProductUpdateValidation);
  }

  protected getObject(data: FormData) {
    const object: Partial<CompleteProduct> = super.getObject(data);
    if (object.offerPrice) object.offerPrice = Number(object.offerPrice);
    if (object.price) object.price = Number(object.price);
    return object;
  }

  protected uploadImage(data: FormData) {
    const imageFile = data.get("image") as File;
    return put(imageFile.name, imageFile, {
      access: "public",
    });
  }

  protected async doCreate(data: FormData) {
    const blob = await this.uploadImage(data);
    return this.model.create({
      data: { ...this.getObject(data), image: blob },
    });
  }

  protected async doUpdate(id: string, data: FormData) {
    const image = data.get("image");
    const entity = await this.getById(id);
    const oldImage: any = JSON.parse(entity.image);
    if (image && typeof image === "object") {
      const blob = await this.uploadImage(data);
      try {
        const newImage = await this.model.update({
          where: { id: entity.id },
          data: { ...this.getObject(data), image: blob },
        });
        await del(oldImage.url);
        return newImage;
      } catch (error) {
        await del(blob.url);
        throw error;
      }
    }
    data.delete("image");
    return super.doUpdate(id, data);
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
