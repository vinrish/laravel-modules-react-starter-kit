<?php

declare(strict_types=1);

namespace Modules\Admin\Actions;

use Modules\Admin\DataTransferObjects\UserData;
use Modules\Auth\Models\User;

final readonly class CreateUserAction
{
    /**
     * Create a new user and assign roles.
     */
    public function handle(UserData $data): User
    {
        /** @var User $user */
        $user = User::create([
            'name' => $data->name,
            'email' => $data->email,
            'password' => $data->password ?? 'password',
            'is_active' => $data->isActive,
            'email_verified_at' => now(),
        ]);

        if ($data->roles !== []) {
            $user->syncRoles($data->roles);
        }

        return $user;
    }
}
