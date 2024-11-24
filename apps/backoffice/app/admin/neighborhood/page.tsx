import { crud } from "@repo/model/lib/crud";
import { TableContextProvider } from "@repo/ui/context/table";
import { DialogForm } from "./DialogForm";
import { getTranslations } from "next-intl/server";
import { PaginationResult } from "@repo/model/types/pagination";
import TableLayout from "@repo/ui/components/table-layout";
import Filter from "./filters";
import { redirect } from "next/navigation";
import { neighborhoodRepository } from "@repo/model/repositories/neighborhood";
import NeighborhoodTable from "./table";

type PageProps = {
  searchParams: any;
};

export default async function Page({ searchParams }: PageProps) {
  const t = await getTranslations("Neighborhood");
  const { list, remove, update, create, search } = crud(
    "/admin/neighborhood",
    neighborhoodRepository.getRepositoryModelName(),
    searchParams,
  );
  const handleSearch = async (query: any) => {
    "use server";
    const url = await search(query);
    return redirect(url);
  };
  const pagination = await list({ ...searchParams });
  return (
    <TableLayout
      title={t("NeighborhoodList")}
      filter={<Filter onChange={handleSearch} />}
      buttons={
        <DialogForm
          title={t("create")}
          action={create}
          defaultValues={{ active: true }}
        />
      }
    >
      <TableContextProvider update={update} remove={remove}>
        <NeighborhoodTable pagination={pagination as PaginationResult<any>} />
      </TableContextProvider>
    </TableLayout>
  );
}
