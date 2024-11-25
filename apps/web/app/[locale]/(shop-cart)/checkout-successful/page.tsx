import { getCurrentBusiness } from "@repo/model/repository/business";
import CheckoutSuccessfulPage from "@repo/ui/components/shop-cart/checkout-successful/page";

export type PageProps = {
  searchParams: {
    orderId: string;
  };
};

export default async function Page({ searchParams: { orderId } }: PageProps) {
  const business = await getCurrentBusiness();
  return <CheckoutSuccessfulPage orderId={orderId} business={business} />;
}
