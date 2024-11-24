import { getBusinessById } from "@repo/model/repository/business";
import CheckoutSuccessfulPage, {
  CheckoutSuccessfulPageProps,
} from "@repo/ui/components/shop-cart/checkout-successful/page";

export type PageProps = {
  params: {
    businessId: string;
  };
} & CheckoutSuccessfulPageProps;

export default async function Page({
  params: { businessId },
  ...props
}: PageProps) {
  const business = await getBusinessById(businessId);
  return <CheckoutSuccessfulPage {...props} business={business} />;
}
