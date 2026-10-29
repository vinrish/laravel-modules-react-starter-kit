import type { Auth, User } from './auth';
import type { ComponentType, ReactNode } from 'react';

export type * from './auth';

export interface BreadcrumbItem {
    title?: string;
    label?: string; // For backward compatibility
    href?: string;
}

export interface NavItem {
    title: string;
    name?: string; // For backward compatibility
    href: string;
    icon?: ComponentType<{ className?: string }> | ReactNode;
    isActive?: boolean;
    active?: boolean; // For backward compatibility
    badge?: string | number;
}

export interface NavGroup {
    title?: string;
    heading?: string;
    items: NavItem[];
}

export interface FlashMessages {
    success?: string | null;
    error?: string | null;
    status?: string | null;
}

export interface SharedData {
    name?: string;
    auth: Auth;
    flash?: FlashMessages;
    [key: string]: unknown;
}

export interface AppLayoutProps {
    title?: string;
    subtitle?: string;
    action?: ReactNode;
    breadcrumbs?: BreadcrumbItem[];
}
