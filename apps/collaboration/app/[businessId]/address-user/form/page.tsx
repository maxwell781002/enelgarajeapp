import { getBusinessById } from "@repo/model/repository/business";
import AddressUserFormPage from "@repo/ui/components/address-user/form/page";

export type PageProps = {
  params: Promise<{
    businessId: string;
  }>;
  searchParams: Promise<{
    id?: string;
  }>;
};

export default async function FormPage({ params, searchParams }: PageProps) {
  const { id } = await searchParams;
  const { businessId } = await params;
  return (
    <AddressUserFormPage
      id={id}
      business={await getBusinessById(businessId)}
      isCollaborator
      baseUrl={`/${businessId}`}
    />
  );
}
