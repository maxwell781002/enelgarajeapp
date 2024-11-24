import {
  Pagination as BasePagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@repo/ui/components/ui/pagination";

export type PaginationProps = {
  pageIndex: number;
  totalPage: number;
  previousLink?: string;
  nextLink?: string;
};

export default function Pagination({
  pageIndex,
  totalPage,
  previousLink,
  nextLink,
}: PaginationProps) {
  return (
    <BasePagination className="pt-4 pb-4">
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
    </BasePagination>
  );
}
