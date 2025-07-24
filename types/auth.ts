// Data submitted from the form
export interface UserFormData {
    username?: string;
    email?: string;
    password?: string;
    remember?:boolean;
    confirmPassword?: string;
}

// Response returned from the API
export interface UserResponse {
    message: string;
    userId?: string;
    token?: string;
}

// Props passed to the SignupForm component
export interface UserFormProps {
    submit: (form: UserFormData) => Promise<string>;
}

export interface UserProfile{
    id?: string;
    username: string;
    email?: string;
    profile?: string;
    role: 'USER' | 'ADMIN';
    password?:string;
    isVerifyEmail?: boolean;
    createdAt?:Date;
}

export interface apiResProfile{
    data:UserProfile;
    message:string;
}

export interface Profile{
    profile: UserProfile;
    submit: (form: UserProfile) => Promise<{ ok: boolean; message?: string }>;
}

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

export interface UserProps {
    users: UserProfile[];
    submit?: (user: UserProfile) => Promise<{msg:string, result:UserProfile}>;
    pagination?: Pagination;
    onDelete?: (id: string) => Promise<string>; 
}

