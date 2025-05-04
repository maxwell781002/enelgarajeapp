import { getOrderByIdAndBusinessId } from "@repo/model/repository/order";
import BackPage from "@repo/ui/components/back-page";
import OrderEditForm from "./form";
import { CompleteOrder } from "@repo/model/zod/order";
import { CompleteOrderProduct } from "@repo/model/zod/orderproduct";
import { updateOrderItems } from "@repo/model/repository/checkout";
import { revalidatePath } from "next/cache";
import { BadRequestError } from "@repo/model/errors/bad-request";

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
  const updateOrderItemsAction = async (items: CompleteOrderProduct[]) => {
    "use server";
    try {
      await updateOrderItems(id, items, businessId);
      revalidatePath(`/${businessId}/orders/${id}`);
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
