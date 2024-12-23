import { getBusinessById } from "@repo/model/repository/business";
import CheckoutPage from "@repo/ui/components/shop-cart/checkout/index";
import CheckoutForm from "./form";

export type Props = {
  params: {
    businessId: string;
  };
};

export default async function Component({ params: { businessId } }: Props) {
  const business = await getBusinessById(businessId);
  const action = async (data: any) => {
    "use server";
    console.log(data);
  };
  return (
    <CheckoutPage>
      <CheckoutForm
        business={business}
        action={action}
        defaultValues={{
          wantDomicile: true,
        }}
      />
    </CheckoutPage>
  );
}
