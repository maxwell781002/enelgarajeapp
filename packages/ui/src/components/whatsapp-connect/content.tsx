"use client";

import { CompleteBusiness } from "@repo/model/zod/business";
import { useTranslations } from "next-intl";
import AlertMessage from "@repo/ui/components/alert-message";
import { AlertCircle } from "lucide-react";
import ShowData from "@repo/ui/components/show-data";
import NoConnected, {
  NoConnectedProps,
} from "@repo/ui/components/whatsapp-connect/no-connected";
import { CompleteWhatsappConnect } from "@repo/model/zod/whatsappconnect";

export type ContentProps = {
  business: CompleteBusiness | null;
  whatsappConnect: CompleteWhatsappConnect | null;
  loading: boolean;
  setWhatsappConnect: (whatsappConnect: CompleteWhatsappConnect | null) => void;
} & NoConnectedProps;

export default function Content({
  business,
  create,
  whatsappConnect,
  loading,
  ...props
}: ContentProps) {
  const t = useTranslations("Business");
  if (!whatsappConnect) {
    return <NoConnected create={create} {...props} />;
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
}
