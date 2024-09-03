import { ColumnDef } from "@repo/ui/components/table/index";
import Link from "next/link";

export const columns: ColumnDef<any>[] = [
  {
    header: "",
    accessorKey: "name",
    cell: ({ cell: { value, row } }: { cell: { value: string; row: any } }) => {
      return (
        <Link
          href={`?id=${row.id}`}
          className="bg-white hover:bg-gray-100 text-gray-800 h-10 w-10 text-blue-500 underline hover:text-blue-700 transition-colors"
          aria-label="View"
        >
          {value}
        </Link>
      );
    },
  },
];
