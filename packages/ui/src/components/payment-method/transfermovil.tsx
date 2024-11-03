"use client";

import Qr from "@repo/ui/components/qr";
import { Card, CardContent } from "@repo/ui/components/ui/card";
import { CreditCard, Phone } from "lucide-react";
import { CompletePaymentMethod } from "@repo/model/zod/paymentmethod";
import CopyToClipboard from "@repo/ui/components/copy-to-clipboard/copy-to-clipboard-text";
import { useTranslations } from "next-intl";

export type TransfermovilProps = {
  data: CompletePaymentMethod;
};

export default function TransfermovilDetail({ data }: TransfermovilProps) {
  const t = useTranslations("PaymentMethod");
  const text = `TRANSFERMOVIL_ETECSA,TRANSFERENCIA,${(data.data as any)?.cardNumber},${(data.data as any)?.phone},`;
  return (
    <Card className="w-full max-w-sm mx-auto">
      <CardContent className="flex flex-col items-center p-6 space-y-4">
        <h3 className="font-bold">{t(`titles.${data.type}`)}</h3>
        <div className="w-full max-w-[200px] aspect-square">
          <Qr value={text} addCopy={true} image="/transfermovilIcon.jpg" />
        </div>
        <div className="w-full space-y-2">
          <div className="flex items-center space-x-2">
            <CreditCard className="w-5 h-5 text-muted-foreground" />
            <CopyToClipboard text={(data.data as any)?.cardNumber} />
          </div>
          <div className="flex items-center space-x-2">
            <Phone className="w-5 h-5 text-muted-foreground" />
            <CopyToClipboard text={(data.data as any)?.phone} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
