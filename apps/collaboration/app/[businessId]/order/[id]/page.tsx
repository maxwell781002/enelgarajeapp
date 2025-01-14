import BackPage from "@repo/ui/components/back-page";
import { getOrderById } from "@repo/model/repository/order";
import { CompleteOrder } from "@repo/model/zod/order";
import { getTranslations } from "next-intl/server";
import CollaboratorOrder from "@repo/ui/components/order-page/collaborator-order";

type OrderDetailProps = {
  params: { businessId: string; id: string };
};

export default async function Page({
  params: { businessId, id },
}: OrderDetailProps) {
  const order = (await getOrderById(id)) as CompleteOrder;
  const t = await getTranslations("OrderDetail");
  return (
    <BackPage href={`/${businessId}/order`} urlTitle="Ir a órdenes">
      <CollaboratorOrder order={order as CompleteOrder} />
    </BackPage>
  );
}
