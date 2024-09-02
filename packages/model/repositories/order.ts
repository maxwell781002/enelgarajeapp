import prisma from "../prisma/prisma-client";
import { BaseRepository } from "../lib/base-repository";
import { CompleteOrder, OrderModel } from "../prisma/zod";
import { PaginateData as BasePaginateData } from "../types/pagination";
import { OrderStatus } from "@prisma/client";

export const statusColors: Record<OrderStatus, string> = {
  CREATED: "bg-yellow-500",
  SEND: "bg-blue-500",
  PAYED: "bg-purple-500",
  REJECTED: "bg-red-500",
};

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

  orderToChange() {
    return Object.entries(statusColors).filter(
      ([key]) => key !== OrderStatus.CREATED,
    );
  }

  changeStatus(id: string, status: OrderStatus) {
    return prisma.order.update({
      where: { id },
      data: { status },
    });
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
