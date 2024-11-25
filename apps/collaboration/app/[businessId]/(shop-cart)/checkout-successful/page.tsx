import { getBusinessById } from "@repo/model/repository/business";
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
  return <CheckoutSuccessfulPage orderId={orderId} business={business} />;
}
