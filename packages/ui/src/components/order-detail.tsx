import { formatDate } from "../lib/date";
import AddressCard from "./address/card";
import PriceDisplay from "./price";
import { Separator } from "./ui/separator";
import { CompleteOrder } from "@repo/model/zod/order";
import { CompleteOrderProduct } from "@repo/model/zod/orderproduct";

type OrderProps = {
  order: CompleteOrder;
  titleLb: string;
  orderLb: string;
};

export default function OrderDetail({ order, titleLb, orderLb }: OrderProps) {
  return (
    <>
      <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
        <div className="container px-4 md:px-6">
          <div className="max-w-2xl mx-auto space-y-6">
            <div>
              <h2 className="text-2xl font-bold tracking-tighter">{titleLb}</h2>
              <div className="mt-4 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="font-medium">
                    {orderLb} #{order.identifier}
                  </div>
                  <div>{formatDate(order.sentAt as Date)}</div>
                </div>
                <Separator />
                <div className="grid gap-4">
                  {order.items.map((item: CompleteOrderProduct) => (
                    <>
                      <div className="flex items-start justify-between">
                        <div className="font-medium">{item.product.name}</div>
                        <div className="flex flex-col">
                          <div className="text-right">{item.quantity} x</div>
                          <PriceDisplay price={item.price} />
                        </div>
                      </div>
                      <Separator />
                    </>
                  ))}
                </div>
                {!!order.shipping && (
                  <div className="flex items-center justify-between font-medium">
                    <div>
                      <strong>Envio</strong>
                    </div>
                    <div>
                      <PriceDisplay price={order.shipping} />
                    </div>
                  </div>
                )}
                <div className="flex items-center justify-between font-medium">
                  <div>
                    <strong>Total</strong>
                  </div>
                  <div>
                    <PriceDisplay price={order.total} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {order?.orderAddress && (
        <div className="mt-5">
          <h3 className="text-1xl font-bold tracking-tighter">Dirección</h3>
          <AddressCard address={order.orderAddress.address} />
        </div>
      )}
    </>
  );
}
