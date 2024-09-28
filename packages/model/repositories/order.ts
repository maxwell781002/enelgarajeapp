import prisma from "../prisma/prisma-client";
import { BaseRepository } from "../lib/base-repository";
import {
  CompleteBusiness,
  CompleteOrder,
  CompleteUser,
  OrderModel,
} from "../prisma/zod";
import { PaginateData as BasePaginateData } from "../types/pagination";
import { OrderStatus } from "../prisma/generated/client";

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
        NOT: { userId: null },
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

  protected generateIdentifier(date: Date, position: number) {
    return `${date.getFullYear()}${date.getMonth() + 1}${date.getDate()}-${position}`;
  }

  protected async getLastPosition(businessId: string) {
    return (
      (
        await prisma.order.findFirst({
          where: { businessId },
          orderBy: { position: "desc" },
        })
      )?.position || 0
    );
  }

  async placeOrder(
    order: CompleteOrder,
    user: CompleteUser,
    business: CompleteBusiness,
  ) {
    const newPosition = (await this.getLastPosition(business.id)) + 1;
    return prisma.order.update({
      where: { id: order.id },
      data: {
        userId: user.id,
        total: order.total,
        status: OrderStatus.SEND,
        position: newPosition,
        sentAt: new Date(),
        businessId: business.id,
        identifier: this.generateIdentifier(new Date(), newPosition),
      },
    });
  }
}

export const orderRepository = new OrderRepository();
