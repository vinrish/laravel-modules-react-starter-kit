import { Head, Link, router } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import type { AdminUser } from '../../types';
import {
    ArrowLeft,
    Edit3,
    Trash2,
    Shield,
    Key,
    Mail,
    Calendar,
    CheckCircle,
    XCircle,
    Power,
    UserCheck,
} from 'lucide-react';

interface ShowProps {
    user: AdminUser;
}

export default function Show({ user }: ShowProps) {
    const handleToggleStatus = () => {
        const actionText = user.is_active ? 'deactivate' : 'activate';
        if (window.confirm(`Are you sure you want to ${actionText} ${user.name}?`)) {
            const url = user.is_active
                ? `/admin/users/${user.id}/deactivate`
                : `/admin/users/${user.id}/activate`;

            router.patch(url, {}, { preserveScroll: true });
        }
    };

    const handleDelete = () => {
        if (
            window.confirm(
                `Are you sure you want to delete ${user.name}? This action cannot be undone.`
            )
        ) {
            router.delete(`/admin/users/${user.id}`);
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

    // Collect all permissions through roles
    const allPermissions = [
        ...(user.permissions || []),
        ...(user.roles?.flatMap((r) => r.permissions || []) || []),
    ];
    // Deduplicate permissions by name
    const uniquePermissions = Array.from(
        new Map(allPermissions.map((p) => [p.name, p])).values()
    );

    return (
        <AppLayout
            title={`User Details: ${user.name}`}
            subtitle="View detailed account settings, assigned roles, and security permissions."
            breadcrumbs={[
                { label: 'Admin', href: '/admin/dashboard' },
                { label: 'Users', href: '/admin/users' },
                { label: user.name },
            ]}
            action={
                <div className="flex flex-wrap items-center gap-2">
                    <Link
                        href="/admin/users"
                        className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-card px-3.5 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted focus:outline-hidden"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        <span>Back</span>
                    </Link>
                    <button
                        type="button"
                        onClick={handleToggleStatus}
                        className={`inline-flex items-center gap-1.5 rounded-lg px-3.5 py-2 text-sm font-medium transition-colors ${
                            user.is_active
                                ? 'border border-amber-200 bg-amber-50 text-amber-700 hover:bg-amber-100 dark:border-amber-800 dark:bg-amber-950/40 dark:text-amber-300'
                                : 'border border-emerald-200 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 dark:border-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-300'
                        }`}
                    >
                        <Power className="h-4 w-4" />
                        <span>{user.is_active ? 'Deactivate' : 'Activate'}</span>
                    </button>
                    <Link
                        href={`/admin/users/${user.id}/edit`}
                        className="inline-flex items-center gap-1.5 rounded-lg bg-primary px-3.5 py-2 text-sm font-semibold text-primary-foreground shadow-xs transition-colors hover:bg-primary/90 focus:outline-hidden"
                    >
                        <Edit3 className="h-4 w-4" />
                        <span>Edit User</span>
                    </Link>
                    <button
                        type="button"
                        onClick={handleDelete}
                        className="inline-flex items-center gap-1.5 rounded-lg border border-destructive/20 bg-destructive/10 px-3.5 py-2 text-sm font-medium text-destructive transition-colors hover:bg-destructive/20 focus:outline-hidden"
                    >
                        <Trash2 className="h-4 w-4" />
                        <span>Delete</span>
                    </button>
                </div>
            }
        >
            <Head title={`${user.name} - User Profile`} />

            <div className="space-y-6">
                {/* Profile Overview Card */}
                <div className="rounded-xl border border-border bg-card p-6 shadow-xs sm:p-8">
                    <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
                        <div className="flex items-center gap-5">
                            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-2xl font-bold text-primary">
                                {user.name.charAt(0).toUpperCase()}
                            </div>
                            <div>
                                <div className="flex flex-wrap items-center gap-2">
                                    <h2 className="text-xl font-bold text-foreground">
                                        {user.name}
                                    </h2>
                                    <span
                                        className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                                            user.is_active
                                                ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300'
                                                : 'bg-rose-100 text-rose-800 dark:bg-rose-950/60 dark:text-rose-300'
                                        }`}
                                    >
                                        {user.is_active ? (
                                            <>
                                                <CheckCircle className="h-3 w-3" />
                                                <span>Active</span>
                                            </>
                                        ) : (
                                            <>
                                                <XCircle className="h-3 w-3" />
                                                <span>Inactive</span>
                                            </>
                                        )}
                                    </span>
                                </div>
                                <div className="mt-1 flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
                                    <span className="flex items-center gap-1">
                                        <Mail className="h-3.5 w-3.5" />
                                        {user.email}
                                    </span>
                                    <span className="flex items-center gap-1">
                                        <Calendar className="h-3.5 w-3.5" />
                                        Joined {new Date(user.created_at).toLocaleDateString()}
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-wrap items-center gap-2">
                            {user.roles && user.roles.length > 0 ? (
                                user.roles.map((r) => (
                                    <span
                                        key={r.id || r.name}
                                        className={`inline-flex items-center rounded-md border px-2.5 py-1 text-xs font-semibold capitalize ${getRoleBadgeClass(
                                            r.name
                                        )}`}
                                    >
                                        {r.name}
                                    </span>
                                ))
                            ) : (
                                <span className="text-xs text-muted-foreground italic">
                                    No roles assigned
                                </span>
                            )}
                        </div>
                    </div>
                </div>

                {/* Details Grid */}
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                    {/* Roles & Authorization */}
                    <div className="space-y-4 rounded-xl border border-border bg-card p-6 shadow-xs">
                        <div className="flex items-center gap-2">
                            <Shield className="h-5 w-5 text-primary" />
                            <h3 className="text-base font-semibold text-foreground">
                                Assigned Roles
                            </h3>
                        </div>
                        <p className="text-xs text-muted-foreground">
                            Roles determine the overall level of access and administrative duties for this user.
                        </p>

                        <div className="space-y-2">
                            {user.roles && user.roles.length > 0 ? (
                                user.roles.map((r) => (
                                    <div
                                        key={r.id || r.name}
                                        className="flex items-center justify-between rounded-lg border border-border bg-muted/20 p-3"
                                    >
                                        <div>
                                            <p className="text-sm font-medium capitalize text-foreground">
                                                {r.name}
                                            </p>
                                            <p className="text-xs text-muted-foreground">
                                                Guard: {r.guard_name}
                                            </p>
                                        </div>
                                        <span
                                            className={`rounded-md border px-2 py-0.5 text-xs font-medium capitalize ${getRoleBadgeClass(
                                                r.name
                                            )}`}
                                        >
                                            {r.name}
                                        </span>
                                    </div>
                                ))
                            ) : (
                                <div className="rounded-lg border border-dashed border-border p-6 text-center text-xs text-muted-foreground">
                                    No roles have been assigned to this user yet.
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Permissions Overview */}
                    <div className="space-y-4 rounded-xl border border-border bg-card p-6 shadow-xs">
                        <div className="flex items-center gap-2">
                            <Key className="h-5 w-5 text-primary" />
                            <h3 className="text-base font-semibold text-foreground">
                                Granted Permissions
                            </h3>
                        </div>
                        <p className="text-xs text-muted-foreground">
                            All permissions granted to this user directly or through assigned roles.
                        </p>

                        {uniquePermissions.length > 0 ? (
                            <div className="flex flex-wrap gap-2">
                                {uniquePermissions.map((p) => (
                                    <span
                                        key={p.id || p.name}
                                        className="inline-flex items-center rounded-md border border-border bg-muted/50 px-2.5 py-1 text-xs font-medium text-foreground"
                                    >
                                        {p.name}
                                    </span>
                                ))}
                            </div>
                        ) : (
                            <div className="rounded-lg border border-dashed border-border p-6 text-center text-xs text-muted-foreground">
                                No direct or inherited permissions associated with this account.
                            </div>
                        )}
                    </div>
                </div>

                {/* Technical / Meta Card */}
                <div className="rounded-xl border border-border bg-card p-6 shadow-xs">
                    <h3 className="text-base font-semibold text-foreground">
                        Account Metadata & Security
                    </h3>
                    <div className="mt-4 grid grid-cols-1 gap-4 text-xs sm:grid-cols-2 lg:grid-cols-4">
                        <div className="rounded-lg border border-border bg-muted/20 p-3">
                            <p className="text-muted-foreground">User ID (UUID)</p>
                            <p className="mt-1 font-mono text-foreground">{user.id}</p>
                        </div>
                        <div className="rounded-lg border border-border bg-muted/20 p-3">
                            <p className="text-muted-foreground">Email Verification</p>
                            <p className="mt-1 font-semibold text-foreground">
                                {user.email_verified_at ? (
                                    <span className="text-emerald-600 dark:text-emerald-400">
                                        Verified ({new Date(user.email_verified_at).toLocaleDateString()})
                                    </span>
                                ) : (
                                    <span className="text-amber-600 dark:text-amber-400">
                                        Unverified
                                    </span>
                                )}
                            </p>
                        </div>
                        <div className="rounded-lg border border-border bg-muted/20 p-3">
                            <p className="text-muted-foreground">Created At</p>
                            <p className="mt-1 text-foreground">
                                {new Date(user.created_at).toLocaleString()}
                            </p>
                        </div>
                        <div className="rounded-lg border border-border bg-muted/20 p-3">
                            <p className="text-muted-foreground">Last Updated</p>
                            <p className="mt-1 text-foreground">
                                {new Date(user.updated_at).toLocaleString()}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
