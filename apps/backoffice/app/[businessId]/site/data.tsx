import { CompleteBusinessSite } from "@repo/model/zod/businesssite";
import Image from "@repo/ui/components/image";
import { getTranslations } from "next-intl/server";

export default async function SiteData({
  site,
}: {
  site: CompleteBusinessSite;
}) {
  const logo = site.logo as any;
  const t = await getTranslations("BusinessSite");
  return (
    <div className="flex w-full">
      <Image src={logo} alt="Logo" width={100} height={100} />
      <div className="flex flex-col ml-4">
        <p className="font-bold">{t("email")}</p>
        <p>{site.email}</p>
      </div>
    </div>
  );
}
