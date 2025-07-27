import { ColumnDef } from "@repo/ui/components/table/index";
import Link from "next/link";

export const columns: ColumnDef<any>[] = [
  {
    header: "Nombre",
    accessorKey: "name",
    cell: ({ cell: { value, row } }: { cell: { value: string; row: any } }) => (
      <Link href={`customers/${row.id}`} className="flex items-center gap-2">
        <img
          src={row.image as string}
          referrerPolicy="no-referrer"
          alt={row.name as string}
          className="rounded-full h-8 w-8"
        />
        {value}
      </Link>
    ),
  },
];
