import { describe, expect, it } from "vitest";
import { createPaymentGateway } from "../src/factory-payment-gateway";
import { QvapayGateway, TropipayGateway } from "../src/payment-gateway";
import { PaymentGatewayType } from "@repo/model/types/enums";

describe("Gateway factory", () => {
  it("should create a tropipay gateway", () => {
    const gateway = createPaymentGateway(PaymentGatewayType.TROPIPAY);
    expect(gateway).toBeInstanceOf(TropipayGateway);
  });

  it("should create a qvapay gateway", () => {
    const gateway = createPaymentGateway(PaymentGatewayType.QVAPAY);
    expect(gateway).toBeInstanceOf(QvapayGateway);
  });
});
