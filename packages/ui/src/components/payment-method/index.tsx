import { PaymentMethodType } from "@repo/model/validation/payment-method";
import TransfermovilDetail from "@repo/ui/components/payment-method/transfermovil";
import EnzonaDetail from "@repo/ui/components/payment-method/enzona";
import { CompletePaymentMethod } from "@repo/model/zod/paymentmethod";

export const PaymentMethodDetailByType = {
  [PaymentMethodType.ENZONA]: EnzonaDetail,
  [PaymentMethodType.TRANSFERMOVIL]: TransfermovilDetail,
};

export default function PaymentMethodDetail({
  data,
}: {
  data: CompletePaymentMethod;
}) {
  const Component = PaymentMethodDetailByType[data.type as PaymentMethodType];
  if (Component === undefined) {
    throw new Error(`Invalid payment method type: ${data.type}`);
  }
  return <Component data={data} />;
}
