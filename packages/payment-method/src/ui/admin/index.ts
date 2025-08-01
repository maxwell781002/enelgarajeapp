import QvapayAdminForm from "./gateway/qvapay";
import TropipayAdminForm from "./gateway/tropipay";
import { PaymentGatewayType } from "@repo/model/types/enums";

const paymentGateway = {
  [PaymentGatewayType.TROPIPAY]: TropipayAdminForm,
  [PaymentGatewayType.QVAPAY]: QvapayAdminForm,
};

export type TKey = keyof typeof paymentGateway;

export const getAdminForm = (type: TKey) => {
  return paymentGateway[type];
};
