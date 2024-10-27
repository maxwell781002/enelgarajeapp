import prisma from "../prisma/prisma-client";
import { BaseRepository } from "../lib/base-repository";
import { CompleteUserAddress, UserAddressModel } from "../prisma/zod";

export class UserAddressRepository extends BaseRepository<
  CompleteUserAddress,
  typeof prisma.userAddress
> {
  constructor() {
    super(UserAddressModel.omit({ id: true }), prisma.userAddress);
  }
}

export const userAddressRepository = new UserAddressRepository();
