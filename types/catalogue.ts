import {Vlog} from "@/types/vlog";
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
export interface Catalogue {
    id?: string;
    name_en?: string;
    name_km?: string;
    image?: string;
    slug?: string;
    message?:string;
    createdAt?:string;
}

export interface apiResCatalogue{
    data:Catalogue;
    message:string;
}

export interface CatalogueProps{
    pagination?: Pagination;
    catalogue: Catalogue[];
    submit?: (catalogue: Catalogue) => Promise<{msg:string,result:Catalogue}>;
    onDelete?: (id: string) => Promise<string>; 
}

export interface CatalogueBook {
    id?: string;
    catalogueId?: string;
    version?:string;
    name_en?:string;
    name_km?:string;
    type_en?:string;
    type_km?:string;
    size_en?:string;
    size_km?:string;
    code?:string;
    isbn?:string;
    image?:string;
    message?:string;
    createdAt?:string;
}

export interface Version {
    id: number;
    slug: string;
    name_en: string;
    name_km: string;
}

export interface apiResCataBook{
    data:CatalogueBook;
    message:string;
}

export interface CataProps{
    pagination?: Pagination;
    catalogue?: Catalogue[];
    catabook:CatalogueBook[];
    params?: { slug: string }; 
    versions?:Version[];
    submit?: (catalogueBook: CatalogueBook) => Promise<{msg:string,result:CatalogueBook}>;
    onDelete?: (id: string) => Promise<string>; 
}

export interface SearchProps{
    catabook:CatalogueBook[];
    vlog:Vlog[];
}