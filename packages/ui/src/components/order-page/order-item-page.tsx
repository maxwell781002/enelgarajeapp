import { getOrderById } from "@repo/model/repository/order";
import { CompleteOrder } from "@repo/model/zod/order";
import { ArrowLeftIcon } from "@repo/ui/components/icons";
import OrderDetail from "@repo/ui/components/order-page/order-detail";
import { getTranslations } from "next-intl/server";
import Link from "next/link";

export type OrderItemPageProps = {
  baseUrl?: string;
  id: string;
};

export default async function OrderItemPage({
  id,
  baseUrl = "",
}: OrderItemPageProps) {
  const order = await getOrderById(id);
  const t = await getTranslations("OrderDetail");

  return (
    <>
      <Link
        href={`${baseUrl}/order`}
        className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground pb-4"
        prefetch={false}
      >
        <ArrowLeftIcon className="h-4 w-4" />
        {t("back")}
      </Link>
      <OrderDetail
        order={order as CompleteOrder}
        titleLb={t("title")}
        orderLb={t("order")}
      />
    </>
  );
}
