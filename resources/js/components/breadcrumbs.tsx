import { Link } from '@inertiajs/react';
import type { BreadcrumbItem } from '@/types';

interface BreadcrumbsProps {
    breadcrumbs?: BreadcrumbItem[];
    className?: string;
}

export default function Breadcrumbs({ breadcrumbs, className = '' }: BreadcrumbsProps) {
    if (!breadcrumbs || breadcrumbs.length === 0) {
        return null;
    }

    return (
        <nav
            aria-label="Breadcrumb"
            className={`flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400 ${className}`}
        >
            {breadcrumbs.map((bc, idx) => {
                const label = bc.title || bc.label || '';
                return (
                    <span
                        key={`${label}-${idx}`}
                        className="flex items-center gap-1.5"
                    >
                        {idx > 0 && <span>/</span>}
                        {bc.href ? (
                            <Link
                                href={bc.href}
                                className="hover:text-gray-800 dark:hover:text-gray-200"
                            >
                                {label}
                            </Link>
                        ) : (
                            <span className="font-medium text-gray-800 dark:text-gray-200">
                                {label}
                            </span>
                        )}
                    </span>
                );
            })}
        </nav>
    );
}
