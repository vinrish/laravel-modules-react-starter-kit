export interface Role {
    id: number | string;
    name: string;
    guard_name: string;
    created_at?: string;
    updated_at?: string;
    permissions?: Array<{
        id: number | string;
        name: string;
    }>;
}

export interface AdminUser {
    id: string | number;
    name: string;
    email: string;
    email_verified_at: string | null;
    is_active: boolean;
    created_at: string;
    updated_at: string;
    roles?: Role[];
    permissions?: Array<{
        id: number | string;
        name: string;
    }>;
}

export interface UserStats {
    total_users: number;
    active_users: number;
    inactive_users: number;
    admins_count: number;
    teachers_count: number;
    students_count: number;
    parents_count: number;
}

export interface PaginationLink {
    url: string | null;
    label: string;
    active: boolean;
}

export interface PaginatedData<T> {
    data: T[];
    current_page: number;
    first_page_url: string;
    from: number | null;
    last_page: number;
    last_page_url: string;
    links: PaginationLink[];
    next_page_url: string | null;
    path: string;
    per_page: number;
    prev_page_url: string | null;
    to: number | null;
    total: number;
}

export interface UserFilters {
    search?: string | null;
    role?: string | null;
    status?: string | null;
}
