import { usePage } from '@inertiajs/react';
import type { SharedData } from '@/types';

interface AppFooterProps {
    className?: string;
}

export default function AppFooter({ className = '' }: AppFooterProps) {
    const { name } = usePage<SharedData>().props;
    const currentYear = new Date().getFullYear();
    const appName = name || 'Laravel Starter Kit';

    return (
        <footer
            className={`border-t border-border bg-background/50 px-4 py-4 sm:px-6 lg:px-8 text-xs text-muted-foreground ${className}`}
        >
            <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 sm:flex-row">
                <p>
                    &copy; {currentYear} {appName}. All rights reserved.
                </p>
                <div className="flex items-center gap-4">
                    <a
                        href="https://laravel.com/docs"
                        target="_blank"
                        rel="noreferrer"
                        className="transition-colors hover:text-foreground"
                    >
                        Documentation
                    </a>
                    <a
                        href="https://github.com"
                        target="_blank"
                        rel="noreferrer"
                        className="transition-colors hover:text-foreground"
                    >
                        Support
                    </a>
                </div>
            </div>
        </footer>
    );
}
