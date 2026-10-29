import { useState } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import type { AdminUser, PaginatedData, Role, UserFilters, UserStats } from '../../types';
import {
    Users,
    UserCheck,
    UserX,
    Shield,
    Plus,
    Search,
    Filter,
    MoreVertical,
    Eye,
    Edit3,
    Trash2,
    CheckCircle,
    XCircle,
    RotateCcw,
} from 'lucide-react';

interface IndexProps {
    users: PaginatedData<AdminUser>;
    stats: UserStats;
    roles: Role[];
    filters: UserFilters;
}

export default function Index({ users, stats, roles, filters }: IndexProps) {
    const [search, setSearch] = useState(filters.search || '');
    const [selectedRole, setSelectedRole] = useState(filters.role || '');
    const [selectedStatus, setSelectedStatus] = useState(filters.status || '');
    const [activeMenuId, setActiveMenuId] = useState<string | number | null>(null);

    const handleFilterChange = (newFilters: { search?: string; role?: string; status?: string }) => {
        const query: Record<string, string> = {};

        const searchVal = newFilters.search !== undefined ? newFilters.search : search;
        const roleVal = newFilters.role !== undefined ? newFilters.role : selectedRole;
        const statusVal = newFilters.status !== undefined ? newFilters.status : selectedStatus;

        if (searchVal) query.search = searchVal;
        if (roleVal && roleVal !== 'all') query.role = roleVal;
        if (statusVal && statusVal !== 'all') query.status = statusVal;

        router.get('/admin/users', query, {
            preserveState: true,
            preserveScroll: true,
            replace: true,
        });
    };

    const handleSearchSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        handleFilterChange({ search });
    };

    const handleResetFilters = () => {
        setSearch('');
        setSelectedRole('');
        setSelectedStatus('');
        router.get('/admin/users', {}, { preserveState: true, replace: true });
    };

    const handleToggleStatus = (user: AdminUser) => {
        const actionText = user.is_active ? 'deactivate' : 'activate';
        if (window.confirm(`Are you sure you want to ${actionText} ${user.name}?`)) {
            const url = user.is_active
                ? `/admin/users/${user.id}/deactivate`
                : `/admin/users/${user.id}/activate`;

            router.patch(url, {}, {
                preserveScroll: true,
            });
        }
    };

    const handleDeleteUser = (user: AdminUser) => {
        if (window.confirm(`Are you sure you want to permanently delete ${user.name}? This action cannot be undone.`)) {
            router.delete(`/admin/users/${user.id}`, {
                preserveScroll: true,
            });
        }
    };

    const getRoleBadgeClass = (roleName: string) => {
        switch (roleName.toLowerCase()) {
            case 'admin':
                return 'bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300 border-purple-200 dark:border-purple-800';
            case 'teacher':
                return 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300 border-blue-200 dark:border-blue-800';
            case 'student':
                return 'bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300 border-green-200 dark:border-green-800';
            case 'parent':
                return 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300 border-amber-200 dark:border-amber-800';
            default:
                return 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300 border-gray-200 dark:border-gray-700';
        }
    };

    return (
        <AppLayout
            title="User Management"
            subtitle="Manage system accounts, assign roles, and control activation status."
            breadcrumbs={[
                { label: 'Admin', href: '/admin/dashboard' },
                { label: 'Users' },
            ]}
            action={
                <Link
                    href="/admin/users/create"
                    className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow-xs transition-colors hover:bg-primary/90 focus:outline-hidden focus:ring-2 focus:ring-primary"
                >
                    <Plus className="h-4 w-4" />
                    <span>Create User</span>
                </Link>
            }
        >
            <Head title="Users - Admin" />

            <div className="space-y-6">
                {/* Stats Section */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    <div className="flex items-center justify-between rounded-xl border border-border bg-card p-5 shadow-xs">
                        <div>
                            <p className="text-xs font-semibold tracking-wider text-muted-foreground uppercase">
                                Total Users
                            </p>
                            <p className="mt-1.5 text-2xl font-bold text-foreground">
                                {stats?.total_users ?? 0}
                            </p>
                        </div>
                        <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-primary/10 text-primary">
                            <Users className="h-5 w-5" />
                        </div>
                    </div>

                    <div className="flex items-center justify-between rounded-xl border border-border bg-card p-5 shadow-xs">
                        <div>
                            <p className="text-xs font-semibold tracking-wider text-emerald-600 dark:text-emerald-400 uppercase">
                                Active Users
                            </p>
                            <p className="mt-1.5 text-2xl font-bold text-foreground">
                                {stats?.active_users ?? 0}
                            </p>
                        </div>
                        <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600 dark:bg-emerald-950/50 dark:text-emerald-400">
                            <UserCheck className="h-5 w-5" />
                        </div>
                    </div>

                    <div className="flex items-center justify-between rounded-xl border border-border bg-card p-5 shadow-xs">
                        <div>
                            <p className="text-xs font-semibold tracking-wider text-destructive uppercase">
                                Inactive Users
                            </p>
                            <p className="mt-1.5 text-2xl font-bold text-foreground">
                                {stats?.inactive_users ?? 0}
                            </p>
                        </div>
                        <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-destructive/10 text-destructive">
                            <UserX className="h-5 w-5" />
                        </div>
                    </div>

                    <div className="flex items-center justify-between rounded-xl border border-border bg-card p-5 shadow-xs">
                        <div>
                            <p className="text-xs font-semibold tracking-wider text-purple-600 dark:text-purple-400 uppercase">
                                Administrators
                            </p>
                            <p className="mt-1.5 text-2xl font-bold text-foreground">
                                {stats?.admins_count ?? 0}
                            </p>
                        </div>
                        <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-purple-50 text-purple-600 dark:bg-purple-950/50 dark:text-purple-400">
                            <Shield className="h-5 w-5" />
                        </div>
                    </div>
                </div>

                {/* Filters and Controls */}
                <div className="rounded-xl border border-border bg-card p-4 shadow-xs">
                    <form onSubmit={handleSearchSubmit} className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                        <div className="relative flex-1">
                            <Search className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                            <input
                                type="text"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Search users by name or email..."
                                className="w-full rounded-lg border border-input bg-background py-2 pr-4 pl-9 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-hidden focus:ring-1 focus:ring-primary"
                            />
                        </div>

                        <div className="flex flex-wrap items-center gap-2">
                            {/* Role Filter */}
                            <div className="relative">
                                <select
                                    value={selectedRole}
                                    onChange={(e) => {
                                        setSelectedRole(e.target.value);
                                        handleFilterChange({ role: e.target.value });
                                    }}
                                    className="rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground focus:border-primary focus:outline-hidden focus:ring-1 focus:ring-primary"
                                >
                                    <option value="">All Roles</option>
                                    {roles.map((role) => (
                                        <option key={role.id} value={role.name}>
                                            {role.name}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* Status Filter */}
                            <div className="relative">
                                <select
                                    value={selectedStatus}
                                    onChange={(e) => {
                                        setSelectedStatus(e.target.value);
                                        handleFilterChange({ status: e.target.value });
                                    }}
                                    className="rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground focus:border-primary focus:outline-hidden focus:ring-1 focus:ring-primary"
                                >
                                    <option value="">All Statuses</option>
                                    <option value="active">Active</option>
                                    <option value="inactive">Inactive</option>
                                </select>
                            </div>

                            <button
                                type="submit"
                                className="inline-flex items-center gap-1.5 rounded-lg bg-secondary px-3.5 py-2 text-sm font-medium text-secondary-foreground transition-colors hover:bg-secondary/80 focus:outline-hidden"
                            >
                                <Filter className="h-4 w-4" />
                                <span>Filter</span>
                            </button>

                            {(filters.search || filters.role || filters.status) && (
                                <button
                                    type="button"
                                    onClick={handleResetFilters}
                                    className="inline-flex items-center gap-1.5 rounded-lg border border-input bg-background px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
                                >
                                    <RotateCcw className="h-3.5 w-3.5" />
                                    <span>Reset</span>
                                </button>
                            )}
                        </div>
                    </form>
                </div>

                {/* Users Table */}
                <div className="overflow-hidden rounded-xl border border-border bg-card shadow-xs">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm text-foreground">
                            <thead className="border-b border-border bg-muted/50 text-xs font-semibold tracking-wider text-muted-foreground uppercase">
                                <tr>
                                    <th className="px-6 py-3.5">User</th>
                                    <th className="px-6 py-3.5">Roles</th>
                                    <th className="px-6 py-3.5">Status</th>
                                    <th className="px-6 py-3.5">Joined</th>
                                    <th className="px-6 py-3.5 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-border">
                                {users.data.length > 0 ? (
                                    users.data.map((user) => (
                                        <tr
                                            key={user.id}
                                            className="transition-colors hover:bg-muted/30"
                                        >
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
                                                        {user.name.charAt(0).toUpperCase()}
                                                    </div>
                                                    <div className="min-w-0">
                                                        <Link
                                                            href={`/admin/users/${user.id}`}
                                                            className="font-medium text-foreground hover:underline"
                                                        >
                                                            {user.name}
                                                        </Link>
                                                        <p className="truncate text-xs text-muted-foreground">
                                                            {user.email}
                                                        </p>
                                                    </div>
                                                </div>
                                            </td>

                                            <td className="px-6 py-4">
                                                <div className="flex flex-wrap gap-1.5">
                                                    {user.roles && user.roles.length > 0 ? (
                                                        user.roles.map((r) => (
                                                            <span
                                                                key={r.id || r.name}
                                                                className={`inline-flex items-center rounded-md border px-2 py-0.5 text-xs font-medium capitalize ${getRoleBadgeClass(
                                                                    r.name
                                                                )}`}
                                                            >
                                                                {r.name}
                                                            </span>
                                                        ))
                                                    ) : (
                                                        <span className="text-xs text-muted-foreground italic">
                                                            No roles
                                                        </span>
                                                    )}
                                                </div>
                                            </td>

                                            <td className="px-6 py-4">
                                                <button
                                                    type="button"
                                                    onClick={() => handleToggleStatus(user)}
                                                    className={`inline-flex cursor-pointer items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold transition-opacity hover:opacity-80 ${
                                                        user.is_active
                                                            ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300'
                                                            : 'bg-rose-100 text-rose-800 dark:bg-rose-950/60 dark:text-rose-300'
                                                    }`}
                                                    title={`Click to ${user.is_active ? 'deactivate' : 'activate'}`}
                                                >
                                                    {user.is_active ? (
                                                        <>
                                                            <CheckCircle className="h-3.5 w-3.5" />
                                                            <span>Active</span>
                                                        </>
                                                    ) : (
                                                        <>
                                                            <XCircle className="h-3.5 w-3.5" />
                                                            <span>Inactive</span>
                                                        </>
                                                    )}
                                                </button>
                                            </td>

                                            <td className="px-6 py-4 text-xs text-muted-foreground whitespace-nowrap">
                                                {new Date(user.created_at).toLocaleDateString(undefined, {
                                                    year: 'numeric',
                                                    month: 'short',
                                                    day: 'numeric',
                                                })}
                                            </td>

                                            <td className="px-6 py-4 text-right">
                                                <div className="flex items-center justify-end gap-2">
                                                    <Link
                                                        href={`/admin/users/${user.id}`}
                                                        className="rounded-md p-1.5 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                                                        title="View user"
                                                    >
                                                        <Eye className="h-4 w-4" />
                                                    </Link>

                                                    <Link
                                                        href={`/admin/users/${user.id}/edit`}
                                                        className="rounded-md p-1.5 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                                                        title="Edit user"
                                                    >
                                                        <Edit3 className="h-4 w-4" />
                                                    </Link>

                                                    <button
                                                        type="button"
                                                        onClick={() => handleDeleteUser(user)}
                                                        className="rounded-md p-1.5 text-destructive transition-colors hover:bg-destructive/10"
                                                        title="Delete user"
                                                    >
                                                        <Trash2 className="h-4 w-4" />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={5} className="px-6 py-12 text-center text-muted-foreground">
                                            <div className="mx-auto flex max-w-sm flex-col items-center justify-center">
                                                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted">
                                                    <Users className="h-6 w-6 text-muted-foreground" />
                                                </div>
                                                <h3 className="mt-4 text-base font-semibold text-foreground">
                                                    No users found
                                                </h3>
                                                <p className="mt-1 text-sm text-muted-foreground">
                                                    {filters.search || filters.role || filters.status
                                                        ? 'Try adjusting your search or filters to find what you are looking for.'
                                                        : 'Get started by creating your first system user.'}
                                                </p>
                                                <Link
                                                    href="/admin/users/create"
                                                    className="mt-4 inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
                                                >
                                                    <Plus className="h-4 w-4" />
                                                    <span>Create User</span>
                                                </Link>
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    {users.links && users.links.length > 3 && (
                        <div className="flex items-center justify-between border-t border-border bg-muted/20 px-6 py-4">
                            <p className="text-xs text-muted-foreground">
                                Showing <span className="font-semibold text-foreground">{users.from || 0}</span> to{' '}
                                <span className="font-semibold text-foreground">{users.to || 0}</span> of{' '}
                                <span className="font-semibold text-foreground">{users.total}</span> users
                            </p>
                            <div className="flex items-center gap-1">
                                {users.links.map((link, idx) => {
                                    if (!link.url) {
                                        return (
                                            <span
                                                key={idx}
                                                className="rounded-md px-3 py-1.5 text-xs text-muted-foreground opacity-50"
                                                dangerouslySetInnerHTML={{ __html: link.label }}
                                            />
                                        );
                                    }

                                    return (
                                        <Link
                                            key={idx}
                                            href={link.url}
                                            className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${
                                                link.active
                                                    ? 'bg-primary text-primary-foreground'
                                                    : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                                            }`}
                                            dangerouslySetInnerHTML={{ __html: link.label }}
                                        />
                                    );
                                })}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </AppLayout>
    );
}
