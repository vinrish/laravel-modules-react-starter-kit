import { usePage } from '@inertiajs/react';
import AppLogo from '@/components/app-logo';
import NavMain from '@/components/nav-main';
import NavUser from '@/components/nav-user';
import type { NavItem, SharedData } from '@/types';

export default function AppHeader() {
    const { auth } = usePage<SharedData>().props;
    const { url } = usePage();
    const user = auth?.user;

    const isAdmin = user?.roles?.includes('admin') ?? false;

    const navItems: NavItem[] = [
        ...(isAdmin
            ? [
                  {
                      title: 'Admin Dashboard',
                      href: '/admin/dashboard',
                      isActive: url.startsWith('/admin'),
                  },
              ]
            : [
                  {
                      title: 'Home',
                      href: '/',
                      isActive: url === '/',
                  },
              ]),
        {
            title: 'Roles',
            href: '/roles',
            isActive: url.startsWith('/roles'),
        },
        {
            title: 'Permissions',
            href: '/permissions',
            isActive: url.startsWith('/permissions'),
        },
    ];

    return (
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-gray-200 bg-white/80 px-4 backdrop-blur-md sm:px-6 lg:px-8 dark:border-gray-800 dark:bg-[#161615]/80">
            <div className="flex items-center gap-6">
                <AppLogo />
                <NavMain
                    items={navItems}
                    className="hidden md:flex md:items-center md:gap-1"
                />
            </div>

            <div className="flex items-center gap-3">
                <NavUser />
            </div>
        </header>
    );
}
