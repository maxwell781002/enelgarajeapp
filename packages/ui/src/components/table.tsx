import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@repo/ui/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "./ui/pagination";
import { Url } from "url";
import { PaginationResult } from "@repo/model/types/pagination";

export type ColumnDef<TData> = {
  header: string;
  accessorKey: keyof TData;
  cell?: (props: { cell: { value: any } }) => JSX.Element;
};

type MyTableProps = {
  pagination: PaginationResult<any>;
  columns: ColumnDef<any>[];
  previousLink?: Url;
  nextLink?: Url;
  currentPage: number;
  totalPages: number;
};

export default function MyTable({
  pagination: { data, pageIndex, totalPage },
  columns,
  previousLink,
  nextLink,
}: MyTableProps) {
  return (
    <div>
      <div className="w-full overflow-hidden border rounded-lg">
        <Table>
          <TableHeader className="bg-muted/50 hidden md:table-header-group">
            <TableRow>
              {columns.map((column) => (
                <TableHead key={column.header}>{column.header}</TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((item: any, index: number) => (
              <TableRow
                key={item.id}
                className="flex flex-col md:table-row border-b md:border-b-0"
              >
                {columns.map((column) => (
                  <TableCell
                    key={column.header}
                    className="flex justify-between md:table-cell py-2 md:py-4"
                  >
                    <span className="font-medium md:hidden">
                      {column.header}:
                    </span>
                    <span>
                      {column.cell
                        ? column.cell({
                            cell: { value: item[column.accessorKey] },
                          })
                        : item[column.accessorKey]}
                    </span>
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <Pagination className="pt-4 pb-4">
        <PaginationContent>
          <PaginationItem>
            {previousLink ? <PaginationPrevious href={previousLink} /> : <></>}
          </PaginationItem>
          <PaginationItem>
            {pageIndex + 1} / {totalPage}
          </PaginationItem>
          <PaginationItem>
            {nextLink ? <PaginationNext href={nextLink} /> : <></>}
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
