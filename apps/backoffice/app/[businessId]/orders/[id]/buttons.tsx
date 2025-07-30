import { CompleteOrder } from "@repo/model/zod/order";
import ChangeStatus from "./changeStatus";
import ButtonDownloadFile from "@repo/ui/components/button-download-file";
import { canBeUpdated } from "@repo/model/repository/order";
import { revalidatePath } from "next/cache";
import { orderRepository } from "@repo/model/repositories/order";
import Link from "next/link";
import { Button } from "@repo/ui/components/ui/button";
import { PencilIcon } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { OrderStatus } from "@repo/model/types/enums";

type OrderButtonsProps = {
  order: CompleteOrder;
  businessId: string;
  changeStatus: (status: string) => Promise<void>;
  options: [string, string][];
};

async function NormalOrders({
  order,
  businessId,
  changeStatus,
  options,
}: OrderButtonsProps) {
  const t = await getTranslations("OrderDetailBack");
  return (
    <>
      <ChangeStatus
        status={order.status}
        onChange={changeStatus}
        options={options}
        order={order}
      />
      <ButtonDownloadFile
        url={`/api/order-pdf/${order.id}`}
        label={t("btnDownloadInvoice")}
        fileName={order.identifier ?? ""}
      />
      {(await canBeUpdated(order)) && (
        <Link href={`/${businessId}/orders/${order.id}/edit`}>
          <Button variant="outline">
            <PencilIcon /> {t("btnEdit")}
          </Button>
        </Link>
      )}
    </>
  );
}

async function WholesaleOrders({
  order,
  businessId,
  changeStatus,
  options,
}: OrderButtonsProps) {
  const t = await getTranslations("OrderDetailBack");
  if (order.status === OrderStatus.SEND) {
    return (
      <Link href={`/${businessId}/orders/${order.id}/pre-invoice`}>
        <Button variant="outline">
          <PencilIcon /> {t("btnCreatePreInvoice")}
        </Button>
      </Link>
    );
  }
  return (
    <>
      <ChangeStatus
        status={order.status}
        onChange={changeStatus}
        options={options}
        order={order}
      />
      <ButtonDownloadFile
        url={`/api/order-pdf/${order.id}`}
        label={t("btnDownloadInvoice")}
        fileName={order.identifier ?? ""}
      />
    </>
  );
}

export default function OrderButtons({
  order,
  businessId,
}: Omit<OrderButtonsProps, "changeStatus" | "options">) {
  const changeStatus = async (status: string) => {
    "use server";
    await orderRepository.changeStatus(order.id, status as any);
    revalidatePath(`/${businessId}/orders/${order.id}`);
  };
  const options = orderRepository.orderToChange(order.status);
  if (order.isWholesale) {
    return (
      <WholesaleOrders
        order={order}
        businessId={businessId}
        changeStatus={changeStatus}
        options={options}
      />
    );
  }
  return (
    <NormalOrders
      order={order}
      businessId={businessId}
      changeStatus={changeStatus}
      options={options}
    />
  );
}
