import { Prisma } from "../prisma/prisma-client";
import { BaseRepository } from "../lib/base-repository";
import { CompleteProduct } from "../prisma/zod";
import { PaginateData as BasePaginateData } from "../types/pagination";
import { del, put } from "@vercel/blob";
import {
  ProductUpdateValidation,
  ProductValidation,
} from "../validation/product";
import { orderRepository } from "./order";
import { clearWhere } from "../lib/util-query";
import { isFile } from "../lib/utils";

type PaginateData = {
  businessId?: string;
  categoryId?: string;
} & BasePaginateData;

export const PAGE_SIZE_FRONTEND = 6;

export type UpdateStockItem = [product: CompleteProduct, quantity: number];

export class ProductRepository extends BaseRepository<
  CompleteProduct,
  typeof Prisma.product
> {
  constructor() {
    super(ProductValidation, Prisma.product);
    this.addValidator("update", ProductUpdateValidation);
  }

  protected uploadImage(data: any) {
    const imageFile = data.image as File;
    return put(imageFile.name, imageFile, {
      access: "public",
    });
  }

  protected async doCreate(data: any) {
    const blob = await this.uploadImage(data);
    return this.model.create({
      data: { ...this.getObject(data), image: blob },
    });
  }

  protected async doUpdate(id: string, data: any) {
    const image = data.image;
    const entity = await this.getById(id);
    if (image && isFile(image)) {
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

  paginate({ businessId, query, categoryId, ...data }: PaginateData = {}) {
    const where = clearWhere({
      businessId,
      categoryId,
    });
    if (query) {
      where["name"] = {
        contains: query,
        mode: "insensitive",
      };
    }
    return super.paginate({
      ...data,
      where,
      orderBy: { priority: "desc" },
    });
  }

  paginateFrontend({
    categoryId,
    businessId,
    query,
    ...props
  }: PaginateData = {}) {
    const where: any = { businessId, active: true };
    if (categoryId) where["categoryId"] = categoryId;
    if (query) {
      where["name"] = {
        contains: query,
        mode: "insensitive",
      };
    }
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

  updateStock(products: UpdateStockItem[]) {
    const promises = products
      .filter(([product]) => product.isExhaustible)
      .map(([product, decrement]) => {
        return this.model.update({
          where: { id: product.id },
          data: {
            stock: {
              decrement,
            },
          },
        });
      });
    return Promise.all(promises);
  }
}

export const productRepository = new ProductRepository();
