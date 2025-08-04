import { Prisma } from "@repo/model/prisma/prisma-client";
import { BaseRepository } from "@repo/model/lib/base-repository";
import {
  PaymentGatewayModel,
  CompletePaymentGateway,
} from "@repo/model/prisma/zod/paymentgateway";
import { TPaymentGatewayType } from "@repo/model/types/enums";

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

  findByBusinessIdActiveAndType(businessId: string, type: TPaymentGatewayType) {
    return this.model.findFirst({ where: { businessId, active: true, type } });
  }
}

export const paymentGatewayRepository = new PaymentGatewayRepository();
