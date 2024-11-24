import { Prisma } from "../prisma/prisma-client";
import { BaseRepository } from "../lib/base-repository";
import { CompletePaymentMethod, PaymentMethodModel } from "../prisma/zod";
import { PaymentMethodType as BasePaymentMethodType } from "../prisma/generated/client";
import { PaginateData as BasePaginateData } from "../types/pagination";
import { clearWhere } from "../lib/util-query";

export const PaymentMethodType = BasePaymentMethodType;

type PaginateData = {
  businessId?: string;
} & BasePaginateData;

export class PaymentMethodRepository extends BaseRepository<
  CompletePaymentMethod,
  typeof Prisma.paymentMethod
> {
  constructor() {
    super(PaymentMethodModel.omit({ id: true }), Prisma.paymentMethod);
  }

  getAll(businessId: string) {
    return this.model.findMany({
      where: { businessId },
    });
  }

  countByBusiness(businessId: string) {
    return this.model.count({
      where: { businessId },
    });
  }

  paginate({ businessId, query, ...data }: PaginateData = {}) {
    const where = clearWhere({
      businessId,
    });
    return super.paginate({
      ...data,
      where,
    });
  }
}

export const paymentMethodRepository = new PaymentMethodRepository();
