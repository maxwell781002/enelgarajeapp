import { Button } from "@repo/ui/components/button";
import { Edit } from "lucide-react";
import { getTranslations } from "next-intl/server";
import Link from "next/link";

export default async function Page({
  params: { businessId },
}: {
  params: { businessId: string };
}) {
  const t = await getTranslations("BusinessSite");
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
      <h1>Business Site</h1>
    </div>
  );
}
