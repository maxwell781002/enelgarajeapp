import Qr from "@repo/ui/components/qr";
import { Card, CardContent } from "@repo/ui/components/ui/card";
import { CompletePaymentMethod } from "@repo/model/zod/paymentmethod";
import { useTranslations } from "next-intl";

export type EnzonaProps = {
  data: CompletePaymentMethod;
};

export default function EnzonaDetail({ data }: EnzonaProps) {
  const t = useTranslations("PaymentMethod");
  return (
    <Card className="w-full max-w-sm mx-auto">
      <CardContent className="flex flex-col items-center p-6 space-y-4">
        <h3 className="font-bold">{t(`titles.${data.type}`)}</h3>
        <div className="w-full max-w-[200px] aspect-square">
          <Qr
            value={(data.data as any)?.accountId}
            addCopy={true}
            image="/enzonaIcon.jpg"
          />
        </div>
      </CardContent>
    </Card>
  );
}
