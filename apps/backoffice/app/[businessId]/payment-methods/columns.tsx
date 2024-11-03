import { ColumnDef } from "@repo/ui/components/table/index";
import { useTableContext } from "@repo/ui/context/table";
import { BtnList } from "@repo/ui/components/ui/btn-list";
import { DialogForm } from "./DialogForm";
import { BtnRemove } from "@repo/ui/components/ui/btn-remove";
import { Pencil1Icon } from "@radix-ui/react-icons";
import { useTranslations } from "next-intl";
import { CompletePaymentMethod } from "@repo/model/zod/paymentmethod";
import { Detail } from "./detail";

type ActionProps = {
  row: CompletePaymentMethod;
};

function RowActions({ row }: ActionProps) {
  const { remove, update } = useTableContext();
  const t = useTranslations("PaymentMethod");
  return (
    <BtnList>
      <Detail data={row} />
      <DialogForm
        title={t("edit")}
        action={(data) => update(row.id, data)}
        defaultValues={row}
        btnIcon={<Pencil1Icon />}
      />
      <BtnRemove
        action={remove}
        entityId={row.id}
        title={t("remove")}
        description={t("removeDescription")}
        btnContinueText={t("removeContinue")}
        btnCancelText={t("removeCancel")}
      />
    </BtnList>
  );
}

export const columns: ColumnDef<any>[] = [
  {
    header: "Nombre",
    accessorKey: "name",
    cell: ({ cell: { value, row } }: { cell: { value: string; row: any } }) =>
      value,
  },
  {
    header: "Tipo",
    accessorKey: "type",
    cell: ({ cell: { value, row } }: { cell: { value: string; row: any } }) =>
      value,
  },
  {
    header: "Acciones",
    accessorKey: "name",
    cell: ({ cell: { value, row } }: { cell: { value: string; row: any } }) => {
      return <RowActions row={row} />;
    },
  },
];
