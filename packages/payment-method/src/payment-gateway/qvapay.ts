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
}
