import prisma, { Prisma } from "../prisma/prisma-client";
import { BaseRepository } from "../lib/base-repository";
import { CompleteUserAddress, UserAddressModel } from "../prisma/zod";

export class UserAddressRepository extends BaseRepository<
  CompleteUserAddress,
  typeof Prisma.userAddress
> {
  constructor() {
    super(UserAddressModel.omit({ id: true }), Prisma.userAddress);
  }

  async findByUserId(userId: string) {
    const addresses = await prisma().userAddress.findMany({
      where: { userId },
      include: { address: { include: { neighborhood: true } } },
    });
    return addresses.map((address) => address.address);
  }

  findByAddressIdAndUserId(addressId: string, userId: string) {
    return prisma().userAddress.findFirst({
      where: { addressId, userId },
    });
  }
}

export const userAddressRepository = new UserAddressRepository();
