import { ColumnDef } from "@repo/ui/components/table/index";
import { useTableContext } from "@repo/ui/context/table";
import { BtnList } from "@repo/ui/components/ui/btn-list";
import { DialogForm } from "./DialogForm";
import { BtnRemove } from "@repo/ui/components/ui/btn-remove";
import { Pencil1Icon } from "@radix-ui/react-icons";
import { useTranslations } from "next-intl";
import { CompleteNeighborhood } from "@repo/model/zod/neighborhood";
import { getCityByCode, getStateByCode } from "@repo/ui/lib/locations/index";

type ActionProps = {
  row: CompleteNeighborhood;
};

function RowActions({ row }: ActionProps) {
  const { remove, update } = useTableContext();
  const t = useTranslations("Neighborhood");
  const state = getCityByCode(row.city)?.state;
  const defaultValues = { ...row, state };
  return (
    <BtnList>
      <DialogForm
        title={t("edit")}
        action={(data) => update(row.id, data)}
        defaultValues={defaultValues}
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
    header: "Provincia",
    accessorKey: "city",
    cell: ({ cell: { value, row } }: { cell: { value: string; row: any } }) => {
      const city = getCityByCode(value);
      return (city && getStateByCode(city.state)?.name) || "";
    },
  },
  {
    header: "Ciudad",
    accessorKey: "city",
    cell: ({ cell: { value, row } }: { cell: { value: string; row: any } }) =>
      getCityByCode(value)?.name || "",
  },
  {
    header: "Acciones",
    accessorKey: "name",
    cell: ({ cell: { value, row } }: { cell: { value: string; row: any } }) => {
      return <RowActions row={row} />;
    },
  },
];
