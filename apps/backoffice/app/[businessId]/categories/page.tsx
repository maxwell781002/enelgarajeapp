import { crud } from "@repo/model/lib/crud";
import { categoryRepository } from "@repo/model/repositories/category";
import CategoryTable from "./table";
import { TableContextProvider } from "@repo/ui/context/table";
import { DialogForm } from "./DialogForm";
import { getTranslations } from "next-intl/server";
import { PaginationResult } from "@repo/model/types/pagination";
import TableLayout from "@repo/ui/components/table-layout";
import Filter from "./filters";
import { redirect } from "next/navigation";
import { getBusinessById } from "@repo/model/repository/business";
import { getPlanFeature } from "@repo/model/lib/plans-feature";
import UpgradePlan from "@repo/ui/components/upgrade-plan/index";

type PageProps = {
  searchParams: any;
  params: { businessId: string };
};

export default async function Page({
  searchParams,
  params: { businessId },
}: PageProps) {
  const t = await getTranslations("Category");
  const business = await getBusinessById(businessId);
  if (!getPlanFeature("CAN_CREATE_CATEGORY", business)) {
    return <UpgradePlan business={business} title={t("upgrade_plan_title")} />;
  }
  const { list, remove, update, create, search } = crud(
    `/${businessId}/categories`,
    categoryRepository.getRepositoryModelName(),
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
      title={t("CategoryList")}
      filter={<Filter onChange={handleSearch} />}
      buttons={
        <DialogForm
          title={t("createCategory")}
          action={create}
          defaultValues={{ businessId, active: true, priority: 0 }}
        />
      }
    >
      <TableContextProvider update={update} remove={remove}>
        <CategoryTable pagination={pagination as PaginationResult<any>} />
      </TableContextProvider>
    </TableLayout>
  );
}
