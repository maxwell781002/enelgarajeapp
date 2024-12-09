import ShoppingCartPage from "@repo/ui/components/shop-cart/shopping-cart/page";

export default async function Page({
  params: { businessId },
}: {
  params: { businessId: string };
}) {
  return <ShoppingCartPage baseUrl={`/${businessId}/products`} showCommission />;
}
