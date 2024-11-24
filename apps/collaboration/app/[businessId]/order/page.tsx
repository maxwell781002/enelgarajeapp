import { getBusinessById } from "@repo/model/repository/business";
import OrderPage from "@repo/ui/components/order-page/page";

export type PageProps = {
  params: {
    businessId: string;
  };
};

export default async function Page({ params: { businessId } }: PageProps) {
  const business = await getBusinessById(businessId);
  return <OrderPage baseUrl={`/${businessId}`} business={business} />;
}
