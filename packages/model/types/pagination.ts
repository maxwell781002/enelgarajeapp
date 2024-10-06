export type PaginationResult<T> = {
  total: number;
  totalPage: number;
  pageIndex: number;
  pageSize: number;
  firstRecordNumber: number;
  lastRecordNumber: number;
  data: T[];
  hasMore: boolean;
  previousLink?: string;
  nextLink?: string;
};

export type PaginateData = {
  pageIndex?: number;
  pageSize?: number;
  where?: any;
  orderBy?: any;
  include?: any;
  query?: any;
};
export type Paginate = (data: PaginateData) => void;
