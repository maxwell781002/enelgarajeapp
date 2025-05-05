import { businessSiteRepository } from "@repo/model/repositories/business-site";
import { Button } from "@repo/ui/components/button";
import { Edit } from "lucide-react";
import { getTranslations } from "next-intl/server";
import Link from "next/link";
import SiteData from "./data";
import NotConfigured from "./no-configured";
import { getPlanFeature } from "@repo/model/lib/plans-feature";
import { getBusinessById } from "@repo/model/repository/business";
import UpgradePlan from "@repo/ui/components/upgrade-plan/index";

export default async function Page({
  params,
}: {
  params: Promise<{ businessId: string }>;
}) {
  const { businessId } = await params;
  const t = await getTranslations("BusinessSite");
  const business = await getBusinessById(businessId);
  if (!getPlanFeature("CAN_CONFIGURE_SITE", business)) {
    return <UpgradePlan business={business} title={t("upgrade_plan_title")} />;
  }
  const site = await businessSiteRepository.getByBusinessId(businessId);
  const content = site ? (
    <SiteData site={site} />
  ) : (
    <NotConfigured businessId={businessId} />
  );
  return (
    <div className="container mx-auto p-4 space-y-6">
      <div className="flex flex-1 justify-between">
        <h1 className="text-2xl font-bold">{t("pageTitle")}</h1>
        <Link href={`/${businessId}/site/form`}>
          <Button variant="outline" size="icon" className="w-10 h-10">
            <Edit className="h-4 w-4" />
          </Button>
        </Link>
      </div>
      {content}
    </div>
  );
}
