import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@repo/ui/components/ui/card";
import {
  Edit,
  Globe,
  Phone,
  Send,
  DoorOpen,
  DollarSignIcon,
} from "lucide-react";
import { businessRepository } from "@repo/model/repositories/business";
import Link from "next/link";
import { Button } from "@repo/ui/components/ui/button";
import { getTranslations } from "next-intl/server";
import Totals from "../../components/totals";
import { productRepository } from "@repo/model/repositories/product";
import { orderRepository } from "@repo/model/repositories/order";
import BooleanValue from "@repo/ui/components/boolean-value";

export default async function BusinessPage({
  params: { businessId },
}: {
  params: { businessId: string };
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
      <Card className="overflow-hidden">
        <CardHeader>
          <div className="flex flex-1">
            <div>
              <CardTitle>{t("General")}</CardTitle>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center space-x-2">
            <BooleanValue value={business.active} />
            <span>{t("lbActive")}</span>
          </div>
          <div className="flex items-center space-x-2">
            <BooleanValue value={business.requestAddress} />
            <span>{t("lbRequestAddress")}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Phone className="h-5 w-5 text-muted-foreground" />
            <span>{business.phone || t("noPhone")}</span>
          </div>
          <div className="flex items-center space-x-2">
            <DollarSignIcon className="h-5 w-5 text-muted-foreground" />
            <span>
              {business.defaultPaymentMethod?.name || t("noPaymentMethod")}
            </span>
          </div>
          {business.telegram && (
            <div className="flex items-center space-x-2">
              <Send className="h-5 w-5 text-muted-foreground" />
              <a
                href={business.telegram.invitationLink}
                className="text-blue-600 hover:underline"
                target="_blank"
              >
                {business.telegram.invitationLink}
              </a>
            </div>
          )}
          <div className="flex items-center space-x-2">
            <Globe className="h-5 w-5 text-muted-foreground" />
            <a
              href={`https://${business.slug}`}
              className="text-blue-600 hover:underline"
              target="_blank"
            >
              {business.slug}
            </a>
          </div>
          <div className="flex items-center space-x-2">
            <DoorOpen className="h-5 w-5 text-muted-foreground" />
            <span>
              {t("yourPlan")}: <strong>{t(business.plan)}</strong>
            </span>
          </div>
          <p className="text-muted-foreground">{business.description}</p>
        </CardContent>
      </Card>
    </div>
  );
}
