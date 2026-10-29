import { Head, Link, useForm, router } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import type { AdminUser, Role } from '../../types';
import { ArrowLeft, Save, Shield, Check, Trash2, Power } from 'lucide-react';

interface EditProps {
    user: AdminUser;
    roles: Role[];
}

export default function Edit({ user, roles }: EditProps) {
    const { data, setData, put, processing, errors } = useForm({
        name: user.name || '',
        email: user.email || '',
        password: '',
        password_confirmation: '',
        roles: (user.roles ? user.roles.map((r) => r.name) : []) as string[],
        is_active: Boolean(user.is_active),
    });

    const handleRoleToggle = (roleName: string) => {
        if (data.roles.includes(roleName)) {
            setData(
                'roles',
                data.roles.filter((r) => r !== roleName)
            );
        } else {
            setData('roles', [...data.roles, roleName]);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        put(`/admin/users/${user.id}`);
    };

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

    return (
        <AppLayout
            title={`Edit User: ${user.name}`}
            subtitle="Update user profile information, roles, credentials, and activation state."
            breadcrumbs={[
                { label: 'Admin', href: '/admin/dashboard' },
                { label: 'Users', href: '/admin/users' },
                { label: user.name, href: `/admin/users/${user.id}` },
                { label: 'Edit' },
            ]}
            action={
                <div className="flex items-center gap-2">
                    <Link
                        href={`/admin/users/${user.id}`}
                        className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-card px-3.5 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted focus:outline-hidden"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        <span>View Profile</span>
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
            <Head title={`Edit ${user.name} - Admin`} />

            <div className="mx-auto max-w-3xl space-y-6">
                <form
                    onSubmit={handleSubmit}
                    className="space-y-6 rounded-xl border border-border bg-card p-6 shadow-xs sm:p-8"
                >
                    {/* Basic Info */}
                    <div className="space-y-4">
                        <h3 className="text-base font-semibold text-foreground">
                            Account Information
                        </h3>
                        <p className="text-xs text-muted-foreground">
                            Update profile credentials and contact email.
                        </p>

                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                            {/* Name */}
                            <div className="space-y-1.5">
                                <label
                                    htmlFor="name"
                                    className="text-xs font-medium text-foreground"
                                >
                                    Full Name <span className="text-destructive">*</span>
                                </label>
                                <input
                                    id="name"
                                    type="text"
                                    value={data.name}
                                    onChange={(e) => setData('name', e.target.value)}
                                    placeholder="Full Name"
                                    required
                                    className={`w-full rounded-lg border bg-background px-3.5 py-2 text-sm text-foreground focus:outline-hidden focus:ring-1 ${
                                        errors.name
                                            ? 'border-destructive focus:border-destructive focus:ring-destructive'
                                            : 'border-input focus:border-primary focus:ring-primary'
                                    }`}
                                />
                                {errors.name && (
                                    <p className="text-xs text-destructive">{errors.name}</p>
                                )}
                            </div>

                            {/* Email */}
                            <div className="space-y-1.5">
                                <label
                                    htmlFor="email"
                                    className="text-xs font-medium text-foreground"
                                >
                                    Email Address <span className="text-destructive">*</span>
                                </label>
                                <input
                                    id="email"
                                    type="email"
                                    value={data.email}
                                    onChange={(e) => setData('email', e.target.value)}
                                    placeholder="Email Address"
                                    required
                                    className={`w-full rounded-lg border bg-background px-3.5 py-2 text-sm text-foreground focus:outline-hidden focus:ring-1 ${
                                        errors.email
                                            ? 'border-destructive focus:border-destructive focus:ring-destructive'
                                            : 'border-input focus:border-primary focus:ring-primary'
                                    }`}
                                />
                                {errors.email && (
                                    <p className="text-xs text-destructive">{errors.email}</p>
                                )}
                            </div>
                        </div>

                        {/* Optional Password Change */}
                        <div className="rounded-lg border border-border bg-muted/20 p-4">
                            <p className="text-xs font-semibold text-foreground">
                                Change Password (Optional)
                            </p>
                            <p className="mt-0.5 text-xs text-muted-foreground">
                                Leave blank to maintain the user's current password.
                            </p>

                            <div className="mt-3 grid grid-cols-1 gap-4 sm:grid-cols-2">
                                <div className="space-y-1.5">
                                    <label
                                        htmlFor="password"
                                        className="text-xs font-medium text-foreground"
                                    >
                                        New Password
                                    </label>
                                    <input
                                        id="password"
                                        type="password"
                                        value={data.password}
                                        onChange={(e) => setData('password', e.target.value)}
                                        placeholder="Enter new password"
                                        className={`w-full rounded-lg border bg-background px-3.5 py-2 text-sm text-foreground focus:outline-hidden focus:ring-1 ${
                                            errors.password
                                                ? 'border-destructive focus:border-destructive focus:ring-destructive'
                                                : 'border-input focus:border-primary focus:ring-primary'
                                        }`}
                                    />
                                    {errors.password && (
                                        <p className="text-xs text-destructive">{errors.password}</p>
                                    )}
                                </div>

                                <div className="space-y-1.5">
                                    <label
                                        htmlFor="password_confirmation"
                                        className="text-xs font-medium text-foreground"
                                    >
                                        Confirm New Password
                                    </label>
                                    <input
                                        id="password_confirmation"
                                        type="password"
                                        value={data.password_confirmation}
                                        onChange={(e) =>
                                            setData('password_confirmation', e.target.value)
                                        }
                                        placeholder="Repeat new password"
                                        className={`w-full rounded-lg border bg-background px-3.5 py-2 text-sm text-foreground focus:outline-hidden focus:ring-1 ${
                                            errors.password_confirmation
                                                ? 'border-destructive focus:border-destructive focus:ring-destructive'
                                                : 'border-input focus:border-primary focus:ring-primary'
                                        }`}
                                    />
                                    {errors.password_confirmation && (
                                        <p className="text-xs text-destructive">
                                            {errors.password_confirmation}
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    <hr className="border-border" />

                    {/* Roles Assignment */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-2">
                            <Shield className="h-4 w-4 text-primary" />
                            <h3 className="text-base font-semibold text-foreground">
                                Role Assignment
                            </h3>
                        </div>
                        <p className="text-xs text-muted-foreground">
                            Select the roles assigned to this user to control permissions.
                        </p>

                        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                            {roles.map((role) => {
                                const isChecked = data.roles.includes(role.name);
                                return (
                                    <label
                                        key={role.id}
                                        className={`flex cursor-pointer items-center justify-between rounded-lg border p-3.5 transition-colors ${
                                            isChecked
                                                ? 'border-primary bg-primary/5 text-foreground'
                                                : 'border-border bg-background text-muted-foreground hover:bg-muted/50'
                                        }`}
                                    >
                                        <div className="flex items-center gap-3">
                                            <input
                                                type="checkbox"
                                                checked={isChecked}
                                                onChange={() => handleRoleToggle(role.name)}
                                                className="h-4 w-4 rounded border-input text-primary focus:ring-primary"
                                            />
                                            <div>
                                                <p className="text-sm font-medium capitalize text-foreground">
                                                    {role.name}
                                                </p>
                                                <p className="text-xs text-muted-foreground">
                                                    Guard: {role.guard_name}
                                                </p>
                                            </div>
                                        </div>
                                        {isChecked && <Check className="h-4 w-4 text-primary" />}
                                    </label>
                                );
                            })}
                        </div>
                        {errors.roles && (
                            <p className="text-xs text-destructive">{errors.roles}</p>
                        )}
                    </div>

                    <hr className="border-border" />

                    {/* Account Status */}
                    <div className="space-y-3">
                        <div className="flex items-center justify-between">
                            <h3 className="text-base font-semibold text-foreground">
                                Account Status
                            </h3>
                            <button
                                type="button"
                                onClick={handleToggleStatus}
                                className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:underline"
                            >
                                <Power className="h-3.5 w-3.5" />
                                <span>{user.is_active ? 'Quick Deactivate' : 'Quick Activate'}</span>
                            </button>
                        </div>
                        <label className="flex cursor-pointer items-start gap-3 rounded-lg border border-border bg-background p-4">
                            <input
                                type="checkbox"
                                checked={data.is_active}
                                onChange={(e) => setData('is_active', e.target.checked)}
                                className="mt-0.5 h-4 w-4 rounded border-input text-primary focus:ring-primary"
                            />
                            <div>
                                <p className="text-sm font-medium text-foreground">
                                    Active Account
                                </p>
                                <p className="text-xs text-muted-foreground">
                                    Active users are permitted to authenticate and access platform functions.
                                </p>
                            </div>
                        </label>
                    </div>

                    {/* Form Actions */}
                    <div className="flex items-center justify-end gap-3 pt-4">
                        <Link
                            href="/admin/users"
                            className="rounded-lg border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted"
                        >
                            Cancel
                        </Link>
                        <button
                            type="submit"
                            disabled={processing}
                            className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground shadow-xs transition-colors hover:bg-primary/90 focus:outline-hidden focus:ring-2 focus:ring-primary disabled:opacity-50"
                        >
                            <Save className="h-4 w-4" />
                            <span>{processing ? 'Saving...' : 'Save Changes'}</span>
                        </button>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}
