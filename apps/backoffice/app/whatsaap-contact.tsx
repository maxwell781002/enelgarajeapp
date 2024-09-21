import { Store } from "lucide-react";
import { Button } from "@repo/ui/components/ui/button";
import { WhatsappIcon } from "@repo/ui/components/icons";
import { getTranslations } from "next-intl/server";

export default async function ShopNotHave() {
  const whatsappNumber = "+5353024637"; // Replace with your actual WhatsApp number
  const t = await getTranslations("NoHaveShop");
  const whatsappMessage = encodeURIComponent(t("textChat"));

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background p-4">
      <Store className="w-16 h-16 mb-6 text-primary" />
      <h1 className="text-2xl font-bold mb-2 text-center">{t("title")}</h1>
      <p className="text-muted-foreground mb-6 text-center max-w-md">
        {t("message")}
      </p>
      <Button asChild className="flex items-center space-x-2">
        <a
          href={`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <WhatsappIcon className="w-5 h-5" />
          <span>{t("btnSubmit")}</span>
        </a>
      </Button>
    </div>
  );
}
