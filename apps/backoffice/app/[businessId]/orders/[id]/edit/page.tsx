import { getOrderByIdAndBusinessId } from "@repo/model/repository/order";
import BackPage from "@repo/ui/components/back-page";
import OrderEditForm from "./form";
import { CompleteOrder } from "@repo/model/zod/order";

type OrderEditPageProps = {
  params: {
    businessId: string;
    id: string;
  };
};

export default async function OrderEditPage({
  params: { id, businessId },
}: OrderEditPageProps) {
  const order = await getOrderByIdAndBusinessId(id, businessId);
  return (
    <BackPage href={`/${businessId}/orders/${id}`} urlTitle="Ir a la orden">
      <OrderEditForm order={order as CompleteOrder} />
    </BackPage>
  );
}
