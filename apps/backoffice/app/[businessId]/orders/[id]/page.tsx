import { orderRepository } from "@repo/model/repositories/order";
import BackPage from "@repo/ui/components/back-page";
import ChangeStatus from "./changeStatus";
import { revalidatePath } from "next/cache";
import { getOrderById } from "@repo/model/repository/order";
import { CompleteOrder } from "@repo/model/zod/order";
import BackOrder from "@repo/ui/components/order-page/back-order/index";
import ButtonDownloadFile from "@repo/ui/components/button-download-file";
import { getTranslations } from "next-intl/server";

type OrderDetailProps = {
  params: { businessId: string; id: string };
};

export default async function Page({
  params: { businessId, id },
}: OrderDetailProps) {
  const order = (await getOrderById(id)) as CompleteOrder;
  const t = await getTranslations("OrderDetailBack");
  const changeStatus = async (status: string) => {
    "use server";
    await orderRepository.changeStatus(id, status as any);
    revalidatePath(`/${businessId}/orders/${id}`);
  };
  const changeStatusComponent = (
    <div className="flex items-center gap-2">
      <ChangeStatus
        status={order.status}
        onChange={changeStatus}
        options={orderRepository.orderToChange(order.status)}
      />
      <ButtonDownloadFile
        url={"/api/order-pdf"}
        label={t("btnDownloadInvoice")}
        fileName={order.identifier ?? ""}
      />
    </div>
  );
  return (
    <BackPage
      href={`/${businessId}/orders`}
      urlTitle="Ir a órdenes"
      headerChildren={changeStatusComponent}
    >
      <BackOrder
        order={order}
        baseUrl={(item) => `/${businessId}/products/${item.product.id}`}
      />
    </BackPage>
  );
}
