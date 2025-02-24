import { crud } from "@repo/model/lib/crud";
import { TableContextProvider } from "@repo/ui/context/table";
import { getTranslations } from "next-intl/server";
import { productRepository } from "@repo/model/repositories/product";
import ProductTable from "./table";
import Link from "next/link";
import { Button } from "@repo/ui/components/ui/button";
import { PaginationResult } from "@repo/model/types/pagination";
import Filter from "./filters";
import { categoryRepository } from "@repo/model/repositories/category";
import { redirect } from "next/navigation";
import TableLayout from "@repo/ui/components/table-layout/layout";
import { getBusinessById } from "@repo/model/repository/business";
import SendToWhatsapp from "./whatsapp/send";

type PageProps = {
  searchParams: any;
  params: { businessId: string };
};

export default async function Page({
  searchParams,
  params: { businessId },
}: PageProps) {
  const t = await getTranslations("Product");
  const business = await getBusinessById(businessId);
  const { list, remove, update, search } = crud(
    `/${businessId}/products`,
    productRepository.getRepositoryModelName(),
    searchParams,
  );
  const pagination = await list({ businessId });
  const categories = await categoryRepository.getAll(businessId);
  const handleSearch = async (query: any) => {
    "use server";
    const url = await search(query);
    return redirect(url);
  };
  return (
    <TableContextProvider update={update} remove={remove}>
      <TableLayout
        title={t("ProductList")}
        buttons={
          <div className="flex gap-2 flex-col sm:flex-row">
            <Link href={`/${businessId}/products/form`}>
              <Button>{t("createProduct")}</Button>
            </Link>
            <SendToWhatsapp />
          </div>
        }
        filter={<Filter onChange={handleSearch} categories={categories} />}
      >
        <ProductTable
          pagination={pagination as PaginationResult<any>}
          business={business}
        />
      </TableLayout>
    </TableContextProvider>
  );
}
