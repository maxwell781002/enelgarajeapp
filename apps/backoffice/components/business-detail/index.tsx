import { Edit } from "lucide-react";
import { businessRepository } from "@repo/model/repositories/business";
import Link from "next/link";
import { Button } from "@repo/ui/components/ui/button";
import { getTranslations } from "next-intl/server";
import Totals from "../../components/totals";
import { productRepository } from "@repo/model/repositories/product";
import { orderRepository } from "@repo/model/repositories/order";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@repo/ui/components/ui/tabs";
import BusinessDetailGeneral from "./general";
import { WhatsappConnect } from "@repo/ui/components/whatsapp-connect/index";

export default async function BusinessDetail({
  businessId,
}: {
  businessId: string;
}) {
  const business = await businessRepository.getAllBusinessData(businessId);
  const t = await getTranslations("Business");
  const { totalActive, totalInactive } =
    await productRepository.getTotals(businessId);
  const { totalSend, totalPayed, totalReject } =
    await orderRepository.getTotals(businessId);

  return (
    <div className="container mx-auto p-4 space-y-6">
      <div className="flex flex-1 justify-between">
        <h1 className="text-2xl font-bold">{business.name}</h1>
        <Link href={`/${businessId}/business`}>
          <Button variant="outline" size="icon" className="w-10 h-10">
            <Edit className="h-4 w-4" />
          </Button>
        </Link>
      </div>
      <Totals
        productTotal={totalActive}
        productInactive={totalInactive}
        orderToProcess={totalSend}
        orderPayed={totalPayed}
        orderReject={totalReject}
      />
      <Tabs defaultValue="general">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="general">{t("tabGeneral")}</TabsTrigger>
          <TabsTrigger value="whatsapp">{t("tabWhatsapp")}</TabsTrigger>
        </TabsList>
        <TabsContent value="general">
          <BusinessDetailGeneral business={business} />
        </TabsContent>
        <TabsContent value="whatsapp">
          <WhatsappConnect business={business} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
