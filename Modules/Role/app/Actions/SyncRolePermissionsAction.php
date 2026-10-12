<?php

declare(strict_types=1);

namespace Modules\Role\Actions;

use Spatie\Permission\Models\Role;

final readonly class SyncRolePermissionsAction
{
    /**
     * Synchronize permissions for a given role.
     *
     * @param  array<int, string>  $permissions
     */
    public function handle(Role $role, array $permissions): Role
    {
        $role->syncPermissions($permissions);

        return $role;
    }
}
