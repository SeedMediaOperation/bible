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

// The version data to send or receive
export interface Version {
    id?: string;
    titleEn?: string;
    titleKm?: string;
    slug?: string;
    createdAt?:Date;
  }
  
// The response from the API
export interface ApiResponseVersion {
    message?: string;
    data?: Version; // This should be a Version object, not a string
}
  
export interface VersionProps {
    versions: Version[];
    pagination?: Pagination;
    submit: (version: Version) => Promise<{ msg: string; result: Version }>;
    onDelete?: (id: string) => Promise<{ msg: string; result: Version }>; // ✅ FIXED
}

export interface Book{
    id?: string;
    nameEn?: string;
    nameKm?: string;
    slug?: string;
    versionId?: string | number;
    version?: Version;
    createdAt?:Date;
}

// The response from the API
export interface ApiResponseBook {
    success?:boolean;
    message?: string;
    data?: Book; // This should be a Version object, not a string
}

export interface BookProps {
    versions:Version[];
    books: Book[];
    pagination?: Pagination;
    submit?: (book: Book) => Promise<{ msg?: string; result?: Book,success?: boolean; }>;
    onDelete?: (id: string) => Promise<{ msg: string; result: Book,success?: boolean; }>; 
}

export interface Chapters {
    id?:string | null;
    nameEn:string;
    nameKm:string;
    titleEn: string;
    titleKm: string;
    bookId:string | number;
    paragraphEn:string[];
    paragraphKm:string[];
    versionId?: string | number;
    slug?:string;
    message?:string;
    createdAt?:Date;
}

// The response from the API
export interface ApiResponseChapter {
    message?: string;
    data?: Chapters; // This should be a Version object, not a string
}

export interface ChapterProps {

    chapters:Chapters[];
    books: Book[];
    pagination?: Pagination;
    submit?: (chapter: Chapters) => Promise<{ msg?: string; result?: Chapters }>;
    onDelete?: (id: string) => Promise<{ msg?: string; result?: Chapters }>; 
        versions:Version[];
}

export interface ReadingProps {
    singleVersion?:Version;
    versions: Version[];
    books: Book[];
    chapters: Chapters[];
    params?:string;
}

export interface Media {
    id?: string;
    pro_name_En?: string;
    pro_name_Km?: string;
    video_url?: string;
    message?:string;
    createdAt?:Date;
}

// The response from the API
export interface ApiResponseMedia {
    message?: string;
    data?: Media; // This should be a Version object, not a string
}

export interface MediaProps{
    medias: Media[];
    pagination?: Pagination;
    submit?: (media: Media) => Promise<{ msg: string; result: Media }>;
    onDelete?: (id: string) => Promise<string>; 
}