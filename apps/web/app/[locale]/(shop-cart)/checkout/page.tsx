import { getCurrentBusiness } from "@repo/model/repository/business";
import CheckoutPage from "@repo/ui/components/shop-cart/checkout/page";

export default async function Component() {
  const business = await getCurrentBusiness();
  return <CheckoutPage business={business} addressUrl={"/address-user"} />;
}
