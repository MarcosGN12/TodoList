export type Page<T> = {
    data: T[];
    currentPage: number;
    totalPages: number;
};
