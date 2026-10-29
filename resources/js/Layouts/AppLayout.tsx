import type { PropsWithChildren } from 'react';
import AppLayoutTemplate from '@/Layouts/app/app-sidebar-layout';
import type { AppLayoutProps } from '@/types';

export default function AppLayout({
    title,
    subtitle,
    action,
    breadcrumbs = [],
    children,
}: PropsWithChildren<AppLayoutProps>) {
    return (
        <AppLayoutTemplate
            title={title}
            subtitle={subtitle}
            action={action}
            breadcrumbs={breadcrumbs}
        >
            {children}
        </AppLayoutTemplate>
    );
}

export type { AppLayoutProps };
