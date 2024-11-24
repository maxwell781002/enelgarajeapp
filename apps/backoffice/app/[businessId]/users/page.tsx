import { crud } from "@repo/model/lib/crud";
import { TableContextProvider } from "@repo/ui/context/table";
import { getTranslations } from "next-intl/server";
import { PaginationResult } from "@repo/model/types/pagination";
import TableLayout from "@repo/ui/components/table-layout";
import Filter from "./filters";
import { redirect } from "next/navigation";
import { getBusinessById } from "@repo/model/repository/business";
import { userRepository } from "@repo/model/repositories/user";
import UserTable from "./table";
import { CreateInvitation } from "./invitation-modal";
import { getPlanFeature } from "@repo/model/lib/plans-feature";
import { revalidatePath } from "next/cache";

type PageProps = {
  searchParams: any;
  params: { businessId: string };
};

export default async function Page({
  searchParams,
  params: { businessId },
}: PageProps) {
  const t = await getTranslations("User");
  const business = await getBusinessById(businessId);
  const { list, update, search } = crud(
    `/${businessId}/users`,
    userRepository.getRepositoryModelName(),
    searchParams,
  );
  const handleSearch = async (query: any) => {
    "use server";
    const url = await search(query);
    return redirect(url);
  };
  const hasPlan = getPlanFeature<number>("NUMBER_BUSINESS_USER", business);
  const pagination = await list({ ...searchParams, businessId });
  const remove = async (id: string) => {
    "use server";
    await userRepository.removeFromBusiness(id, businessId);
    revalidatePath(`/${businessId}/users`);
  };
  return (
    <TableLayout
      title={t("UserList")}
      filter={<Filter onChange={handleSearch} />}
      buttons={<CreateInvitation business={business} hasPlan={hasPlan !== 0} />}
    >
      <TableContextProvider update={update} remove={remove}>
        <UserTable pagination={pagination as PaginationResult<any>} />
      </TableContextProvider>
    </TableLayout>
  );
}
