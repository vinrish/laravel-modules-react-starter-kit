import { Link, router, usePage } from '@inertiajs/react';
import { useState, useRef, useEffect } from 'react';
import type { SharedData } from '@/types';
import { ChevronDown, LogOut, User } from 'lucide-react';

export default function NavUser() {
    const { auth } = usePage<SharedData>().props;
    const user = auth?.user;
    const [open, setOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    const handleLogout = () => {
        router.post('/logout');
    };

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setOpen(false);
            }
        }

        if (open) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [open]);

    if (!user) {
        return (
            <div className="flex items-center gap-2">
                <Link
                    href="/login"
                    className="rounded-lg px-3.5 py-1.5 text-sm font-medium text-foreground hover:bg-muted"
                >
                    Log in
                </Link>
                <Link
                    href="/register"
                    className="rounded-lg bg-primary px-3.5 py-1.5 text-sm font-medium text-primary-foreground hover:bg-primary/90"
                >
                    Register
                </Link>
            </div>
        );
    }

    return (
        <div className="relative" ref={menuRef}>
            <button
                type="button"
                onClick={() => setOpen(!open)}
                className="flex items-center gap-3 rounded-lg p-1.5 transition-colors hover:bg-sidebar-accent focus:outline-none"
                aria-expanded={open}
                aria-label="User menu"
            >
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
                    {user.name ? user.name.charAt(0).toUpperCase() : <User className="h-4 w-4" />}
                </div>
                <div className="hidden flex-col text-left md:flex">
                    <span className="text-sm leading-none font-medium text-sidebar-foreground">
                        {user.name}
                    </span>
                    <span className="mt-0.5 text-xs text-muted-foreground">
                        {user.roles && user.roles.length > 0
                            ? user.roles[0]
                            : user.email}
                    </span>
                </div>
                <ChevronDown
                    className={`hidden h-4 w-4 text-muted-foreground transition-transform md:block ${open ? 'rotate-180' : ''}`}
                />
            </button>

            {open && (
                <div className="absolute right-0 z-50 mt-2 w-56 rounded-xl border border-border bg-popover py-1.5 shadow-lg">
                    <div className="border-b border-border px-4 py-2">
                        <p className="text-xs font-semibold tracking-wider text-muted-foreground uppercase">
                            Signed in as
                        </p>
                        <p className="mt-0.5 truncate text-sm font-medium text-popover-foreground">
                            {user.email}
                        </p>
                        {user.roles && user.roles.length > 0 && (
                            <div className="mt-1.5 flex flex-wrap gap-1">
                                {user.roles.map((r) => (
                                    <span
                                        key={r}
                                        className="rounded bg-muted px-1.5 py-0.5 text-[10px] font-semibold text-muted-foreground uppercase"
                                    >
                                        {r}
                                    </span>
                                ))}
                            </div>
                        )}
                    </div>
                    <button
                        type="button"
                        onClick={handleLogout}
                        className="flex w-full items-center gap-2 px-4 py-2 text-left text-sm text-destructive hover:bg-destructive/10"
                    >
                        <LogOut className="h-4 w-4" />
                        <span>Sign out</span>
                    </button>
                </div>
            )}
        </div>
    );
}
