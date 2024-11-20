import { crud } from "@repo/model/lib/crud";
import { TableContextProvider } from "@repo/ui/context/table";
import { getTranslations } from "next-intl/server";
import { PaginationResult } from "@repo/model/types/pagination";
import TableLayout from "@repo/ui/components/table-layout";
import Filter from "./filters";
import { redirect } from "next/navigation";
import { getBusinessById } from "@repo/model/repository/business";
import { getPlanFeature } from "@repo/model/lib/plans-feature";
import UpgradePlan from "@repo/ui/components/upgrade-plan/index";
import { userRepository } from "@repo/model/repositories/user";
import UserTable from "./table";

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
  if (!getPlanFeature("NUMBER_BUSINESS_USER", business)) {
    return <UpgradePlan business={business} title={t("upgrade_plan_title")} />;
  }
  const { list, remove, update, search } = crud(
    `/${businessId}/users`,
    userRepository.getRepositoryModelName(),
    searchParams,
  );
  const handleSearch = async (query: any) => {
    "use server";
    const url = await search(query);
    return redirect(url);
  };
  const pagination = await list({ ...searchParams, businessId });
  return (
    <TableLayout
      title={t("UserList")}
      filter={<Filter onChange={handleSearch} />}
    >
      <TableContextProvider update={update} remove={remove}>
        <UserTable pagination={pagination as PaginationResult<any>} />
      </TableContextProvider>
    </TableLayout>
  );
}
