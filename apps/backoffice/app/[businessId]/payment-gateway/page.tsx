import BackPage from "@repo/ui/components/back-page";
import { getTranslations } from "next-intl/server";

export default async function PaymentGateway({
  params,
}: {
  params: Promise<{ businessId: string }>;
}) {
  const { businessId } = await params;
  const t = await getTranslations("PaymentGateway");
  return (
    <BackPage href={`/${businessId}`} urlTitle={t("backTitle")}>
      <h1>PaymentGateway</h1>
    </BackPage>
  );
}
