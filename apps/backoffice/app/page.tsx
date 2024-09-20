import { auth } from "@repo/model/lib/auth";
import { businessRepository } from "@repo/model/repositories/business";
import { UserRoles } from "@repo/model/repositories/user";
import BusinessSwitch from "@repo/ui/layouts/backoffice/business.switch";
import { redirect } from "next/navigation";

export default async function Page() {
  const {
    user: { role },
  } = await auth();
  if (role == UserRoles.ADMIN) {
    return redirect("/dashboard");
  }
  // const business = await businessRepository.getByUser("");
  const business: any = []; // TODO, remove this when the relation is ready
  const onChangeBusiness = async (businessId: string) => {
    "use server";
    await redirect(`/${businessId}`);
  };

  return (
    <div className="p-5">
      <BusinessSwitch business={business} onChangeBusiness={onChangeBusiness} />
    </div>
  );
}
