import {
  decrementItem,
  getCurrentOrder,
  incrementItem,
  removeFromOrder,
} from "@repo/model/repository/order";
import EmptyCart from "./empty";
import { Button } from "@repo/ui/components/ui/button";
import Link from "next/link";
import CardItem from "./card";

type PageProps = {
  params: {
    slug: string;
  };
};

export default async function Page({ params: { slug } }: PageProps) {
  const order = await getCurrentOrder();
  if (!order || !order.items) {
    return <EmptyCart slug={slug} />;
  }
  return (
    <div className="flex flex-col gap-6">
      <div className="overflow-auto">
        {order.items.map((item) => (
          <div key={item.productId} className="mb-2">
            <CardItem
              item={item as any}
              onRemove={removeFromOrder.bind(null, item.productId)}
              add={incrementItem.bind(null, item.productId)}
              sub={decrementItem.bind(null, item.productId)}
            />
          </div>
        ))}
      </div>
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <span className="text-lg font-semibold">Cart Total:</span>
          <span className="text-2xl font-bold">${order.total}</span>
        </div>
        <div className="flex flex-col gap-2">
          <Link href="#" className="w-full" prefetch={false}>
            <Button variant="outline">Continue Shopping</Button>
          </Link>
          <Button className="w-full">Proceed to Checkout</Button>
        </div>
      </div>
    </div>
  );
}
