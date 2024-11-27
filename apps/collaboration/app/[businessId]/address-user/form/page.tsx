import { getBusinessById } from "@repo/model/repository/business";
import AddressUserFormPage from "@repo/ui/components/address-user/form/page";

export type PageProps = {
  params: {
    businessId: string;
  };
  searchParams: {
    id?: string;
  };
};

export default async function FormPage({
  params: { businessId },
  searchParams: { id },
}: PageProps) {
  return (
    <AddressUserFormPage
      id={id}
      business={await getBusinessById(businessId)}
      isCollaborator
      baseUrl={`/${businessId}`}
    />
  );
}
