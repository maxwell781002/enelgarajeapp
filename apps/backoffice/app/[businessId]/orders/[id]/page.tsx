import { orderRepository } from "@repo/model/repositories/order";
import BackPage from "@repo/ui/components/back-page";
import OrderDetail from "@repo/ui/components/order-detail";
import { Card, CardContent } from "@repo/ui/components/ui/card";

type OrderDetailProps = {
  params: { businessId: string; id: string };
};

export default async function Page({
  params: { businessId, id },
}: OrderDetailProps) {
  const order = await orderRepository.get(id);
  return (
    <BackPage
      href={`/${businessId}/orders`}
      urlTitle="Ir al listado de órdenes"
    >
      <Card>
        <CardContent className="p-6">
          <h2 className="text-2xl font-semibold mb-4">Datos del cliente</h2>
          <dl className="grid gap-2">
            <div className="grid grid-cols-3 gap-1">
              <dt className="font-medium">Nombre:</dt>
              <dd className="col-span-2">{order.user.name}</dd>
            </div>
            <div className="grid grid-cols-3 gap-1">
              <dt className="font-medium">Teléfono:</dt>
              <dd className="col-span-2">{order.user.phone}</dd>
            </div>
          </dl>
        </CardContent>
      </Card>
      <OrderDetail order={order} titleLb="Resumen del pedido" orderLb="Orden" />
    </BackPage>
  );
}
