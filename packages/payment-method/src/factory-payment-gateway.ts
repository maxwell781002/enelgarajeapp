import {
  OrderStatus,
  PaymentGatewayOrderLogStatus,
  PaymentGatewayType,
  TPaymentGatewayType,
} from "@repo/model/types/enums";
import {
  ManualGateway,
  QvapayGateway,
  TropipayGateway,
} from "./payment-gateway";
import { CompletePaymentGateway } from "@repo/model/prisma/zod/paymentgateway";
import { CompleteOrder } from "packages/model/prisma/zod/order";
import { paymentGatewayOrderLogRepository } from "@repo/model/repositories/payment-gateway-order-log";
import { changeOrderStatus, getOrderById } from "@repo/model/repository/order";

const paymentGateway: Record<TPaymentGatewayType, any> = {
  [PaymentGatewayType.TROPIPAY]: TropipayGateway,
  [PaymentGatewayType.QVAPAY]: QvapayGateway,
  [PaymentGatewayType.MANUAL]: ManualGateway,
};

export const createPaymentGateway = (gateway: TPaymentGatewayType) => {
  const _class = paymentGateway[gateway];
  return new _class();
};

export const getPaymentGatewayDefaultValues = (
  paymentGateways: CompletePaymentGateway[],
) => {
  const byTypes = paymentGateways.reduce(
    (acc, gateway) => {
      acc[gateway.type as TPaymentGatewayType] = gateway;
      return acc;
    },
    {} as Record<TPaymentGatewayType, CompletePaymentGateway>,
  );
  const defaultValues = Object.entries(PaymentGatewayType).map(([g]) => {
    const _class = createPaymentGateway(g);
    const data = byTypes[g] ? byTypes[g] : _class.defaultValue();
    return {
      type: g,
      ...data,
    };
  });
  return defaultValues;
};

export const createPaymentGatewayLog = async (order: CompleteOrder) => {
  const gateway = createPaymentGateway(
    order.paymentGatewayType as TPaymentGatewayType,
  );
  const { link, data } = await gateway.createPaymentLink(order);
  console.log(link, data);
  // TODO: Check if already exist payment log register
  await paymentGatewayOrderLogRepository.create({
    logs: [JSON.stringify(data)],
    orderId: order.id,
    status: PaymentGatewayOrderLogStatus.SENT,
  });
  return link;
};

export const callbackPayment = async (id: string, data: any) => {
  const order = await getOrderById(id);
  const gateway = createPaymentGateway(
    order.paymentGatewayType as TPaymentGatewayType,
  );
  const verify = await gateway.verifyPayload(order, data);
  if (!verify) {
    return false;
  }
  const orderLog = await paymentGatewayOrderLogRepository.findByOrderId(id);
  const { status, ...rest } = data;
  const paymentGatewayLogStatus =
    status === "OK"
      ? PaymentGatewayOrderLogStatus.PAID
      : PaymentGatewayOrderLogStatus.FAILED;
  await paymentGatewayOrderLogRepository.update(orderLog.id, {
    ...orderLog,
    status: paymentGatewayLogStatus,
    logs: [...orderLog.logs, JSON.stringify({ status, ...rest })],
  });
  if (status === "OK") {
    return changeOrderStatus(id, OrderStatus.PAYED);
  }
  return true;
};
