import { getCurrentBusiness } from "@repo/model/repository/business";
import ShoppingCartPage from "@repo/ui/components/shop-cart/shopping-cart/page";

export default async function Page() {
  const business = await getCurrentBusiness();
  return <ShoppingCartPage businessId={business.id} />;
}
