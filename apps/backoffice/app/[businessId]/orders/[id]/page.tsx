import BackPage from "@repo/ui/components/back-page";
import { getOrderById } from "@repo/model/repository/order";
import { CompleteOrder } from "@repo/model/zod/order";
import BackOrder from "@repo/ui/components/order-page/back-order/index";
import { getTranslations } from "next-intl/server";
import OrderButtons from "./buttons";

type OrderDetailProps = {
  params: Promise<{ businessId: string; id: string }>;
};

export default async function Page({ params }: OrderDetailProps) {
  const { businessId, id } = await params;
  const order = (await getOrderById(id)) as CompleteOrder;
  const t = await getTranslations("OrderDetailBack");
  const changeStatusComponent = (
    <div className="flex items-center gap-2 justify-end">
      <OrderButtons order={order} businessId={businessId} />
    </div>
  );
  return (
    <BackPage
      href={`/${businessId}/orders`}
      urlTitle={t("backOrders")}
      headerChildren={changeStatusComponent}
      className="flex flex-col"
    >
      <BackOrder
        order={order}
        baseUrl={(item) => `/${businessId}/products/${item.product.id}`}
      />
    </BackPage>
  );
}
