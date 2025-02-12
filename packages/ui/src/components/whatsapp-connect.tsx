"use client";

import { useWhatsAppConnect } from "@repo/ui/hooks/whatsapp-connect";
import { CompleteBusiness } from "@repo/model/zod/business";
import { AlertCircle } from "lucide-react";
import { useTranslations } from "next-intl";
import AlertMessage from "@repo/ui/components/alert-message";
import ShowData from "@repo/ui/components/show-data";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@repo/ui/components/ui/card";

export type WhatsappConnectProps = {
  business: CompleteBusiness;
};

const Content = ({ business }: WhatsappConnectProps) => {
  const { whatsappConnect, loading } = useWhatsAppConnect(
    business.id as string,
    business.whatsappConnect,
  );
  const t = useTranslations("Business");
  if (!whatsappConnect) {
    return (
      <AlertMessage
        Icon={AlertCircle}
        text={t("whatsappNotConnect")}
        className="flex items-center p-4 text-yellow-800 bg-yellow-100 rounded-lg"
      />
    );
  }
  if (loading) {
    return (
      <AlertMessage
        Icon={AlertCircle}
        text={t("whatsappIsConnecting")}
        flashing
        className="flex items-center p-4 text-yellow-800 bg-green-100 rounded-lg"
      />
    );
  }
  return (
    <>
      <ShowData
        object={{
          code: whatsappConnect?.paringCode,
          phone: whatsappConnect?.phone,
        }}
        t={(key) => t(`whatsappConnect.${key}`)}
        className="grid md:grid-cols-2 gap-4"
      />
      <p className="text-sm text-muted-foreground">
        {t("whatsappConnectCodeExplain")}
      </p>
    </>
  );
};

export function WhatsappConnect({ business }: WhatsappConnectProps) {
  const t = useTranslations("Business");
  return (
    <Card className="overflow-hidden">
      <CardHeader>
        <div className="flex flex-1">
          <div>
            <CardTitle>{t("tabWhatsapp")}</CardTitle>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <Content business={business} />
      </CardContent>
    </Card>
  );
}
