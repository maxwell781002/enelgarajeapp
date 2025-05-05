import { crud } from "@repo/model/lib/crud";
import { TableContextProvider } from "@repo/ui/context/table";
import { DialogForm } from "./DialogForm";
import { getTranslations } from "next-intl/server";
import { PaginationResult } from "@repo/model/types/pagination";
import TableLayout from "@repo/ui/components/table-layout/layout";
import Filter from "./filters";
import { redirect } from "next/navigation";
import NeighborhoodTable from "./table";
import { businessNeighborhoodRepository } from "@repo/model/repositories/business-neighborhood";
import { CompleteBusinessNeighborhood } from "@repo/model/zod/businessneighborhood";

type PageProps = {
  searchParams: Promise<any>;
  params: Promise<{ businessId: string }>;
};

export default async function Page({
  params,
  searchParams: propsSearchParams,
}: PageProps) {
  const { businessId } = await params;
  const searchParams = await propsSearchParams;
  const t = await getTranslations("BusinessNeighborhood");
  const { list, remove, update, create, search } = crud(
    `/${businessId}/neighborhood`,
    businessNeighborhoodRepository.getRepositoryModelName(),
    searchParams,
  );
  const handleSearch = async (query: any) => {
    "use server";
    const url = await search(query);
    return redirect(url);
  };
  const pagination = await list({ ...searchParams, businessId });
  return (
    <TableContextProvider update={update} remove={remove}>
      <TableLayout
        title={t("NeighborhoodList")}
        filter={<Filter onChange={handleSearch} />}
        buttons={
          <DialogForm
            title={t("create")}
            action={create}
            defaultValues={
              { active: true, businessId } as CompleteBusinessNeighborhood
            }
          />
        }
      >
        <NeighborhoodTable pagination={pagination as PaginationResult<any>} />
      </TableLayout>
    </TableContextProvider>
  );
}
