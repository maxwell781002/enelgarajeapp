import { ApplicationsNames } from "@repo/model/lib/applications-names";
import { isCurrentUserCollaborator } from "@repo/model/repository/user";
import { getTranslations } from "next-intl/server";
import Link from "next/link";
import { Button } from "./ui/button";
import { ArrowLeftRight } from "lucide-react";
import { get } from "http";
import { getBusinessById } from "@repo/model/repository/business";
import { CompleteBusiness } from "@repo/model/zod/business";

export type AvailableApps =
  | ApplicationsNames.WEB
  | ApplicationsNames.COLLABORATOR;

export type SwitchAppProps = {
  application: AvailableApps;
  className?: string;
  businessId: string;
};

export default async function SwitchApp({
  application,
  className,
  businessId,
}: SwitchAppProps) {
  const t = await getTranslations("Header");
  if (!(await isCurrentUserCollaborator(businessId))) {
    return;
  }
  const business = (await getBusinessById(businessId)) as CompleteBusiness;
  const url =
    ApplicationsNames.WEB === application
      ? process.env.COLLABORATOR_HOST
      : `https://${business.slug}`;
  return (
    <Button asChild className={className}>
      <Link href={url}>
        <ArrowLeftRight className="w-4 h-4 mr-2" />
        {t(`switch-app.${application}`)}
      </Link>
    </Button>
  );
}
