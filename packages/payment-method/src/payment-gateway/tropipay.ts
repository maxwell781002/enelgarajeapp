import { CompleteOrder } from "@repo/model/prisma/zod/order";
import { AbstractPaymentGateway } from "../abstract-payment-gateway";

export class TropipayGateway extends AbstractPaymentGateway {
  defaultValue() {
    return {
      ...super.defaultValue(),
      data: {
        clientId: "",
        clientSecret: "",
      },
    };
  }

  async createPaymentLink(order: CompleteOrder) {
    return {
      link: "",
      data: {},
    };
  }
}
