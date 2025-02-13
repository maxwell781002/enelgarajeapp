import { useTranslations } from "next-intl";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@repo/ui/components/ui/card";
import Content, {
  ContentProps,
} from "@repo/ui/components/whatsapp-connect/content";
import { connectWhatsapp } from "@repo/model/repository/whatsapp-connect";

export function WhatsappConnect(props: Omit<ContentProps, "action">) {
  const t = useTranslations("Business");
  const doConnect = async ({ businessId, phone }: any) => {
    "use server";
    return connectWhatsapp(businessId, phone);
  };
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
        <Content {...props} action={doConnect} />
      </CardContent>
    </Card>
  );
}
