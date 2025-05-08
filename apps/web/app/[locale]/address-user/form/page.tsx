import { getCurrentBusiness } from "@repo/model/repository/business";
import AddressUserFormPage from "@repo/ui/components/address-user/form/page";

export default async function FormPage({ searchParams }: any) {
  const { id } = await searchParams;
  return <AddressUserFormPage id={id} business={await getCurrentBusiness()} />;
}
