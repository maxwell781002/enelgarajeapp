import BackPage from "@repo/ui/components/back-page";
import { getTranslations } from "next-intl/server";
import { CompleteOrder } from "@repo/model/zod/order";
import { getOrderById } from "@repo/model/repository/order";

type PreInvoicePageProps = {
  params: Promise<{ businessId: string; id: string }>;
};

export default async function PreInvoicePage({ params }: PreInvoicePageProps) {
  const { businessId, id } = await params;
  const order = (await getOrderById(id)) as CompleteOrder;
  const t = await getTranslations("OrderDetailBack");
  return (
    <BackPage
      href={`/${businessId}/orders`}
      urlTitle={t("backOrder")}
      className="flex flex-col"
    >
      Pre invoice
    </BackPage>
  );
}
