import { getBusinessById } from "@repo/model/repository/business";
import AddressUserPage from "@repo/ui/components/address-user/page";

export type PageProps = {
  params: {
    businessId: string;
  };
};

export default async function Page({ params: { businessId } }: PageProps) {
  const business = await getBusinessById(businessId);
  return (
    <AddressUserPage
      business={business}
      baseUrl={`/${businessId}`}
      isCollaborator
    />
  );
}
