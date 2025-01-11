import { Prisma } from "@repo/model/prisma/prisma-client";
import { BaseRepository } from "@repo/model/lib/base-repository";
import { CompleteCustomer, CustomerModel } from "../prisma/zod";

export class CustomerRepository extends BaseRepository<
  CompleteCustomer,
  typeof Prisma.customer
> {
  constructor() {
    super(CustomerModel.omit({ id: true }), "customer");
  }
}

export const customerRepository = new CustomerRepository();
