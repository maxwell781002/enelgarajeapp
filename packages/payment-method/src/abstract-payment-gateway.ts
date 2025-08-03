import { CompleteOrder } from "@repo/model/prisma/zod/order";
import { paymentGatewayRepository } from "@repo/model/repositories/payment-gateway";
import { TPaymentGatewayType } from "@repo/model/types/enums";

export abstract class AbstractPaymentGateway {
  defaultValue() {
    return {
      active: true,
    };
  }

  abstract createPaymentLink(
    order: CompleteOrder,
  ): Promise<{ link: string; data: any }>;

  getPaymentMethod(order: CompleteOrder, type: TPaymentGatewayType) {
    return paymentGatewayRepository.findByBusinessIdActiveAndType(
      order.businessId as string,
      type,
    );
  }
}
