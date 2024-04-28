export interface PaginationProps {
    currentPage: number;
    itemPerPage: number;
    totalItems: Number;
    totalPages: number;
}

export class PaginatedResult<T> {
    data: T;
    pagination: PaginationProps;
    constructor(data: T, pagination: PaginationProps) {
        this.data = data;
        this.pagination = pagination;
    }
}

export class PagingParams {
    pageNumber;
    pagesize;
    constructor(pageNumber = 1, pageSize = 10) {
        this.pageNumber = pageNumber;
        this.pagesize = pageSize;
    }
}