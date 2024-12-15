import { getBusinessById } from "@repo/model/repository/business";
import CheckoutPage from "@repo/ui/components/shop-cart/checkout/page";

export type Props = {
  params: {
    businessId: string;
  };
};

export default async function Component({ params: { businessId } }: Props) {
  const business = await getBusinessById(businessId);
  return (
    <CheckoutPage
      business={business}
      baseUrl={`/${businessId}`}
      isCollaborator
      addAliasToAddress={false}
      addressUrl={`/${businessId}/address-user`}
      productBaseUrl={`/${businessId}/products`}
    />
  );
}
