import { usePage } from '@inertiajs/react';
import { useSidebar } from '@/components/app-shell';
import NavMain from '@/components/nav-main';
import NavFooter from '@/components/nav-footer';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
} from '@/components/ui/sidebar';
import type { NavGroup, NavItem, SharedData } from '@/types';
import {
    LayoutDashboard,
    Users,
    ShieldCheck,
    KeyRound,
    Settings,
    X,
} from 'lucide-react';

export default function AppSidebar() {
    const { auth } = usePage<SharedData>().props;
    const { url } = usePage();
    const { isOpen, setIsOpen } = useSidebar();
    const user = auth?.user;

    const isAdmin = user?.roles?.includes('admin') ?? false;

    const mainItems: NavItem[] = [
        ...(isAdmin
            ? [
                  {
                      title: 'Admin Dashboard',
                      href: '/admin/dashboard',
                      icon: LayoutDashboard,
                      isActive: url.startsWith('/admin/dashboard') || url === '/admin',
                  },
              ]
            : [
                  {
                      title: 'Dashboard',
                      href: '/',
                      icon: LayoutDashboard,
                      isActive: url === '/',
                  },
              ]),
    ];

    const navGroups: NavGroup[] = [
        {
            heading: 'Accounts',
            items: [
                {
                    title: 'Users',
                    href: '/users',
                    icon: Users,
                    isActive: url.startsWith('/users') || url.startsWith('/admin/users'),
                },
            ],
        },
        {
            heading: 'Settings',
            items: [
                {
                    title: 'Roles',
                    href: '/roles',
                    icon: ShieldCheck,
                    isActive: url.startsWith('/roles'),
                },
                {
                    title: 'Permissions',
                    href: '/permissions',
                    icon: KeyRound,
                    isActive: url.startsWith('/permissions'),
                },
                {
                    title: 'System Settings',
                    href: '/settings',
                    icon: Settings,
                    isActive: url.startsWith('/settings') || url.startsWith('/admin/settings'),
                },
            ],
        },
    ];

    return (
        <>
            {/* Mobile Sidebar Overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 z-40 bg-black/50 backdrop-blur-xs transition-opacity lg:hidden"
                    onClick={() => setIsOpen(false)}
                />
            )}

            {/* Sidebar Navigation */}
            <Sidebar
                className={`fixed inset-y-0 left-0 z-50 flex flex-col pt-16 transition-transform duration-200 ease-in-out lg:sticky lg:top-16 lg:h-[calc(100vh-4rem)] lg:pt-0 lg:translate-x-0 ${
                    isOpen ? 'translate-x-0' : '-translate-x-full'
                }`}
            >
                {/* Mobile Header */}
                <div className="flex items-center justify-between border-b border-sidebar-border p-4 lg:hidden">
                    <span className="text-sm font-semibold tracking-wider text-muted-foreground uppercase">
                        Navigation
                    </span>
                    <button
                        type="button"
                        onClick={() => setIsOpen(false)}
                        className="rounded-lg p-1.5 text-muted-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus:outline-none"
                        aria-label="Close sidebar"
                    >
                        <X className="h-5 w-5" />
                    </button>
                </div>

                <SidebarContent>
                    <NavMain
                        items={mainItems}
                        groups={navGroups}
                        onItemClick={() => setIsOpen(false)}
                    />
                </SidebarContent>

                <SidebarFooter>
                    <NavFooter />
                </SidebarFooter>
            </Sidebar>
        </>
    );
}
