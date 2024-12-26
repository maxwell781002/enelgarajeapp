import { getCurrentBusiness } from "@repo/model/repository/business";
import { AddressType } from "@repo/model/validation/user";
import { userRepository } from "@repo/model/repositories/user";
import NoUser from "@repo/ui/components/shop-cart/checkout/no-user";
import { auth } from "@repo/model/lib/auth";
import CheckoutForm from "./form";
import { userAddressRepository } from "@repo/model/repositories/user-address";
import { createWebOrder } from "@repo/model/repository/checkout";

export default async function Component() {
  const business = await getCurrentBusiness();
  const session = await auth();
  if (!session) {
    return <NoUser />;
  }
  const user = await userRepository.getById(session.user.id);
  const defaultValues = {
    ...user,
    addressType: AddressType.selectAddress,
    wantDomicile: business.requestAddress,
    businessRequestAddress: business.requestAddress,
  };
  const addresses = business.requestAddress
    ? await userAddressRepository.findByUserIdAndBusinessId(
        session.user.id,
        business.id as string,
      )
    : [];
  const action = async (data: any) => {
    "use server";
    return createWebOrder(business, user, data);
  };

  return (
    <CheckoutForm
      defaultValues={defaultValues}
      action={action}
      addresses={addresses}
      business={business}
    />
  );
}
