import type { PropsWithChildren } from 'react';
import AppShell from '@/components/app-shell';
import AppSidebar from '@/components/app-sidebar';
import AppSidebarHeader from '@/components/app-sidebar-header';
import AppContent from '@/components/app-content';
import AppFooter from '@/components/app-footer';
import FlashMessage from '@/components/flash-message';
import Heading from '@/components/heading';
import type { AppLayoutProps } from '@/types';

export default function AppSidebarLayout({
    title,
    subtitle,
    action,
    breadcrumbs = [],
    children,
}: PropsWithChildren<AppLayoutProps>) {
    return (
        <AppShell variant="sidebar">
            <AppSidebarHeader />
            <div className="flex flex-1">
                <AppSidebar />
                <div className="flex min-w-0 flex-1 flex-col">
                    <AppContent variant="sidebar">
                        <FlashMessage />
                        <Heading
                            title={title}
                            subtitle={subtitle}
                            action={action}
                            breadcrumbs={breadcrumbs}
                        />
                        {children}
                    </AppContent>
                    <AppFooter />
                </div>
            </div>
        </AppShell>
    );
}
