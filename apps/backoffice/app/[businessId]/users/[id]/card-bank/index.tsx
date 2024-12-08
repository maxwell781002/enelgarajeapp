import TableLayout from "@repo/ui/components/table-layout/layout";
import { TableContextProvider } from "@repo/ui/context/table";
import { getTranslations } from "next-intl/server";
import { DialogForm } from "./DialogForm";

export type CardBankProps = {
  businessId: string;
  collaboratorId: string;
};

export default async function CardBank({
  businessId,
  collaboratorId,
}: CardBankProps) {
  const t = await getTranslations("CardBank");
  const remove = async () => {
    "use server";
  };
  const create = async (...params: any) => {
    "use server";
    //sleep
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log(params);
  };
  return (
    <TableContextProvider remove={remove}>
      <TableLayout
        title={t("CardBankList")}
        // filter={<Filter onChange={handleSearch} />}
        buttons={
          <DialogForm
            title={t("createCardBank")}
            action={create}
            defaultValues={{ businessId, collaboratorId }}
          />
        }
      >
        CardNumbers list
        {/* <CategoryTable pagination={pagination as PaginationResult<any>} /> */}
      </TableLayout>
    </TableContextProvider>
  );
}
