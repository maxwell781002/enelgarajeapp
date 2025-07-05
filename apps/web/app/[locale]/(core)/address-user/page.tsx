import { getCurrentBusiness } from "@repo/model/repository/business";
import AddressUserPage from "@repo/ui/components/address-user/page";

export default async function Page() {
  const business = await getCurrentBusiness();
  return <AddressUserPage business={business} />;
}
