import type { ReactNode } from 'react';
import type { BreadcrumbItem } from '@/types';
import Breadcrumbs from '@/components/breadcrumbs';

interface HeadingProps {
    title?: string;
    subtitle?: string;
    action?: ReactNode;
    breadcrumbs?: BreadcrumbItem[];
    className?: string;
}

export default function Heading({
    title,
    subtitle,
    action,
    breadcrumbs,
    className = '',
}: HeadingProps) {
    if (!title && !subtitle && !action && (!breadcrumbs || breadcrumbs.length === 0)) {
        return null;
    }

    return (
        <div className={`flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between ${className}`}>
            <div>
                {breadcrumbs && breadcrumbs.length > 0 && (
                    <Breadcrumbs breadcrumbs={breadcrumbs} className="mb-1" />
                )}
                {title && (
                    <h1 className="text-2xl font-bold tracking-tight">
                        {title}
                    </h1>
                )}
                {subtitle && (
                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                        {subtitle}
                    </p>
                )}
            </div>
            {action && <div>{action}</div>}
        </div>
    );
}
