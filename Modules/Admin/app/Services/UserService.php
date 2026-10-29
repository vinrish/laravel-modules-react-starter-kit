<?php

declare(strict_types=1);

namespace Modules\Admin\Services;

use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Collection;
use Modules\Auth\Models\User;
use Modules\Role\Enums\RoleName;
use Spatie\Permission\Models\Role;

final readonly class UserService
{
    /**
     * Get paginated users with filtering and search.
     *
     * @param  array{search?: ?string, role?: ?string, status?: ?string}  $filters
     * @return LengthAwarePaginator<User>
     */
    public function getPaginatedUsers(array $filters = [], int $perPage = 10): LengthAwarePaginator
    {
        $search = $filters['search'] ?? null;
        $role = $filters['role'] ?? null;
        $status = $filters['status'] ?? null;

        return User::query()
            ->with('roles')
            ->when($search, function (Builder $query, string $search): void {
                $query->where(function (Builder $q) use ($search): void {
                    $q->where('name', 'like', "%{$search}%")
                        ->orWhere('email', 'like', "%{$search}%");
                });
            })
            ->when($role, function (Builder $query, string $role): void {
                $query->role($role);
            })
            ->when($status !== null && $status !== '' && $status !== 'all', function (Builder $query) use ($status): void {
                if ($status === 'active') {
                    $query->where('is_active', true);
                } elseif ($status === 'inactive') {
                    $query->where('is_active', false);
                }
            })
            ->latest('id')
            ->paginate($perPage)
            ->withQueryString();
    }

    /**
     * Get user statistics for dashboards and index views.
     *
     * @return array{
     *     total_users: int,
     *     active_users: int,
     *     inactive_users: int,
     *     admins_count: int,
     *     teachers_count: int,
     *     students_count: int,
     *     parents_count: int
     * }
     */
    public function getUserStats(): array
    {
        return [
            'total_users' => User::query()->count(),
            'active_users' => User::query()->where('is_active', true)->count(),
            'inactive_users' => User::query()->where('is_active', false)->count(),
            'admins_count' => User::query()->role(RoleName::Admin->value)->count(),
            'teachers_count' => User::query()->role(RoleName::Teacher->value)->count(),
            'students_count' => User::query()->role(RoleName::Student->value)->count(),
            'parents_count' => User::query()->role(RoleName::Parent->value)->count(),
        ];
    }

    /**
     * Get all available roles for user assignment.
     *
     * @return Collection<int, Role>
     */
    public function getAllRoles(): Collection
    {
        return Role::query()->orderBy('name')->get();
    }
}
