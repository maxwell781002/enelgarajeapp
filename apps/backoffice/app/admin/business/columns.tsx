import { ColumnDef } from "@repo/ui/components/table/index";
import Link from "next/link";
import BooleanValue from "@repo/ui/components/boolean-value";

export const columns: ColumnDef<any>[] = [
  {
    header: "Nombre",
    accessorKey: "name",
    cell: ({ cell: { value, row } }: { cell: { value: string; row: any } }) => {
      return <Link href={`/${row.id}`}>{value}</Link>;
    },
  },
  {
    header: "Activo",
    accessorKey: "active",
    cell: ({
      cell: { value, row },
    }: {
      cell: { value: boolean; row: any };
    }) => {
      return <BooleanValue value={value} />;
    },
  },
];
