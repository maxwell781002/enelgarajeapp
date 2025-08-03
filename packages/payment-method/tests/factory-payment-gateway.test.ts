import { describe, expect, it, vi } from "vitest";
import { createPaymentGateway } from "../src/factory-payment-gateway";
import { QvapayGateway, TropipayGateway } from "../src/payment-gateway";
import { PaymentGatewayType } from "@repo/model/types/enums";

const mocksAuth = vi.hoisted(() => ({
  auth: vi.fn(() => ({})),
}));
vi.mock("@repo/model/lib/auth", () => ({
  auth: mocksAuth.auth,
}));

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
