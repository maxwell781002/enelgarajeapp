import Link from "next/link";
import { AlertCircle } from "lucide-react";
import { Button } from "@repo/ui/components/ui/button";
import { getTranslations } from "next-intl/server";

export default async function NotConfigured({
  businessId,
}: {
  businessId: string;
}) {
  const t = await getTranslations("BusinessSite");
  return (
    <div className="flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <div className="flex justify-center mb-4">
          <AlertCircle className="h-12 w-12 text-yellow-500" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          {t("siteNotConfigured")}
        </h1>
        <p className="py-4 block text-muted-foreground">
          {t("siteNotConfiguredDescription")}
        </p>
        <Link href={`/${businessId}/site/form`} passHref>
          <Button variant="default">{t("configureSite")}</Button>
        </Link>
      </div>
    </div>
  );
}
