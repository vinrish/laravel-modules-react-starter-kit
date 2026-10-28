import type { PropsWithChildren } from 'react';

interface AppContentProps {
    variant?: 'sidebar' | 'header';
    className?: string;
}

export default function AppContent({
    variant = 'sidebar',
    className = '',
    children,
}: PropsWithChildren<AppContentProps>) {
    return (
        <main
            data-variant={variant}
            className={`flex-1 overflow-x-hidden p-4 sm:p-6 lg:p-8 ${className}`}
        >
            <div className="mx-auto max-w-7xl space-y-6">
                {children}
            </div>
        </main>
    );
}
