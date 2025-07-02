import { getCurrentBusiness } from "@repo/model/repository/business";
import OrderPage from "@repo/ui/components/order-page/page";

export default async function Page() {
  const business = await getCurrentBusiness();
  return <OrderPage business={business} />;
}
