import type { PropsWithChildren } from 'react';
import AppShell from '@/components/app-shell';
import AppHeader from '@/components/app-header';
import AppContent from '@/components/app-content';
import AppFooter from '@/components/app-footer';
import FlashMessage from '@/components/flash-message';
import Heading from '@/components/heading';
import type { AppLayoutProps } from '@/types';

export default function AppHeaderLayout({
    title,
    subtitle,
    action,
    breadcrumbs = [],
    children,
}: PropsWithChildren<AppLayoutProps>) {
    return (
        <AppShell variant="header">
            <AppHeader />
            <div className="flex min-h-[calc(100vh-4rem)] flex-1 flex-col">
                <AppContent variant="header">
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
        </AppShell>
    );
}
