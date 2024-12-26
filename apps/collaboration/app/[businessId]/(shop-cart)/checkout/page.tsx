import { getBusinessById } from "@repo/model/repository/business";
import CheckoutForm from "./form";
import { createCollaboratorOrder } from "@repo/model/repository/checkout";
import { getCurrentUser } from "@repo/model/repository/user";

export type Props = {
  params: {
    businessId: string;
  };
};

export default async function Component({ params: { businessId } }: Props) {
  const business = await getBusinessById(businessId);
  const user = await getCurrentUser();
  const action = async (data: any) => {
    "use server";
    return createCollaboratorOrder(business, user, data);
  };
  return (
    <CheckoutForm
      business={business}
      action={action}
      defaultValues={{
        wantDomicile: true,
        cartItems: [],
      }}
    />
  );
}
