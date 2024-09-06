import { CompleteCategory } from "@repo/model/zod/category";
import { ColumnDef } from "@repo/ui/components/table/index";
import { useTableContext } from "@repo/ui/context/table";
import { BtnList } from "@repo/ui/components/ui/btn-list";
import { DialogForm } from "./DialogForm";
import { BtnRemove } from "@repo/ui/components/ui/btn-remove";
import { Pencil1Icon } from "@radix-ui/react-icons";

type ActionProps = {
  row: CompleteCategory;
};

function RowActions({ row }: ActionProps) {
  const { remove, update } = useTableContext();
  return (
    <BtnList>
      <DialogForm
        title="Edit"
        action={update}
        defaultValues={row}
        btnIcon={<Pencil1Icon />}
      />
      <BtnRemove action={remove} entityId={row.id} />
    </BtnList>
  );
}

export const columns: ColumnDef<any>[] = [
  {
    header: "",
    accessorKey: "name",
    row: ({ cell: { value, row } }: { cell: { value: string; row: any } }) => {
      return (
        <div className="flex flex-1 justify-between">
          <div>{value}</div>
          <RowActions row={row} />
        </div>
      );
    },
  },
];
