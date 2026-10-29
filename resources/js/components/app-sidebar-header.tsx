import { useSidebar } from '@/components/app-shell';
import AppLogo from '@/components/app-logo';
import NavUser from '@/components/nav-user';
import Breadcrumbs from '@/components/breadcrumbs';
import type { BreadcrumbItem } from '@/types';
import type { ReactNode } from 'react';
import { Menu } from 'lucide-react';

interface AppSidebarHeaderProps {
    breadcrumbs?: BreadcrumbItem[];
    children?: ReactNode;
}

export default function AppSidebarHeader({
    breadcrumbs,
    children,
}: AppSidebarHeaderProps) {
    const { toggleSidebar } = useSidebar();

    return (
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-border bg-background/80 px-4 backdrop-blur-md sm:px-6 lg:px-8">
            <div className="flex items-center gap-4">
                <button
                    type="button"
                    onClick={toggleSidebar}
                    className="rounded-lg p-2 text-muted-foreground hover:bg-muted focus:outline-none lg:hidden"
                    aria-label="Toggle sidebar"
                >
                    <Menu className="h-5 w-5" />
                </button>

                <AppLogo />

                {breadcrumbs && breadcrumbs.length > 0 && (
                    <div className="hidden md:block">
                        <Breadcrumbs breadcrumbs={breadcrumbs} />
                    </div>
                )}
            </div>

            <div className="flex items-center gap-3">
                {children}
                <NavUser />
            </div>
        </header>
    );
}
