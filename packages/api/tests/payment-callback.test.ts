import { afterAll, beforeAll, describe, expect, it, vi } from "vitest";
import app from "@repo/api/routes";
import {
  businessFactory,
  clearBd,
  orderFactory,
  paymentGatewayOrderLogFactory,
} from "../../model/tests/factories";
import { orderRepository } from "@repo/model/repositories/order";
import {
  OrderStatus,
  PaymentGatewayOrderLogStatus,
} from "@repo/model/types/enums";
import { paymentGatewayOrderLogRepository } from "@repo/model/repositories/payment-gateway-order-log";

const mocksAuth = vi.hoisted(() => ({
  auth: vi.fn(() => ({})),
}));
vi.mock("@repo/model/lib/auth", () => ({
  auth: mocksAuth.auth,
}));
vi.mock("@repo/payment-method/payment-gateway/tropipay", () => ({
  auth: mocksAuth.auth,
}));

describe("payment-callback", () => {
  let orderGood;
  let orderBad;
  let business;
  let orderLogGood;
  let orderLogBad;

  beforeAll(async () => {
    business = await businessFactory();
    orderGood = await orderFactory({
      businessId: business.id,
      status: OrderStatus.SEND,
    });
    orderBad = await orderFactory({
      businessId: business.id,
      status: OrderStatus.SEND,
    });
    orderLogGood = await paymentGatewayOrderLogFactory({
      orderId: orderGood.id,
    });
    orderLogBad = await paymentGatewayOrderLogFactory({ orderId: orderBad.id });
  });

  afterAll(async () => {
    await clearBd();
  });

  it("ok", async () => {
    const res = await app.request(
      `/api/payment-method/callback/${orderGood.id}`,
      {
        method: "POST",
        body: JSON.stringify({
          status: "OK",
        }),
      },
    );
    expect(res.status).toBe(200);
    const orderEntity = await orderRepository.getById(orderGood.id);
    expect(orderEntity.status).toBe(OrderStatus.PAYED);
    const orderLogEntity = await paymentGatewayOrderLogRepository.getById(
      orderLogGood.id,
    );
    expect(orderLogEntity.status).toBe(PaymentGatewayOrderLogStatus.PAID);
  });

  it("ko", async () => {
    const res = await app.request(
      `/api/payment-method/callback/${orderBad.id}`,
      {
        method: "POST",
        body: JSON.stringify({
          status: "KO",
        }),
      },
    );
    expect(res.status).toBe(200);
    const orderEntity = await orderRepository.getById(orderBad.id);
    expect(orderEntity.status).toBe(OrderStatus.SEND);
    const orderLogEntity = await paymentGatewayOrderLogRepository.getById(
      orderLogBad.id,
    );
    expect(orderLogEntity.status).toBe(PaymentGatewayOrderLogStatus.FAILED);
  });
});
