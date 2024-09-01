import { businessRepository } from "@repo/model/repositories/business";
import BusinessSwitch from "@repo/ui/layouts/backoffice/business.switch";
import { redirect } from "next/navigation";

export default async function Page() {
  const business = await businessRepository.getByUser("");
  const onChangeBusiness = async (businessId: string) => {
    "use server";
    await redirect(`/${businessId}`);
  };

  return <div className="p-5">
    <BusinessSwitch business={business} onChangeBusiness={onChangeBusiness}  />
  </div>;
}
