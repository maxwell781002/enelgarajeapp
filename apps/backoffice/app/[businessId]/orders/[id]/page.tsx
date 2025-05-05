import { orderRepository } from "@repo/model/repositories/order";
import BackPage from "@repo/ui/components/back-page";
import ChangeStatus from "./changeStatus";
import { revalidatePath } from "next/cache";
import { canBeUpdated, getOrderById } from "@repo/model/repository/order";
import { CompleteOrder } from "@repo/model/zod/order";
import BackOrder from "@repo/ui/components/order-page/back-order/index";
import ButtonDownloadFile from "@repo/ui/components/button-download-file";
import { getTranslations } from "next-intl/server";
import { Button } from "@repo/ui/components/button";
import { PencilIcon } from "lucide-react";
import Link from "next/link";

type OrderDetailProps = {
  params: Promise<{ businessId: string; id: string }>;
};

export default async function Page({ params }: OrderDetailProps) {
  const { businessId, id } = await params;
  const order = (await getOrderById(id)) as CompleteOrder;
  const t = await getTranslations("OrderDetailBack");
  const changeStatus = async (status: string) => {
    "use server";
    await orderRepository.changeStatus(id, status as any);
    revalidatePath(`/${businessId}/orders/${id}`);
  };
  const changeStatusComponent = (
    <div className="flex items-center gap-2 justify-end">
      <ChangeStatus
        status={order.status}
        onChange={changeStatus}
        options={orderRepository.orderToChange(order.status)}
      />
      <ButtonDownloadFile
        url={`/api/order-pdf/${id}`}
        label={t("btnDownloadInvoice")}
        fileName={order.identifier ?? ""}
      />
      {(await canBeUpdated(order)) && (
        <Link href={`/${businessId}/orders/${id}/edit`}>
          <Button variant="outline">
            <PencilIcon /> {t("btnEdit")}
          </Button>
        </Link>
      )}
    </div>
  );
  return (
    <BackPage
      href={`/${businessId}/orders`}
      urlTitle="Ir a órdenes"
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
