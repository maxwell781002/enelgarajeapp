import prisma from "../prisma/prisma-client";
import { BaseRepository } from "../lib/base-repository";
import { CompletePaymentMethod, PaymentMethodModel } from "../prisma/zod";
import { PaymentMethodType as BasePaymentMethodType } from "../prisma/generated/client";

export const PaymentMethodType = BasePaymentMethodType;

export class PaymentMethodRepository extends BaseRepository<
  CompletePaymentMethod,
  typeof prisma.paymentMethod
> {
  constructor() {
    super(PaymentMethodModel.omit({ id: true }), prisma.paymentMethod);
  }

  getAll() {
    return this.model.findMany();
  }
}

export const paymentMethodRepository = new PaymentMethodRepository();
