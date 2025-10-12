export type PagedItems<T> = {
  items: T[];
  totalCount: number;
  pageNumber: number;
  pageSize: number;
};
