import prisma from "../prisma/prisma-client";
import { BaseRepository } from "../lib/base-repository";
import { CompleteOrder, OrderModel } from "../prisma/zod";
import { PaginateData } from "../types/pagination";

export class OrderRepository extends BaseRepository<
  CompleteOrder,
  typeof prisma.order
> {
  constructor() {
    super(OrderModel, prisma.order);
  }

  paginate(data: PaginateData = {}) {
    return super.paginate({
      ...data,
      include: {
        user: true,
      },
    });
  }
}

export const orderRepository = new OrderRepository();
