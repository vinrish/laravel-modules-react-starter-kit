import { Link } from '@inertiajs/react';
import type { NavGroup, NavItem } from '@/types';
import { isValidElement, type ComponentType, type ReactNode } from 'react';
import {
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuItem,
} from '@/components/ui/sidebar';

interface NavMainProps {
    items?: NavItem[];
    groups?: NavGroup[];
    onItemClick?: () => void;
    className?: string;
}

export default function NavMain({
    items,
    groups,
    onItemClick,
    className = 'space-y-4',
}: NavMainProps) {
    const renderIcon = (icon?: NavItem['icon'], isActive?: boolean) => {
        if (!icon) return null;

        if (isValidElement(icon)) {
            return (
                <span
                    className={`flex h-4 w-4 shrink-0 items-center justify-center transition-colors ${
                        isActive ? 'text-sidebar-accent-foreground' : 'text-muted-foreground'
                    }`}
                >
                    {icon}
                </span>
            );
        }

        const IconComponent = icon as ComponentType<{ className?: string }>;
        return <IconComponent className="h-4 w-4 shrink-0 transition-colors" />;
    };

    const renderItem = (item: NavItem) => {
        const title = item.title || item.name || '';
        const active = item.isActive ?? item.active ?? false;

        return (
            <SidebarMenuItem key={`${title}-${item.href}`}>
                <Link
                    href={item.href}
                    onClick={onItemClick}
                    className={`flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors outline-none ${
                        active
                            ? 'bg-sidebar-accent font-semibold text-sidebar-accent-foreground shadow-xs'
                            : 'text-sidebar-foreground/80 hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground'
                    }`}
                >
                    {renderIcon(item.icon, active)}
                    <span className="truncate">{title}</span>
                    {item.badge !== undefined && (
                        <span className="ml-auto flex h-5 min-w-5 items-center justify-center rounded-full bg-sidebar-primary/10 px-1.5 text-[11px] font-semibold text-sidebar-primary">
                            {item.badge}
                        </span>
                    )}
                </Link>
            </SidebarMenuItem>
        );
    };

    return (
        <nav className={className}>
            {items && items.length > 0 && (
                <SidebarGroup className="p-0">
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {items.map(renderItem)}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            )}

            {groups &&
                groups.map((group, groupIdx) => {
                    const heading = group.heading || group.title;
                    return (
                        <SidebarGroup key={heading || `group-${groupIdx}`} className="p-0">
                            {heading && (
                                <SidebarGroupLabel className="px-3">
                                    {heading}
                                </SidebarGroupLabel>
                            )}
                            <SidebarGroupContent>
                                <SidebarMenu>
                                    {group.items.map(renderItem)}
                                </SidebarMenu>
                            </SidebarGroupContent>
                        </SidebarGroup>
                    );
                })}
        </nav>
    );
}
