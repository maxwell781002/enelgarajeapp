import { CompleteOrder } from "@repo/model/prisma/zod/order";

export abstract class AbstractPaymentGateway {
  defaultValue() {
    return {
      active: true,
    };
  }

  abstract createPaymentLink(
    order: CompleteOrder,
  ): Promise<{ link: string; data: any }>;
}
