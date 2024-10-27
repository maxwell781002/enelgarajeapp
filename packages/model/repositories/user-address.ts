import prisma from "../prisma/prisma-client";
import { BaseRepository } from "../lib/base-repository";
import {
  CompleteAddress,
  CompleteUserAddress,
  UserAddressModel,
} from "../prisma/zod";
import { addressRepository } from "./address";

export class UserAddressRepository extends BaseRepository<
  CompleteUserAddress,
  typeof prisma.userAddress
> {
  constructor() {
    super(UserAddressModel.omit({ id: true }), prisma.userAddress);
  }

  async createNew(userId: string, data: Omit<CompleteAddress, "id">) {
    const address = await addressRepository.create(data);
    return prisma.userAddress.create({
      data: { addressId: address.id, userId },
    });
  }

  async findByUserId(userId: string) {
    const addresses = await prisma.userAddress.findMany({
      where: { userId },
      include: { address: true },
    });
    return addresses.map((address) => address.address);
  }
}

export const userAddressRepository = new UserAddressRepository();
