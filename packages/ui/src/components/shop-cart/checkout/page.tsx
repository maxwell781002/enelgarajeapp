import { checkoutOrder, getCurrentOrder } from "@repo/model/repository/order";
import EmptyCart from "@repo/ui/components/shop-cart/emptyCart";
import { TUserRegisterSchema } from "@repo/model/validation/user";
import { redirect } from "next/navigation";
import { auth } from "@repo/model/lib/auth";
import NoUser from "@repo/ui/components/shop-cart/checkout/no-user";
import { userRepository } from "@repo/model/repositories/user";
import { userAddressRepository } from "@repo/model/repositories/user-address";
import CheckoutView from "@repo/ui/components/shop-cart/checkout/checkout-view";
import { CompleteAddress } from "@repo/model/zod/address";
import { CompleteBusiness } from "@repo/model/zod/business";

export type CheckoutPageProps = {
  business: CompleteBusiness;
  baseUrl?: string;
};

export default async function CheckoutPage({
  business,
  baseUrl,
}: CheckoutPageProps) {
  const order = await getCurrentOrder();
  if (!order || order.items.length === 0) {
    return <EmptyCart url={baseUrl || "/"} />;
  }
  const checkout = async (data: TUserRegisterSchema) => {
    "use server";
    await checkoutOrder(data, business);
    await redirect(`${baseUrl}/checkout-successful?orderId=${order.id}`);
  };
  const session = await auth();
  if (!session) {
    return <NoUser />;
  }
  const user = await userRepository.getById(session.user.id);
  const addresses = business.requestAddress
    ? await userAddressRepository.findByUserIdAndBusinessId(
        session.user.id,
        business.id as string,
      )
    : [];
  return (
    <CheckoutView
      checkout={checkout}
      user={{ ...user, wantDomicile: true }}
      business={business}
      addresses={addresses as CompleteAddress[]}
      order={order}
    />
  );
}
