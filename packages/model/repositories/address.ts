import { Prisma } from "@repo/model/prisma/prisma-client";
import { BaseRepository } from "@repo/model/lib/base-repository";
import { AddressModel, CompleteAddress } from "@repo/model/prisma/zod/address";

export class AddressRepository extends BaseRepository<
  CompleteAddress,
  typeof Prisma.address
> {
  constructor() {
    super(AddressModel.omit({ id: true }), "address");
  }
}

export const addressRepository = new AddressRepository();
