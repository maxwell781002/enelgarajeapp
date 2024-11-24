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
} from "../ui/pagination";
import { PaginationResult } from "@repo/model/types/pagination";
import EmptyTable, { EmptyTableProps } from "./empty";

export type ColumnDef<TData> = {
  header: string;
  accessorKey: keyof TData;
  cell?: (props: { cell: { value: any; row: any } }) => JSX.Element | string;
  row?: (props: { cell: { value: any; row: any } }) => JSX.Element | string;
};

export type MyTableProps = {
  pagination: PaginationResult<any>;
  columns: ColumnDef<any>[];
} & EmptyTableProps;

const getValue = (field: string, value: any) => {
  const parts = field.split(".");
  return parts.reduce((a: any, b: string) => a && a[b], value);
};

export default async function MyTable({
  pagination: { data, pageIndex, totalPage, total, previousLink, nextLink },
  columns,
  ...props
}: MyTableProps) {
  if (total === 0) {
    return <EmptyTable {...props} />;
  }
  return (
    <div className="bg-white">
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
                {columns.map((column) => {
                  const value = getValue(column.accessorKey as string, item);
                  return (
                    <TableCell
                      key={column.header}
                      className={`flex ${!column.row && "justify-between"} md:table-cell py-2 md:py-4`}
                    >
                      {column.row ? (
                        column.row({ cell: { value, row: item } })
                      ) : (
                        <>
                          <span className="font-medium md:hidden">
                            {column.header && `${column.header}:`}
                          </span>
                          <span>
                            {column.cell
                              ? column.cell({
                                  cell: { value, row: item },
                                })
                              : value}
                          </span>
                        </>
                      )}
                    </TableCell>
                  );
                })}
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
            {pageIndex} / {totalPage}
          </PaginationItem>
          <PaginationItem>
            {nextLink ? <PaginationNext href={nextLink} /> : <></>}
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
