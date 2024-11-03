import { crud } from "@repo/model/lib/crud";
import { TableContextProvider } from "@repo/ui/context/table";
import { DialogForm } from "./DialogForm";
import { getTranslations } from "next-intl/server";
import { PaginationResult } from "@repo/model/types/pagination";
import TableLayout from "@repo/ui/components/table-layout";
import Filter from "./filters";
import { redirect } from "next/navigation";
import PaymentMethodTable from "./table";
import { paymentMethodRepository } from "@repo/model/repositories/payment-method";
import { getBusinessById } from "@repo/model/repository/business";
import { isPaymentMethodLimited } from "@repo/model/repository/payment-method";

type PageProps = {
  searchParams: any;
  params: { businessId: string };
};

export default async function Page({
  searchParams,
  params: { businessId },
}: PageProps) {
  const t = await getTranslations("PaymentMethod");
  const { list, remove, update, create, search } = crud(
    `/${businessId}/payment-methods`,
    paymentMethodRepository.getRepositoryModelName(),
    searchParams,
  );
  const handleSearch = async (query: any) => {
    "use server";
    const url = await search(query);
    return redirect(url);
  };
  const business = await getBusinessById(businessId);
  const pagination = await list({ ...searchParams, businessId });
  return (
    <TableLayout
      title={t("List")}
      filter={<Filter onChange={handleSearch} />}
      buttons={
        <DialogForm
          title={t("create")}
          action={create}
          defaultValues={{ businessId, name: "", data: {} }}
          business={business}
          isLimited={await isPaymentMethodLimited(business)}
        />
      }
    >
      <TableContextProvider update={update} remove={remove}>
        <PaymentMethodTable pagination={pagination as PaginationResult<any>} />
      </TableContextProvider>
    </TableLayout>
  );
}
