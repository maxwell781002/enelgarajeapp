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
import { getTranslations } from "next-intl/server";
import BooleanValue from "@repo/ui/components/boolean-value";
import { CompleteBusiness } from "@repo/model/zod/index";

export type BusinessDetailGeneralProps = {
  business: CompleteBusiness;
};

export default async function BusinessDetailGeneral({
  business,
}: BusinessDetailGeneralProps) {
  const t = await getTranslations("Business");
  return (
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
          <BooleanValue value={business.active as boolean} />
          <span>{t("lbActive")}</span>
        </div>
        <div className="flex items-center space-x-2">
          <BooleanValue value={business.requestAddress as boolean} />
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
        <div className="flex items-center space-x-2">
          <DollarSignIcon className="h-5 w-5 text-muted-foreground" />
          <span>{t("lbCurrency")}</span>
          <strong>{business.currency}</strong>
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
        <strong className="block">{t("lbDescription")}</strong>
        <p className="text-muted-foreground">{business.description}</p>
        <strong className="block">{t("lbTicketTermsConditions")}</strong>
        <p className="text-muted-foreground">
          {business.ticketTermsConditions}
        </p>
      </CardContent>
    </Card>
  );
}
