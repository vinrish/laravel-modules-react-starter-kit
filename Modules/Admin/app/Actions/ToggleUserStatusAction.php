<?php

declare(strict_types=1);

namespace Modules\Admin\Actions;

use Modules\Auth\Models\User;

final readonly class ToggleUserStatusAction
{
    /**
     * Activate or deactivate the specified user.
     */
    public function handle(User $user, bool $isActive): User
    {
        $user->update([
            'is_active' => $isActive,
        ]);

        return $user->refresh();
    }
}
