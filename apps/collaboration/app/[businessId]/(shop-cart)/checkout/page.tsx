import { getBusinessById } from "@repo/model/repository/business";
import CheckoutForm from "./form";
import { createCollaboratorOrder } from "@repo/model/repository/checkout";
import { getCurrentUser } from "@repo/model/repository/user";
import { Currency, FormOfPaymentType } from "@repo/model/types/enums";

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
    console.log(data);
    // return createCollaboratorOrder(business, user, data);
  };
  return (
    <CheckoutForm
      business={business}
      action={action}
      defaultValues={{
        customer: {
          name: "",
          identification: "",
          phone: "",
        },
        ticket: {
          deliveryDate: new Date(),
          currency: Currency.CUP,
          formOfPayment: FormOfPaymentType.CASH,
          nota: "",
          acceptTerms: false,
        },
        wantDomicile: true,
        cartItems: [],
      }}
    />
  );
}
