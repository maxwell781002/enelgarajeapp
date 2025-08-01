import { QvapayGateway, TropipayGateway } from "./payment-gateway";

const paymentGateway = {
  tropipay: TropipayGateway,
  qvapay: QvapayGateway,
};

export const createPaymentGateway = (gateway: keyof typeof paymentGateway) => {
  const _class = paymentGateway[gateway];
  return new _class();
};
