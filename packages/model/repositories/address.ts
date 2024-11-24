import { Prisma } from "../prisma/prisma-client";
import { BaseRepository } from "../lib/base-repository";
import { AddressModel, CompleteAddress } from "../prisma/zod";

export class AddressRepository extends BaseRepository<
  CompleteAddress,
  typeof Prisma.address
> {
  constructor() {
    super(AddressModel.omit({ id: true }), Prisma.address);
  }
}

export const addressRepository = new AddressRepository();
