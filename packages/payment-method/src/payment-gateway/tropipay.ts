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
}
