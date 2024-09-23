import Image from "@repo/ui/components/image";
import { ColumnDef } from "@repo/ui/components/table/index";
import Link from "next/link";

export const columns: ColumnDef<any>[] = [
  {
    header: "Nombre",
    accessorKey: "name",
    row: ({ cell: { value, row } }: { cell: { value: string; row: any } }) => {
      return (
        <div className="flex flex-1">
          <Image src={row.image} width={48} height={48} alt={row.name} />
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
