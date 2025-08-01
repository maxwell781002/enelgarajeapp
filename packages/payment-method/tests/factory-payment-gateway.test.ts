import { describe, expect, it } from "vitest";
import { createPaymentGateway } from "../src/factory-payment-gateway";
import { QvapayGateway, TropipayGateway } from "../src/payment-gateway";

describe("Gateway factory", () => {
  it("should create a tropipay gateway", () => {
    const gateway = createPaymentGateway("tropipay");
    expect(gateway).toBeInstanceOf(TropipayGateway);
  });

  it("should create a qvapay gateway", () => {
    const gateway = createPaymentGateway("qvapay");
    expect(gateway).toBeInstanceOf(QvapayGateway);
  });
});
