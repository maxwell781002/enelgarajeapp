import { ColumnDef } from "@repo/ui/components/table/index";
import { useTableContext } from "@repo/ui/context/table";
import { BtnList } from "@repo/ui/components/ui/btn-list";
import { DialogForm } from "./DialogForm";
import { BtnRemove } from "@repo/ui/components/ui/btn-remove";
import { Pencil1Icon } from "@radix-ui/react-icons";
import { useTranslations } from "next-intl";
import { getCityByCode, getStateByCode } from "@repo/ui/lib/locations/index";
import { formatPrice } from "@repo/model/lib/utils";
import { CompleteBusinessNeighborhood } from "@repo/model/zod/businessneighborhood";

type ActionProps = {
  row: CompleteBusinessNeighborhood;
};

function RowActions({ row }: ActionProps) {
  const { remove, update } = useTableContext();
  const t = useTranslations("BusinessNeighborhood");
  const city = row.neighborhood?.city;
  const state = getCityByCode(city)?.state;
  const defaultValues = { ...row, state, city };
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
    accessorKey: "neighborhood.name",
  },
  {
    header: "Provincia",
    accessorKey: "city",
    cell: ({ cell: { value, row } }: { cell: { value: string; row: any } }) => {
      const city = getCityByCode(row?.neighborhood?.city);
      return (city && getStateByCode(city.state)?.name) || "";
    },
  },
  {
    header: "Ciudad",
    accessorKey: "city",
    cell: ({ cell: { value, row } }: { cell: { value: string; row: any } }) =>
      getCityByCode(row?.neighborhood?.city)?.name || "",
  },
  {
    header: "Precio",
    accessorKey: "shipping",
    cell: ({ cell: { value, row } }: { cell: { value: string; row: any } }) =>
      formatPrice(value as unknown as number),
  },
  {
    header: "Acciones",
    accessorKey: "name",
    cell: ({ cell: { value, row } }: { cell: { value: string; row: any } }) => {
      return <RowActions row={row} />;
    },
  },
];
