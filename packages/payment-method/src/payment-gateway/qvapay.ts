import { CompleteOrder } from "@repo/model/prisma/zod/order";
import { AbstractPaymentGateway } from "../abstract-payment-gateway";

export class QvapayGateway extends AbstractPaymentGateway {
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

  async verifyPayload(order: CompleteOrder, payload: any) {
    return true;
  }
}
