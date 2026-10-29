import { router, usePage } from '@inertiajs/react';
import type { SharedData } from '@/types';
import { LogOut, User } from 'lucide-react';

export default function NavFooter() {
    const { auth } = usePage<SharedData>().props;
    const user = auth?.user;

    const handleLogout = () => {
        router.post('/logout');
    };

    if (!user) {
        return null;
    }

    return (
        <div className="flex flex-col gap-2">
            <div className="flex items-center gap-3 px-2 py-1">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary">
                    {user.name ? user.name.charAt(0).toUpperCase() : <User className="h-4 w-4" />}
                </div>
                <div className="flex min-w-0 flex-1 flex-col text-left">
                    <span className="truncate text-xs font-medium text-sidebar-foreground">
                        {user.name}
                    </span>
                    <span className="truncate text-[11px] text-muted-foreground">
                        {user.email}
                    </span>
                </div>
            </div>
            <button
                type="button"
                onClick={handleLogout}
                className="flex w-full items-center gap-2.5 rounded-lg px-2.5 py-2 text-sm font-medium text-destructive transition-colors hover:bg-destructive/10 cursor-pointer"
            >
                <LogOut className="h-4 w-4 shrink-0" />
                <span>Sign out</span>
            </button>
        </div>
    );
}
