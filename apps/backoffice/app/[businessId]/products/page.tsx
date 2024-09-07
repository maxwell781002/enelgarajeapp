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

type PageProps = {
  searchParams: any;
  params: { businessId: string };
};

const defaultValues = {
  name: "",
};

export default async function Page({
  searchParams,
  params: { businessId },
}: PageProps) {
  const t = await getTranslations("Product");
  const { list, paginate, remove, update, create } = crud(
    `/${businessId}/products`,
    ProductRepository.name,
  );
  return (
    <Card>
      <CardHeader className="px-7">
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
      </CardHeader>
      <CardContent>
        <TableContextProvider update={update} remove={remove}>
          <ProductTable
            pagination={await list({ ...searchParams, businessId })}
            paginate={paginate}
          />
        </TableContextProvider>
      </CardContent>
    </Card>
  );
}
