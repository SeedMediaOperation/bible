export interface Pagination {
    currentPage?: number;
    totalPages?: number;
    hasNextPage?: boolean;
    hasPrevPage?: boolean;
    nextPage?:number;
    prevPage?:number;
    pageSize?: number;
    totalItems?: number;
    serialNumberStartFrom?:number;
    limit?:number;
}

export interface ReadingDate {
    id?:string | undefined;
    title_en:string;
    title_km:string;
    createdAt?:Date;
}

export interface apiResReadingDate{
    message:string;
    data:ReadingDate;
}

export interface ReadingDateProps {
    pagination?: Pagination;
    readingDate: ReadingDate[];
    submit?: (vlog: ReadingDate) => Promise<{msg:string, result:ReadingDate}>;
    onDelete?: (id: string) => Promise<string>; 
}