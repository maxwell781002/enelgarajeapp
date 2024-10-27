import prisma from "../prisma/prisma-client";
import { BaseRepository } from "../lib/base-repository";
import { CompleteOrderAddress, OrderAddressModel } from "../prisma/zod";
import { addressRepository } from "./address";

export class OrderAddressRepository extends BaseRepository<
  CompleteOrderAddress,
  typeof prisma.orderAddress
> {
  constructor() {
    super(OrderAddressModel.omit({ id: true }), prisma.orderAddress);
  }

  async createNew(orderId: string, data: CompleteOrderAddress) {
    const address = await addressRepository.create(data);
    return prisma.orderAddress.create({
      data: { addressId: address.id, orderId },
    });
  }
}

export const orderAddressRepository = new OrderAddressRepository();
