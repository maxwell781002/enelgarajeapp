import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@repo/ui/components/ui/card";
import { Check, X } from "lucide-react";
import { cn } from "@repo/ui/lib/utils";
import { getTranslations } from "next-intl/server";
import { CompleteBusiness } from "@repo/model/prisma/zod/business";
import { PLANS, INFINITE_NUMBER } from "@repo/model/lib/plans-feature";
import WhatsappButton from "./whatsapp-button";

export type UpgradePlanProps = {
  className?: string;
  business: CompleteBusiness;
};

const Item = ({
  name,
  value,
  t,
}: {
  name: string;
  value: any;
  t: (key: string) => string;
}) => {
  let check = <Check className="mr-2 h-4 w-4 text-green-500" />;
  if (typeof value === "boolean" && !value) {
    check = <X className="mr-2 h-4 w-4 text-red-500" />;
  }
  if (typeof value === "number") {
    value = value === INFINITE_NUMBER ? t("unlimited") : value;
  }
  if (typeof value === "boolean") {
    value = null;
  }
  return (
    <div className="flex items-center">
      {check}
      <span>
        {t(`feature.${name}`)}
        {!!value && `: ${value}`}
      </span>
    </div>
  );
};

export default async function UpgradePlan({
  className,
  business,
}: UpgradePlanProps) {
  const t = await getTranslations("UpgradePlan");
  const features = PLANS[business.plan];
  const whatsappNumber = process.env.PHONE_ADMIN_CONTACT as string;
  const whatsappMessage = encodeURIComponent(t("textChat"));
  return (
    <div className={cn("flex justify-center items-center md:pt-10", className)}>
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">
            {t("your_plan")}: {t(business.plan)}
          </CardTitle>
          <CardDescription>{t("description")}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            {Object.entries(features).map(([name, value]) => (
              <Item key={name} name={name} value={value} t={t} />
            ))}
          </div>
          <div
            className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4"
            role="alert"
          >
            <p className="font-bold">{t("upgrade_required")}</p>
            <p>{t("upgrade_description")}</p>
          </div>
        </CardContent>
        <CardFooter>
          <WhatsappButton
            whatsappNumber={whatsappNumber}
            whatsappMessage={whatsappMessage}
            text={t("btnSubmit")}
            className="w-full"
          />
        </CardFooter>
      </Card>
    </div>
  );
}
