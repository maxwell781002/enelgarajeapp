import { CompleteOrder } from "@repo/model/prisma/zod/order";
import { AbstractPaymentGateway } from "../abstract-payment-gateway";
import { Tropipay, ServerSideUtils } from "@yosle/tropipayjs";
import { PaymentGatewayType } from "@repo/model/types/enums";

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

  async getClientConfig(order: CompleteOrder) {
    const paymentGateway = await this.getPaymentMethod(
      order,
      PaymentGatewayType.TROPIPAY,
    );
    console.log(paymentGateway);
    return {
      clientId: paymentGateway.data.clientId,
      clientSecret: paymentGateway.data.clientSecret,
      scopes: ["ALLOW_PAYMENT_IN", "ALLOW_EXTERNAL_CHARGE"],
      // serverMode: "Development", // it will be used as default if omited
    };
  }

  async createPaymentLink(order: CompleteOrder) {
    const payload = {
      reference: order.id,
      concept: "Compra",
      description: "Compra en El Garaje",
      amount: order.total,
      currency: "USD",
      reasonId: 4,
      singleUse: "true",
      favorite: "true",
      expirationDays: 1,
      lang: "es",
      serviceDate: order.sentAt,
      directPayment: "true",
      urlSuccess: "https://webhook-test.com/c700af6da83f620f6a982ecda18e92d4",
      urlFailed: "https://webhook-test.com/c700af6da83f620f6a982ecda18e92d4",
      urlNotification:
        "https://webhook-test.com/c700af6da83f620f6a982ecda18e92d4",
    };
    const config = await this.getClientConfig(order);
    const tpp = new Tropipay(config);
    const paylink = await tpp.paymentCards.create(payload as any);
    return {
      link: paylink.shortUrl,
      data: paylink,
    };
  }

  async verifyPayload(order: CompleteOrder, payload: any) {
    const config = await this.getClientConfig(order);
    return ServerSideUtils.verifySignatureV3(
      {
        clientId: config.clientId,
        clientSecret: config.clientSecret,
      },
      payload.originalCurrencyAmount,
      payload.bankOrderCode,
      payload.signaturev2,
    );
  }
}
