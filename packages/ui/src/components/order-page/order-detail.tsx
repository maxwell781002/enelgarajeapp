import { formatDate } from "@repo/model/lib/date";
import AddressCard from "@repo/ui/components/address/card";
import PriceDisplay from "@repo/ui/components/prices/price";
import { Separator } from "@repo/ui/components/ui/separator";
import { CompleteOrder } from "@repo/model/zod/order";
import { CompleteOrderProduct } from "@repo/model/zod/orderproduct";
import { TCurrency } from "@repo/model/types/enums";

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
                    {orderLb} #{order.identifier as string}
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
                          <PriceDisplay
                            price={item.price}
                            currency={order.currency as TCurrency}
                          />
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
                      <PriceDisplay
                        price={order.shipping as number}
                        currency={order.currency as TCurrency}
                      />
                    </div>
                  </div>
                )}
                {!!order.commission && (
                  <div className=" flex items-center justify-between font-medium bg-white rounded-lg p-4">
                    <div>
                      <strong>Comisión</strong>
                    </div>
                    <div>
                      <PriceDisplay
                        price={order.commission as number}
                        currency={order.currency as TCurrency}
                      />
                    </div>
                  </div>
                )}
                <div className="flex items-center justify-between font-medium">
                  <div>
                    <strong>Total</strong>
                  </div>
                  <div>
                    <PriceDisplay
                      price={order.total as number}
                      currency={order.currency as TCurrency}
                    />
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
