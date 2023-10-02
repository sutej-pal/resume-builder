interface GenericPaginatedResponse<T> {
    message: string;
    data: T[];
    pageStart: number;
    recordsTotal: number;
    recordsFiltered: number;
    pageLength: number;
}

export default GenericPaginatedResponse;