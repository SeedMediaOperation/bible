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

export interface Vlog {
    id?:string | undefined;
    title_en:string;
    title_km:string;
    paragraph_en:string;
    paragraph_km:string;
    video_Url?:string;
    createdAt?:Date;
}

export interface apiResVlog{
    message:string;
    data:Vlog;
}

export interface VlogProps {
    pagination?: Pagination;
    vlog: Vlog[];
    submit?: (vlog: Vlog) => Promise<{msg:string, result:Vlog}>;
    onDelete?: (id: string) => Promise<string>; 
}