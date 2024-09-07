import { ColumnDef } from "@repo/ui/components/table/index";
import Link from "next/link";

export const columns: ColumnDef<any>[] = [
  {
    header: "Nombre",
    accessorKey: "name",
    row: ({ cell: { value, row } }: { cell: { value: string; row: any } }) => {
      return (
        <div className="flex flex-1">
          <img
            src={row.image}
            alt={row.name}
            style={{ width: 48, height: 48 }}
            className="rounded-t-lg object-cover w-full h-48 mr-4"
          />
          <Link
            href={`products/${row.id}`}
            className="flex-1 bg-white hover:bg-gray-100 text-gray-800 h-10 w-10 text-blue-500 underline hover:text-blue-700 transition-colors"
            aria-label="View"
          >
            {value}
          </Link>
        </div>
      );
    },
  },
];
