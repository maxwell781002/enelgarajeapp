import prisma from "../prisma/prisma-client";
import { BaseRepository } from "../lib/base-repository";
import { CompleteOrder, OrderModel } from "../prisma/zod";

export class OrderRepository extends BaseRepository<CompleteOrder> {
  constructor() {
    super(OrderModel, prisma.order);
  }
}

export const orderRepository = new OrderRepository();
