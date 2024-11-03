import Qr from "@repo/ui/components/qr";
import { CompletePaymentMethod } from "@repo/model/zod/paymentmethod";

export type EnzonaProps = {
  data: CompletePaymentMethod;
};

export default function EnzonaDetail({ data }: EnzonaProps) {
  return (
    <div>
      <Qr value={"ddddddd"} addCopy={true} />
    </div>
  );
}
