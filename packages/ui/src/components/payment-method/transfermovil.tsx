import Qr from "@repo/ui/components/qr";
import { CompletePaymentMethod } from "@repo/model/zod/paymentmethod";
import CopyToClipboard from "@repo/ui/components/copy-to-clipboard";
import { Phone, CreditCard } from "lucide-react";

export type TransfermovilProps = {
  data: CompletePaymentMethod;
};

export default function TransfermovilDetail({ data }: TransfermovilProps) {
  return (
    <div className="flex w-full">
      <Qr value={"ddddddd"} addCopy={true} />
      <div className="ml-4">
        <div className="flex items-center">
          <CreditCard className="h-5 w-5 mr-1 text-muted-foreground" />
          <CopyToClipboard text={(data.data as any)?.cardNumber} />
        </div>
        <div className="flex items-center">
          <Phone className="h-5 w-5 mr-1 text-muted-foreground" />
          <CopyToClipboard text={(data.data as any)?.phone} />
        </div>
      </div>
    </div>
  );
}
