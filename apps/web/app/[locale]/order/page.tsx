import { getCurrentBusiness } from "@repo/model/repository/business";
import OrderPage, { OrderPageProps } from "@repo/ui/components/order-page/page";

export default async function Page(params: OrderPageProps) {
  const business = await getCurrentBusiness();
  return <OrderPage {...params} business={business} />;
}
