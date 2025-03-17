import { PaginationResult } from "@repo/model/types/pagination";
import EmptyTable, { EmptyTableProps } from "@repo/ui/components/table/empty";
import Pagination from "@repo/ui/components/table/pagination";
import TableWrapper, { ColumnDef } from "@repo/ui/components/table/wrapper";
export type { ColumnDef } from "@repo/ui/components/table/wrapper";

export type MyTableProps = {
  pagination: PaginationResult<any>;
  columns: ColumnDef<any>[];
} & EmptyTableProps;

export default function MyTable({
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
        <TableWrapper columns={columns} data={data} />
      </div>
      <Pagination
        pageIndex={pageIndex}
        totalPage={totalPage}
        previousLink={previousLink}
        nextLink={nextLink}
      />
    </div>
  );
}
