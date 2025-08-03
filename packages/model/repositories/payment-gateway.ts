import { Prisma } from "@repo/model/prisma/prisma-client";
import { BaseRepository } from "@repo/model/lib/base-repository";
import {
  PaymentGatewayModel,
  CompletePaymentGateway,
} from "@repo/model/prisma/zod/paymentgateway";

export class PaymentGatewayRepository extends BaseRepository<
  CompletePaymentGateway,
  typeof Prisma.paymentGateway
> {
  constructor() {
    super(PaymentGatewayModel.omit({ id: true }), "paymentGateway");
  }

  findByBusinessId(businessId: string) {
    return this.model.findMany({ where: { businessId } });
  }

  findByBusinessIdActive(businessId: string) {
    return this.model.findMany({ where: { businessId, active: true } });
  }
}

export const paymentGatewayRepository = new PaymentGatewayRepository();
