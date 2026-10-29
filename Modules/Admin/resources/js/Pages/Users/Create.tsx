import { Head, Link, useForm } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import type { Role } from '../../types';
import { ArrowLeft, UserPlus, Shield, Check } from 'lucide-react';

interface CreateProps {
    roles: Role[];
}

export default function Create({ roles }: CreateProps) {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
        roles: [] as string[],
        is_active: true,
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
        post('/admin/users');
    };

    return (
        <AppLayout
            title="Create New User"
            subtitle="Add a new user account and configure permissions."
            breadcrumbs={[
                { label: 'Admin', href: '/admin/dashboard' },
                { label: 'Users', href: '/admin/users' },
                { label: 'Create' },
            ]}
            action={
                <Link
                    href="/admin/users"
                    className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-card px-3.5 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted focus:outline-hidden"
                >
                    <ArrowLeft className="h-4 w-4" />
                    <span>Back to Users</span>
                </Link>
            }
        >
            <Head title="Create User - Admin" />

            <div className="mx-auto max-w-3xl">
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
                            Enter the basic identification and login details for this user.
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
                                    placeholder="e.g. Jane Doe"
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
                                    placeholder="e.g. jane@example.com"
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

                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                            {/* Password */}
                            <div className="space-y-1.5">
                                <label
                                    htmlFor="password"
                                    className="text-xs font-medium text-foreground"
                                >
                                    Password <span className="text-destructive">*</span>
                                </label>
                                <input
                                    id="password"
                                    type="password"
                                    value={data.password}
                                    onChange={(e) => setData('password', e.target.value)}
                                    placeholder="Minimum 8 characters"
                                    required
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

                            {/* Password Confirmation */}
                            <div className="space-y-1.5">
                                <label
                                    htmlFor="password_confirmation"
                                    className="text-xs font-medium text-foreground"
                                >
                                    Confirm Password <span className="text-destructive">*</span>
                                </label>
                                <input
                                    id="password_confirmation"
                                    type="password"
                                    value={data.password_confirmation}
                                    onChange={(e) =>
                                        setData('password_confirmation', e.target.value)
                                    }
                                    placeholder="Repeat password"
                                    required
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
                            Select one or more roles to define system permissions for this user.
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
                        <h3 className="text-base font-semibold text-foreground">
                            Account Status
                        </h3>
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
                                    When active, the user will be able to log in and use system features immediately.
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
                            <UserPlus className="h-4 w-4" />
                            <span>{processing ? 'Creating...' : 'Create User'}</span>
                        </button>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}
