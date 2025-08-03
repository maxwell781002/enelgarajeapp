import { CompleteOrder } from "@repo/model/prisma/zod/order";
import { paymentGatewayRepository } from "@repo/model/repositories/payment-gateway";
import { TPaymentGatewayType } from "@repo/model/types/enums";
import { headers } from "next/headers";

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

  async getCallbackUrl(order: CompleteOrder) {
    const headersList = await headers();
    const hostname = headersList.get("x-forwarded-host");
    return `https://${hostname}/api/payment-method/callback/${order.id}`;
  }

  abstract verifyPayload(order: CompleteOrder, payload: any): Promise<boolean>;
}
