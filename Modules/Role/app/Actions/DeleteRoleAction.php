<?php

declare(strict_types=1);

namespace Modules\Role\Actions;

use Spatie\Permission\Models\Role;

final readonly class DeleteRoleAction
{
    /**
     * Delete a role.
     */
    public function handle(Role $role): bool
    {
        return (bool) $role->delete();
    }
}
