<?php

declare(strict_types=1);

namespace Modules\Admin\Actions;

use Modules\Admin\DataTransferObjects\UserData;
use Modules\Auth\Models\User;

final readonly class UpdateUserAction
{
    /**
     * Update an existing user and synchronize roles.
     */
    public function handle(User $user, UserData $data): User
    {
        $attributes = [
            'name' => $data->name,
            'email' => $data->email,
            'is_active' => $data->isActive,
        ];

        if ($data->password !== null && $data->password !== '') {
            $attributes['password'] = $data->password;
        }

        $user->update($attributes);

        $user->syncRoles($data->roles);

        return $user->refresh();
    }
}
