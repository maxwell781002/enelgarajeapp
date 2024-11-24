import { CompleteCategory } from "@repo/model/zod/category";
import { ColumnDef } from "@repo/ui/components/table/index";
import { useTableContext } from "@repo/ui/context/table";
import { BtnList } from "@repo/ui/components/ui/btn-list";
import { DialogForm } from "./DialogForm";
import { BtnRemove } from "@repo/ui/components/ui/btn-remove";
import { Pencil1Icon } from "@radix-ui/react-icons";
import { useTranslations } from "next-intl";
import { Check } from "lucide-react";

type ActionProps = {
  row: CompleteCategory;
};

function RowActions({ row }: ActionProps) {
  const { remove, update } = useTableContext();
  const t = useTranslations("Category");
  return (
    <BtnList>
      <DialogForm
        title={t("editCategory")}
        action={(data) => update(row.id, data)}
        defaultValues={row}
        btnIcon={<Pencil1Icon />}
      />
      <BtnRemove
        action={remove}
        entityId={row.id}
        title={t("removeCategory")}
        description={t("removeCategoryDescription")}
        btnContinueText={t("removeCategoryContinue")}
        btnCancelText={t("removeCategoryCancel")}
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
    header: "Prioridad",
    accessorKey: "priority",
    cell: ({ cell: { value, row } }: { cell: { value: string; row: any } }) =>
      value,
  },
  {
    header: "Activo",
    accessorKey: "active",
    cell: ({ cell: { value, row } }: { cell: { value: string; row: any } }) => (
      <>
        {value ? (
          <Check
            className={`${
              value ? "text-green-500" : "text-red-500"
            } inline-block w-4 h-4`}
          />
        ) : null}
      </>
    ),
  },
  {
    header: "Acciones",
    accessorKey: "name",
    cell: ({ cell: { value, row } }: { cell: { value: string; row: any } }) => {
      return <RowActions row={row} />;
    },
  },
];
