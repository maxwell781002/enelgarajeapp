import ShoppingCartPage from "@repo/ui/components/shop-cart/shopping-cart/page";
import CardItem from "./card-item";

export default async function Page({
  params: { businessId },
}: {
  params: { businessId: string };
}) {
  return (
    <ShoppingCartPage
      baseUrl={`/${businessId}`}
      productBaseUrl={`/${businessId}/products`}
      showCommission
      businessId={businessId}
      isCollaborator
      CustomCartItem={CardItem}
    />
  );
}
