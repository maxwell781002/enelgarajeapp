import prisma from "../prisma/prisma-client";
import { BaseRepository } from "../lib/base-repository";
import { CompleteProduct } from "../prisma/zod";
import { PaginateData as BasePaginateData } from "../types/pagination";
import { del, put } from "@vercel/blob";
import {
  ProductUpdateValidation,
  ProductValidation,
} from "../validation/product";
import { orderRepository } from "./order";

type PaginateData = {
  businessId?: string;
  categoryId?: string;
} & BasePaginateData;

export const PAGE_SIZE_FRONTEND = 6;

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
    // TODO: Check how to fix this in the frontend
    if (object.offerPrice) object.offerPrice = Number(object.offerPrice);
    if (object.price) object.price = Number(object.price);
    if (object.priority) object.priority = Number(object.priority);
    if (object.active) object.active = (object.active as any) === "true";
    if (object.isNew) object.isNew = (object.isNew as any) === "true";
    if (object.outOfStock)
      object.outOfStock = (object.outOfStock as any) === "true";
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
    if (image && typeof image === "object") {
      const blob = await this.uploadImage(data);
      try {
        const newImage = await this.model.update({
          where: { id: entity.id },
          data: { ...this.getObject(data), image: blob },
        });
        await del(entity.image.url);
        return newImage;
      } catch (error) {
        await del(blob.url);
        throw error;
      }
    }
    data.delete("image");
    return super.doUpdate(id, data);
  }

  async remove(id: any) {
    if (await orderRepository.hasOrders(id)) {
      throw new Error(
        "Este producto no puede ser eliminado. Puede desactivarlo si lo desea.",
      );
    }
    const entity = await this.getById(id);
    const data = await super.remove(id);
    await del(entity.image.url);
    return data;
  }

  paginate({ businessId, ...data }: PaginateData = {}) {
    return super.paginate({
      ...data,
      where: {
        businessId,
      },
    });
  }

  paginateFrontend({ categoryId, businessId, ...props }: PaginateData = {}) {
    const where: any = { businessId, active: true };
    if (categoryId) where["categoryId"] = categoryId;
    return super.paginate({
      ...props,
      where,
      pageSize: PAGE_SIZE_FRONTEND,
      orderBy: { priority: "desc" },
    });
  }

  async getTotals(businessId: string) {
    const totalActive = this.model.count({
      where: {
        businessId,
        active: true,
      },
    });
    const totalInactive = this.model.count({
      where: {
        businessId,
        active: false,
      },
    });
    const values = await Promise.all([totalActive, totalInactive]);
    return { totalActive: values[0], totalInactive: values[1] };
  }
}

export const productRepository = new ProductRepository();
