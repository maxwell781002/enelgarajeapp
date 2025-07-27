import TableLayout from "@repo/ui/components/table-layout/layout";
import { TableContextProvider } from "@repo/ui/context/table";
import { getTranslations } from "next-intl/server";
import CustomersTable from "./table";
import { PaginationResult } from "@repo/model/types/pagination";
import { crud } from "@repo/model/lib/crud";
import { userRepository } from "@repo/model/repositories/user";
import Filter from "./filters";
import { redirect } from "next/navigation";

type PageProps = {
  searchParams: Promise<any>;
  params: Promise<{ businessId: string }>;
};

export default async function CustomerPage({
  params,
  searchParams,
}: PageProps) {
  const { businessId } = await params;
  searchParams = await searchParams;
  const t = await getTranslations("Customers");
  const { list, search } = crud(
    `/${businessId}/customers`,
    userRepository.getRepositoryModelName(),
    searchParams,
    {
      paginateMethod: "getCustomers",
    },
  );
  const pagination = await list({ ...searchParams, businessId });
  const handleSearch = async (query: any) => {
    "use server";
    const url = await search(query);
    return redirect(url);
  };
  return (
    <TableContextProvider>
      <TableLayout
        title={t("List")}
        filter={<Filter onChange={handleSearch} />}
      >
        <CustomersTable pagination={pagination as PaginationResult<any>} />
      </TableLayout>
    </TableContextProvider>
  );
}
