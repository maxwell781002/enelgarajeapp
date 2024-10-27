import prisma from "../prisma/prisma-client";
import { BaseRepository } from "../lib/base-repository";
import { AddressModel, CompleteAddress } from "../prisma/zod";

export class AddressRepository extends BaseRepository<
  CompleteAddress,
  typeof prisma.address
> {
  constructor() {
    super(AddressModel.omit({ id: true }), prisma.address);
  }
}

export const addressRepository = new AddressRepository();
