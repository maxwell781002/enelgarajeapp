import BackPage from "@repo/ui/components/back-page";
import { getTranslations } from "next-intl/server";

export default async function Page({
  params: { businessId },
}: {
  params: { businessId: string };
}) {
  const t = await getTranslations("Business");
  return (
    <BackPage href={`/${businessId}`} urlTitle={t('backBusiness')}>
      <h1>Business ffff</h1>
    </BackPage>
  );
}
