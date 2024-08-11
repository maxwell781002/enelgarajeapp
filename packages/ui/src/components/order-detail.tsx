import { formatDate } from "../lib/date";
import { Separator } from "./ui/separator";
import { CompleteOrder, CompleteOrderProduct } from "@repo/model";

type OrderProps = {
  order: CompleteOrder;
  t: any;
};

export default function OrderDetail({ order, t }: OrderProps) {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
      <div className="container px-4 md:px-6">
        <div className="max-w-2xl mx-auto space-y-6">
          <div>
            <h2 className="text-2xl font-bold tracking-tighter">
              {t("title")}
            </h2>
            <div className="mt-4 space-y-4">
              <div className="flex items-center justify-between">
                <div className="font-medium">
                  {t("order")} #{order.identifier}
                </div>
                <div>{formatDate(order.sentAt as Date)}</div>
              </div>
              <Separator />
              <div className="grid gap-4">
                {order.items.map((item: CompleteOrderProduct) => (
                  <div className="flex items-center justify-between">
                    <div className="font-medium">{item.product.name}</div>
                    <div>
                      {item.quantity} x ${item.price}
                    </div>
                  </div>
                ))}
              </div>
              <Separator />
              <div className="flex items-center justify-between font-medium">
                <div>Total</div>
                <div>${order.total}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
