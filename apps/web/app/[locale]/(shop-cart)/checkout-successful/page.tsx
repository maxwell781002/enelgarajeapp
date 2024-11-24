import { getCurrentBusiness } from "@repo/model/repository/business";
import CheckoutSuccessfulPage, {
  CheckoutSuccessfulPageProps,
} from "@repo/ui/components/shop-cart/checkout-successful/page";

export default async function Page(props: CheckoutSuccessfulPageProps) {
  const business = await getCurrentBusiness();
  return <CheckoutSuccessfulPage {...props} business={business} />;
}
