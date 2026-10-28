import * as React from 'react';
import { cn } from '@/lib/utils';

export function Sidebar({
    className,
    children,
    ...props
}: React.HTMLAttributes<HTMLElement>) {
    return (
        <aside
            data-slot="sidebar"
            className={cn(
                'flex h-full w-64 flex-col border-r border-sidebar-border bg-sidebar text-sidebar-foreground',
                className
            )}
            {...props}
        >
            {children}
        </aside>
    );
}

export function SidebarHeader({
    className,
    children,
    ...props
}: React.HTMLAttributes<HTMLDivElement>) {
    return (
        <div
            data-slot="sidebar-header"
            className={cn('flex flex-col gap-2 p-4', className)}
            {...props}
        >
            {children}
        </div>
    );
}

export function SidebarContent({
    className,
    children,
    ...props
}: React.HTMLAttributes<HTMLDivElement>) {
    return (
        <div
            data-slot="sidebar-content"
            className={cn(
                'flex min-h-0 flex-1 flex-col gap-2 overflow-y-auto px-3 py-2',
                className
            )}
            {...props}
        >
            {children}
        </div>
    );
}

export function SidebarFooter({
    className,
    children,
    ...props
}: React.HTMLAttributes<HTMLDivElement>) {
    return (
        <div
            data-slot="sidebar-footer"
            className={cn('flex flex-col gap-2 p-3 mt-auto border-t border-sidebar-border', className)}
            {...props}
        >
            {children}
        </div>
    );
}

export function SidebarGroup({
    className,
    children,
    ...props
}: React.HTMLAttributes<HTMLDivElement>) {
    return (
        <div
            data-slot="sidebar-group"
            className={cn('relative flex w-full min-w-0 flex-col p-1.5', className)}
            {...props}
        >
            {children}
        </div>
    );
}

export function SidebarGroupLabel({
    className,
    children,
    ...props
}: React.HTMLAttributes<HTMLDivElement>) {
    return (
        <div
            data-slot="sidebar-group-label"
            className={cn(
                'flex h-7 shrink-0 items-center px-2 text-xs font-semibold tracking-wider text-muted-foreground uppercase',
                className
            )}
            {...props}
        >
            {children}
        </div>
    );
}

export function SidebarGroupContent({
    className,
    children,
    ...props
}: React.HTMLAttributes<HTMLDivElement>) {
    return (
        <div
            data-slot="sidebar-group-content"
            className={cn('w-full space-y-1', className)}
            {...props}
        >
            {children}
        </div>
    );
}

export function SidebarMenu({
    className,
    children,
    ...props
}: React.HTMLAttributes<HTMLUListElement>) {
    return (
        <ul
            data-slot="sidebar-menu"
            className={cn('flex w-full min-w-0 flex-col gap-1', className)}
            {...props}
        >
            {children}
        </ul>
    );
}

export function SidebarMenuItem({
    className,
    children,
    ...props
}: React.HTMLAttributes<HTMLLIElement>) {
    return (
        <li
            data-slot="sidebar-menu-item"
            className={cn('group/menu-item relative list-none', className)}
            {...props}
        >
            {children}
        </li>
    );
}

export interface SidebarMenuButtonProps
    extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
    isActive?: boolean;
    size?: 'default' | 'sm' | 'lg';
}

export function SidebarMenuButton({
    className,
    isActive = false,
    size = 'default',
    children,
    ...props
}: SidebarMenuButtonProps) {
    return (
        <a
            data-slot="sidebar-menu-button"
            data-active={isActive}
            className={cn(
                'flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors outline-none',
                size === 'sm' && 'h-8 text-xs px-2',
                size === 'default' && 'h-9 px-3',
                size === 'lg' && 'h-10 px-3.5 text-base',
                isActive
                    ? 'bg-sidebar-accent font-semibold text-sidebar-accent-foreground'
                    : 'text-sidebar-foreground/80 hover:bg-sidebar-accent/60 hover:text-sidebar-accent-foreground',
                className
            )}
            {...props}
        >
            {children}
        </a>
    );
}

export function SidebarSeparator({
    className,
    ...props
}: React.HTMLAttributes<HTMLDivElement>) {
    return (
        <div
            data-slot="sidebar-separator"
            className={cn('my-2 -mx-1 h-px bg-sidebar-border', className)}
            {...props}
        />
    );
}
