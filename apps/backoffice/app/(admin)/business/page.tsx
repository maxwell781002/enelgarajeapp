import { crud } from "@repo/model/lib/crud";
import { TableContextProvider } from "@repo/ui/context/table";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@repo/ui/components/ui/card";
import { getTranslations } from "next-intl/server";
import { BusinessRepository } from "@repo/model/repositories/business";
import BusinessTable from "./table";
import { Button } from "@repo/ui/components/ui/button";
import Link from "next/link";

type PageProps = {
  searchParams: any;
  params: { businessId: string };
};

export default async function Page({
  searchParams,
  params: { businessId },
}: PageProps) {
  const t = await getTranslations("Business");
  const { list, remove } = crud(
    `/${businessId}/categories`,
    BusinessRepository.name,
    searchParams,
  );
  return (
    <Card>
      <CardHeader className="px-7">
        <div className="flex flex-1">
          <div>
            <CardTitle>{t("BusinessList")}</CardTitle>
          </div>
          <div className="flex-1 flex justify-end">
            <Link href={`/business/form`}>
              <Button>{t("createBusiness")}</Button>
            </Link>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <TableContextProvider remove={remove}>
          <BusinessTable pagination={await list({ businessId })} />
        </TableContextProvider>
      </CardContent>
    </Card>
  );
}
