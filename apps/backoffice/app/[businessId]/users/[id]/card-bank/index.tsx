import TableLayout from "@repo/ui/components/table-layout/layout";
import { TableContextProvider } from "@repo/ui/context/table";
import { getTranslations } from "next-intl/server";
import { DialogForm } from "./DialogForm";
import { collaboratorCardBankRepository } from "@repo/model/repositories/collaborator-card-bank";
import { formDataToObject } from "@repo/model/lib/utils";
import { revalidatePath } from "next/cache";
import { CompleteUser } from "@repo/model/zod/user";

export type CardBankProps = {
  businessId: string;
  collaboratorId: string;
  user: CompleteUser;
};

export default async function CardBank({
  businessId,
  collaboratorId,
  user,
}: CardBankProps) {
  const t = await getTranslations("CardBank");
  const remove = async () => {
    "use server";
  };
  const create = async (formData: FormData) => {
    "use server";
    const obj = formDataToObject(formData) as any;
    await collaboratorCardBankRepository.create(obj);
    return revalidatePath(`/${businessId}/users/${collaboratorId}`);
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
            defaultValues={{ businessId, collaboratorId, phone: user.phone }}
          />
        }
      >
        CardNumbers list
        {/* <CategoryTable pagination={pagination as PaginationResult<any>} /> */}
      </TableLayout>
    </TableContextProvider>
  );
}
