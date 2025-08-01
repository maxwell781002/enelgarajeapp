import {
  PaymentGatewayType,
  TPaymentGatewayType,
} from "packages/model/types/enums";
import {
  ManualGateway,
  QvapayGateway,
  TropipayGateway,
} from "./payment-gateway";
import { CompletePaymentGateway } from "packages/model/prisma/zod/paymentgateway";

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
