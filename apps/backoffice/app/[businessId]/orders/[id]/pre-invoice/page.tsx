import BackPage from "@repo/ui/components/back-page";
import { getTranslations } from "next-intl/server";
import { CompleteOrder } from "@repo/model/zod/order";
import { getOrderById } from "@repo/model/repository/order";
import OrderEditForm from "../../form";
import { CompleteOrderProduct } from "@repo/model/zod/orderproduct";

type PreInvoicePageProps = {
  params: Promise<{ businessId: string; id: string }>;
};

export default async function PreInvoicePage({ params }: PreInvoicePageProps) {
  const { businessId, id } = await params;
  const order = (await getOrderById(id)) as CompleteOrder;
  const t = await getTranslations("OrderDetailBack");
  const createPreInvoiceAction = async (
    items: CompleteOrderProduct[],
    changedOrderNote: string,
  ) => {
    "use server";
    console.log(items, changedOrderNote);
  };
  return (
    <BackPage
      href={`/${businessId}/orders/${id}`}
      urlTitle={t("backOrder")}
      className="flex flex-col"
    >
      <OrderEditForm
        order={order as CompleteOrder}
        action={createPreInvoiceAction}
        title={t("preInvoiceTitle")}
        notePlaceholder={t("preInvoiceNotePlaceholder")}
        canEditPrice
        btnActionTitle={t("preInvoiceBtnUpdate")}
      />
    </BackPage>
  );
}
