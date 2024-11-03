import { PaymentMethodType } from "@repo/model/validation/payment-method";
import TransfermovilDetail from "@repo/ui/components/payment-method/transfermovil";
import EnzonaDetail from "@repo/ui/components/payment-method/enzona";

export const PaymentMethodDetailByType = {
  [PaymentMethodType.ENZONA]: EnzonaDetail,
  [PaymentMethodType.TRANSFERMOVIL]: TransfermovilDetail,
};
