import { getBusinessById } from "@repo/model/repository/business";
import { getOrderById } from "@repo/model/repository/order";
import { CompleteOrder } from "@repo/model/zod/order";
import CollaboratorOrder from "@repo/ui/components/order-page/collaborator-order";
import CheckoutSuccessfulPage from "@repo/ui/components/shop-cart/checkout-successful/page";

export type PageProps = {
  params: {
    businessId: string;
  };
  searchParams: {
    orderId: string;
  };
};

export default async function Page({
  params: { businessId },
  searchParams: { orderId },
}: PageProps) {
  const business = await getBusinessById(businessId);
  const order = await getOrderById(orderId);
  return (
    <CheckoutSuccessfulPage business={business} order={order as CompleteOrder}>
      <CollaboratorOrder order={order as CompleteOrder} />
    </CheckoutSuccessfulPage>
  );
}
