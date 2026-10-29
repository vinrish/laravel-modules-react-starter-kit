import { usePage } from '@inertiajs/react';
import type { SharedData } from '@/types';

export default function FlashMessage() {
    const { flash } = usePage<SharedData>().props;

    if (!flash?.success && !flash?.error && !flash?.status) {
        return null;
    }

    return (
        <div className="space-y-3">
            {flash.success && (
                <div className="flex items-center justify-between rounded-xl border border-green-200 bg-green-50 p-4 text-sm text-green-800 dark:border-green-900 dark:bg-green-950/40 dark:text-green-300">
                    <div className="flex items-center gap-2">
                        <svg
                            className="h-5 w-5 shrink-0 text-green-600 dark:text-green-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M5 13l4 4L19 7"
                            />
                        </svg>
                        <span>{flash.success}</span>
                    </div>
                </div>
            )}
            {flash.error && (
                <div className="flex items-center justify-between rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-800 dark:border-red-900 dark:bg-red-950/40 dark:text-red-300">
                    <div className="flex items-center gap-2">
                        <svg
                            className="h-5 w-5 shrink-0 text-red-600 dark:text-red-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                        <span>{flash.error}</span>
                    </div>
                </div>
            )}
            {flash.status && (
                <div className="flex items-center justify-between rounded-xl border border-blue-200 bg-blue-50 p-4 text-sm text-blue-800 dark:border-blue-900 dark:bg-blue-950/40 dark:text-blue-300">
                    <div className="flex items-center gap-2">
                        <svg
                            className="h-5 w-5 shrink-0 text-blue-600 dark:text-blue-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                        </svg>
                        <span>{flash.status}</span>
                    </div>
                </div>
            )}
        </div>
    );
}
