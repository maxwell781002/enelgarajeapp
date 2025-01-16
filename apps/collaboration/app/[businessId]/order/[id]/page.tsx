import BackPage from "@repo/ui/components/back-page";
import { getOrderById } from "@repo/model/repository/order";
import { CompleteOrder } from "@repo/model/zod/order";
import CollaboratorOrder from "@repo/ui/components/order-page/collaborator-order";

type OrderDetailProps = {
  params: { businessId: string; id: string };
};

export default async function Page({
  params: { businessId, id },
}: OrderDetailProps) {
  const order = (await getOrderById(id)) as CompleteOrder;
  return (
    <BackPage href={`/${businessId}/order`} urlTitle="Ir a órdenes">
      <CollaboratorOrder
        order={order as CompleteOrder}
        baseUrl={(item) => `/${businessId}/products/${item.product.slug}`}
      />
    </BackPage>
  );
}
