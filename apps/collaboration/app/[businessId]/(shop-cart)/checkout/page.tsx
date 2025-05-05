import { getBusinessById } from "@repo/model/repository/business";
import CheckoutForm from "./form";
import { createCollaboratorOrder } from "@repo/model/repository/checkout";
import { getCurrentUser } from "@repo/model/repository/user";
import { Currency, FormOfPaymentType } from "@repo/model/types/enums";

export type Props = {
  params: Promise<{
    businessId: string;
  }>;
};

export default async function Component({ params }: Props) {
  const { businessId } = await params;
  const business = await getBusinessById(businessId);
  const user = await getCurrentUser();
  const action = async ({ customer, address, ...data }: any) => {
    "use server";
    if (address) {
      address.name = customer.name;
    }
    data = {
      ...data,
      customer,
      address,
    };
    return createCollaboratorOrder(business, user, data);
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
