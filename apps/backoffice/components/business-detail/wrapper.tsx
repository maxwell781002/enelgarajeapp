import { CompleteBusiness } from "@repo/model/zod/index";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@repo/ui/components/ui/tabs";
import { WhatsappConnect } from "@repo/ui/components/whatsapp-connect/index";
import BusinessDetailGeneral from "./general";
import { getTranslations } from "next-intl/server";

export type BusinessDetailWrapperProps = {
  business: CompleteBusiness;
};

export default async function BusinessDetailWrapper({
  business,
}: BusinessDetailWrapperProps) {
  const t = await getTranslations("Business");
  const businessDetail = <BusinessDetailGeneral business={business} />;
  if (!business.canConnectWhatsapp) {
    return businessDetail;
  }
  return (
    <Tabs defaultValue="general">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="general">{t("tabGeneral")}</TabsTrigger>
        <TabsTrigger value="whatsapp">{t("tabWhatsapp")}</TabsTrigger>
      </TabsList>
      <TabsContent value="general">{businessDetail}</TabsContent>
      <TabsContent value="whatsapp">
        <WhatsappConnect business={business} />
      </TabsContent>
    </Tabs>
  );
}
