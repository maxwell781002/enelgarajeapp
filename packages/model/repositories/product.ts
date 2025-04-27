import prisma, { Prisma, transaction } from "../prisma/prisma-client";
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
import { CommissionTypes } from "../types/enums";
import { addProductFields } from "../repository/product";

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
    super(ProductValidation, "product");
    this.addValidator("update", ProductUpdateValidation);
  }

  getByBusinessAndIds(ids: string[], businessId: string) {
    return this.model.findMany({
      where: { id: { in: ids }, businessId },
      include: {
        priceValues: true,
      },
    });
  }

  async getAllProduct(where: any) {
    return addProductFields(
      await this.model.findUnique({
        where,
        include: {
          business: true,
          priceValues: true,
        },
      }),
    );
  }

  protected uploadImage(data: any) {
    const imageFile = data.image as File;
    return put(imageFile.name, imageFile, {
      access: "public",
    });
  }

  protected getCommissionData(priceValues: any, productId: string) {
    const { hasCommission, commissionValue, ...productPrice } = priceValues;
    return {
      commissionValue: hasCommission ? commissionValue : 0,
      commissionType: CommissionTypes.PERCENTAGE,
      ...productPrice,
      productId,
    };
  }

  protected async doCreate(data: any) {
    const { priceValues, ...rest } = data;
    return transaction(async () => {
      const blob = await this.uploadImage(rest);
      const entity = await super.doCreate({
        ...this.getObject(rest),
        image: blob,
      });
      const commissions = this.getCommissionData(priceValues || {}, entity.id);
      await prisma().productPrice.create({
        data: commissions,
      });
      return entity;
    });
  }

  protected async doUpdate(id: string, data: any) {
    const image = data.image;
    return transaction(async () => {
      const entity = await this.getById(id);
      let { priceValues, ...rest } = data;
      if (image && isFile(image)) {
        const blob = await this.uploadImage(rest);
        try {
          rest = { ...rest, image: blob };
          await del(entity.image.url);
        } catch (error) {
          await del(blob.url);
          throw error;
        }
      }
      const newEntity = await super.doUpdate(id, rest);
      const commissions = this.getCommissionData(priceValues, newEntity.id);
      await prisma().productPrice.upsert({
        where: { productId: newEntity.id },
        update: commissions,
        create: commissions,
      });
      return newEntity;
    });
  }

  async remove(id: any) {
    if (await orderRepository.hasOrders(id)) {
      throw new Error(
        "Este producto no puede ser eliminado. Puede desactivarlo si lo desea.",
      );
    }
    return transaction(async () => {
      const entity = await this.getById(id);
      const data = await super.remove(id);
      await del(entity.image.url);
      return data;
    });
  }

  basePaginate({
    businessId,
    query,
    categoryId,
    where: baseWhere = {},
    ...data
  }: PaginateData = {}) {
    const where = clearWhere({
      businessId,
      categoryId,
      ...baseWhere,
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
      include: {
        priceValues: true,
      },
    });
  }

  paginate(paginate: PaginateData = {}) {
    return this.basePaginate(paginate);
  }

  collaborationPaginate(
    paginate: PaginateData = {},
  ) {
    return this.basePaginate({
      ...paginate,
      where: {
        active: true,
        OR: [
          { stock: 0, allowOrderOutOfStock: true },
          { stock: { gt: 0 } },
        ],
      },
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
      distinct: ["id"],
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

  getProductsByIds(ids: string[], businessId: string) {
    return this.model.findMany({
      where: { id: { in: ids }, businessId },
      include: {
        priceValues: true,
      },
    });
  }
}

export const productRepository = new ProductRepository();
