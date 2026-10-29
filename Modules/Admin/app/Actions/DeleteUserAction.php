<?php

declare(strict_types=1);

namespace Modules\Admin\Actions;

use Modules\Auth\Models\User;

final readonly class DeleteUserAction
{
    /**
     * Delete the specified user.
     */
    public function handle(User $user): bool
    {
        return (bool) $user->delete();
    }
}
