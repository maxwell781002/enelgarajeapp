import { crud } from "@repo/model/lib/crud";
import { TableContextProvider } from "@repo/ui/context/table";
import { getTranslations } from "next-intl/server";
import { PaginationResult } from "@repo/model/types/pagination";
import TableLayout from "@repo/ui/components/table-layout/layout";
import Filter from "./filters";
import { redirect } from "next/navigation";
import { getBusinessById } from "@repo/model/repository/business";
import { userRepository } from "@repo/model/repositories/user";
import UserTable from "./table";
import { CreateInvitation } from "./invitation-modal";
import { getPlanFeature } from "@repo/model/lib/plans-feature";
import { revalidatePath } from "next/cache";
import { isUserByBusinessLimited } from "@repo/model/repository/user";

type PageProps = {
  searchParams: Promise<any>;
  params: Promise<{ businessId: string }>;
};

export default async function Page({ params, searchParams }: PageProps) {
  const { businessId } = await params;
  searchParams = await searchParams;
  const t = await getTranslations("User");
  const business = await getBusinessById(businessId);
  const { list, update, search } = crud(
    `/${businessId}/users`,
    userRepository.getRepositoryModelName(),
    searchParams,
    {
      paginateMethod: "getUsers",
    },
  );
  const handleSearch = async (query: any) => {
    "use server";
    const url = await search(query);
    return redirect(url);
  };
  const isLimited = await isUserByBusinessLimited(business);
  const pagination = await list({ ...searchParams, businessId });
  const remove = async (id: string) => {
    "use server";
    await userRepository.removeFromBusiness(id, businessId);
    revalidatePath(`/${businessId}/users`);
  };
  return (
    <TableContextProvider update={update} remove={remove}>
      <TableLayout
        title={t("UserList")}
        filter={<Filter onChange={handleSearch} />}
        buttons={
          <CreateInvitation business={business} canCreate={!isLimited} />
        }
      >
        <UserTable pagination={pagination as PaginationResult<any>} />
      </TableLayout>
    </TableContextProvider>
  );
}
