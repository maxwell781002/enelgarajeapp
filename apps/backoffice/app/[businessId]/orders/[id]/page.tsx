import { orderRepository } from "@repo/model/repositories/order";
import BackPage from "@repo/ui/components/back-page";
import OrderDetail from "@repo/ui/components/order-detail";
import { Card, CardContent } from "@repo/ui/components/ui/card";
import ChangeStatus from "./changeStatus";
import { revalidatePath } from "next/cache";
import { getOrderById } from "@repo/model/repository/order";
import { CompleteOrder } from "@repo/model/zod/order";

type OrderDetailProps = {
  params: { businessId: string; id: string };
};

export default async function Page({
  params: { businessId, id },
}: OrderDetailProps) {
  const order = (await getOrderById(id)) as CompleteOrder;
  const changeStatus = async (status: string) => {
    "use server";
    await orderRepository.changeStatus(id, status as any);
    revalidatePath(`/${businessId}/orders/${id}`);
  };
  const changeStatusComponent = (
    <ChangeStatus
      status={order.status}
      onChange={changeStatus}
      options={orderRepository.orderToChange()}
    />
  );
  return (
    <BackPage
      href={`/${businessId}/orders`}
      urlTitle="Ir a órdenes"
      headerChildren={changeStatusComponent}
    >
      <Card>
        <CardContent className="p-6">
          <h2 className="text-2xl font-semibold mb-4">Datos del cliente</h2>
          <dl className="grid gap-2">
            <div className="grid grid-cols-3 gap-1">
              <dt className="font-medium">Nombre:</dt>
              <dd className="col-span-2">{order?.user?.name}</dd>
            </div>
            <div className="grid grid-cols-3 gap-1">
              <dt className="font-medium">Teléfono:</dt>
              <dd className="col-span-2">{order?.user?.phone}</dd>
            </div>
          </dl>
        </CardContent>
      </Card>
      <OrderDetail order={order} titleLb="Resumen del pedido" orderLb="Orden" />
    </BackPage>
  );
}
