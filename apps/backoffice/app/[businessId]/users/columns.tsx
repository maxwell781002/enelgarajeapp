import { ColumnDef } from "@repo/ui/components/table/index";
import { useTableContext } from "@repo/ui/context/table";
import { BtnList } from "@repo/ui/components/ui/btn-list";
import { BtnRemove } from "@repo/ui/components/ui/btn-remove";
import { useTranslations } from "next-intl";
import { CompleteUser } from "@repo/model/zod/user";

type ActionProps = {
  row: CompleteUser;
};

function RowActions({ row }: ActionProps) {
  const { remove } = useTableContext();
  const t = useTranslations("User");
  return (
    <BtnList>
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
    header: "Teléfono",
    accessorKey: "phone",
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
