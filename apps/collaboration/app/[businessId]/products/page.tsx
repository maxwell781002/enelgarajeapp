import { crud } from "@repo/model/lib/crud";
import { TableContextProvider } from "@repo/ui/context/table";
import { getTranslations } from "next-intl/server";
import { productRepository } from "@repo/model/repositories/product";
import Filter from "./filters";
import { categoryRepository } from "@repo/model/repositories/category";
import { redirect } from "next/navigation";
import TableLayout from "@repo/ui/components/table-layout";
import ProductTable from "./table";
import { PaginationResult } from "@repo/model/types/pagination";

type PageProps = {
  searchParams: any;
  params: { businessId: string };
};

export default async function Page({
  searchParams,
  params: { businessId },
}: PageProps) {
  const t = await getTranslations("ProductCollaboration");
  const { list, remove, update, search } = crud(
    `/${businessId}/products`,
    productRepository.getRepositoryModelName(),
    searchParams,
    {
      paginateMethod: "collaborationPaginate",
    },
  );
  const pagination = await list({ businessId });
  const categories = await categoryRepository.getAll(businessId);
  const handleSearch = async (query: any) => {
    "use server";
    const url = await search(query);
    return redirect(url);
  };
  return (
    <TableLayout
      title={t("ProductList")}
      filter={<Filter onChange={handleSearch} categories={categories} />}
    >
      <TableContextProvider update={update} remove={remove}>
        <ProductTable pagination={pagination as PaginationResult<any>} />
      </TableContextProvider>
    </TableLayout>
  );
}
