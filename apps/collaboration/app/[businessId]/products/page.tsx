import { crud } from "@repo/model/lib/crud";
import { TableContextProvider } from "@repo/ui/context/table";
import { getTranslations } from "next-intl/server";
import { productRepository } from "@repo/model/repositories/product";
import Filter from "./filters";
import { categoryRepository } from "@repo/model/repositories/category";
import { redirect } from "next/navigation";
import TableLayout from "@repo/ui/components/table-layout/layout";
import ProductTable from "./table";
import { PaginationResult } from "@repo/model/types/pagination";
import { addToOrder, getCurrentOrder } from "@repo/model/repository/order";
import { revalidatePath } from "next/cache";
import { addProductFields } from "@repo/model/repository/product";
import { CARD_SKELETON } from "@repo/ui/components/table-layout/skeleton";

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
  let { data, ...pagination } = await list({ businessId });
  const categories = await categoryRepository.getAll(businessId);
  const handleSearch = async (query: any) => {
    "use server";
    const url = await search(query);
    return redirect(url);
  };
  const add = async (productId: string) => {
    "use server";
    await addToOrder(productId);
    revalidatePath(`/${businessId}/products`);
  };
  const order = await getCurrentOrder();
  data = await Promise.all(
    data.map(async (item: any) => addProductFields(item, order)),
  );
  return (
    <TableContextProvider update={update} remove={remove}>
      <TableLayout
        title={t("ProductList")}
        filter={<Filter onChange={handleSearch} categories={categories} />}
        skeletonMode={CARD_SKELETON}
      >
        <ProductTable
          pagination={{ data, ...pagination } as PaginationResult<any>}
          add={add}
          baseUrl={`/${businessId}`}
        />
      </TableLayout>
    </TableContextProvider>
  );
}
