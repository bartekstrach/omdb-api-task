export interface PaginationParams {
    page: number;
    pageSize: number;
    searchTerm?: string;
}

export interface PaginatedResult<T> {
    data: T[];
    total: number;
    page: number;
    pageSize: number;
    totalPages: number;
}
