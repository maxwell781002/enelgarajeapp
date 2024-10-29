import { Store } from "lucide-react";
import { getTranslations } from "next-intl/server";
import WhatsappButton from "@repo/ui/components/whatsapp-button";

export default async function Page() {
  const whatsappNumber = process.env.PHONE_ADMIN_CONTACT as string;
  const t = await getTranslations("NoHaveShop");
  const whatsappMessage = encodeURIComponent(t("textChat"));

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background p-4">
      <Store className="w-16 h-16 mb-6 text-primary" />
      <h1 className="text-2xl font-bold mb-2 text-center">{t("title")}</h1>
      <p className="text-muted-foreground mb-6 text-center max-w-md">
        {t("message")}
      </p>
      <WhatsappButton
        whatsappNumber={whatsappNumber}
        whatsappMessage={whatsappMessage}
        text={t("btnSubmit")}
      />
    </div>
  );
}
