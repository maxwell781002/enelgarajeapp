import { getOrderByIdAndBusinessId } from "@repo/model/repository/order";
import BackPage from "@repo/ui/components/back-page";
import OrderEditForm from "./form";
import { CompleteOrder } from "@repo/model/zod/order";
import { CompleteOrderProduct } from "@repo/model/zod/orderproduct";
import { updateOrderItems } from "@repo/model/repository/checkout";
import { BadRequestError } from "@repo/model/errors/bad-request";

type OrderEditPageProps = {
  params: Promise<{
    businessId: string;
    id: string;
  }>;
};

export default async function OrderEditPage({ params }: OrderEditPageProps) {
  const { id, businessId } = await params;
  const order = await getOrderByIdAndBusinessId(id, businessId);
  const updateOrderItemsAction = async (
    items: CompleteOrderProduct[],
    changedOrderNote: string,
  ) => {
    "use server";
    try {
      return await updateOrderItems(id, items, businessId, changedOrderNote);
    } catch (e) {
      if (e instanceof BadRequestError) {
        return { error: e.message };
      }
      throw e;
    }
  };
  return (
    <BackPage href={`/${businessId}/orders/${id}`} urlTitle="Ir a la orden">
      <OrderEditForm
        order={order as CompleteOrder}
        action={updateOrderItemsAction}
      />
    </BackPage>
  );
}
