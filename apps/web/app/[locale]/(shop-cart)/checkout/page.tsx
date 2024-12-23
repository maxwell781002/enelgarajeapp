import { getCurrentBusiness } from "@repo/model/repository/business";
import CheckoutPage from "@repo/ui/components/shop-cart/checkout/index";
import { AddressType } from "@repo/model/validation/user";
import { userRepository } from "@repo/model/repositories/user";
import NoUser from "@repo/ui/components/shop-cart/checkout/no-user";
import { auth } from "@repo/model/lib/auth";
import CheckoutForm from "./form";
import { userAddressRepository } from "@repo/model/repositories/user-address";

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
    wantDomicile: true,
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
    console.log(data);
  };

  return (
    <CheckoutPage>
      <CheckoutForm
        defaultValues={defaultValues}
        action={action}
        addresses={addresses}
        business={business}
      />
    </CheckoutPage>
  );
}
