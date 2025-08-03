import { CompleteOrder } from "@repo/model/prisma/zod/order";
import { AbstractPaymentGateway } from "../abstract-payment-gateway";

export class ManualGateway extends AbstractPaymentGateway {
  async createPaymentLink(order: CompleteOrder) {
    return {
      link: "",
      data: {},
    };
  }
}
