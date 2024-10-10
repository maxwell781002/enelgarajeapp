import { crud } from "@repo/model/lib/crud";
import { TableContextProvider } from "@repo/ui/context/table";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@repo/ui/components/ui/card";
import { getTranslations } from "next-intl/server";
import { ProductRepository } from "@repo/model/repositories/product";
import ProductTable from "./table";
import Link from "next/link";
import { Button } from "@repo/ui/components/ui/button";
import { PaginationResult } from "@repo/model/types/pagination";
import Filter from "./filters";
import { categoryRepository } from "@repo/model/repositories/category";

type PageProps = {
  searchParams: any;
  params: { businessId: string };
};

export default async function Page({
  searchParams,
  params: { businessId },
}: PageProps) {
  const t = await getTranslations("Product");
  const { list, remove, update, search } = crud(
    `/${businessId}/products`,
    ProductRepository.name,
    searchParams,
  );
  const pagination = await list({ businessId });
  const categories = await categoryRepository.getAll(businessId);
  return (
    <Card>
      <CardHeader className="px-6">
        <div className="flex flex-1">
          <div>
            <CardTitle>{t("ProductList")}</CardTitle>
          </div>
          <div className="flex-1 flex justify-end">
            <Link href={`/${businessId}/products/form`}>
              <Button>{t("createProduct")}</Button>
            </Link>
          </div>
        </div>
        <div className="flex flex-1 p-2 rounded border bg-neutral-300 sm:bg-white sm:border-0 sm:rounded-none sm:p-0">
          <Filter onChange={search} categories={categories} />
        </div>
      </CardHeader>
      <CardContent>
        <TableContextProvider update={update} remove={remove}>
          <ProductTable pagination={pagination as PaginationResult<any>} />
        </TableContextProvider>
      </CardContent>
    </Card>
  );
}
