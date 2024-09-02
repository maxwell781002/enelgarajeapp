import prisma from "../prisma/prisma-client";
import { BaseRepository } from "../lib/base-repository";
import { CompleteOrder, OrderModel } from "../prisma/zod";
import { PaginateData as BasePaginateData } from "../types/pagination";

type PaginateData = {
  businessId?: string;
} & BasePaginateData;

export class OrderRepository extends BaseRepository<
  CompleteOrder,
  typeof prisma.order
> {
  constructor() {
    super(OrderModel, prisma.order);
  }

  paginate({ businessId, ...data }: PaginateData = {}) {
    return super.paginate({
      ...data,
      where: {
        businessId,
      },
      include: {
        user: true,
      },
    });
  }

  get(id: any, query?: any) {
    return super.get(id, {
      include: {
        user: true,
        items: {
          include: { product: true },
          orderBy: { position: "asc" },
        },
      },
    });
  }
}

export const orderRepository = new OrderRepository();
