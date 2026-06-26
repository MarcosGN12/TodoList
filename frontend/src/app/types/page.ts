export interface Page<T> {
  data: T[];
  currentPage: number;
  totalPages: number;
}
