import FailedPayment from "@repo/ui/components/shop-cart/failed-payment";
import { getOrderById } from "@repo/model/repository/order";
import { CompleteOrder } from "@repo/model/prisma/zod/order";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const order = await getOrderById(id);
  return <FailedPayment order={order as CompleteOrder} />;
}
