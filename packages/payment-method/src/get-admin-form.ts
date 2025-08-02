import ManualAdminForm from "./ui/admin/gateway/manual";
import QvapayAdminForm from "./ui/admin/gateway/qvapay";
import TropipayAdminForm from "./ui/admin/gateway/tropipay";
import { PaymentGatewayType } from "@repo/model/types/enums";

const paymentGateway = {
  [PaymentGatewayType.TROPIPAY]: TropipayAdminForm,
  [PaymentGatewayType.QVAPAY]: QvapayAdminForm,
  [PaymentGatewayType.MANUAL]: ManualAdminForm,
};

export type TKey = keyof typeof paymentGateway;

export const getAdminForm = (type: TKey) => {
  return paymentGateway[type];
};
