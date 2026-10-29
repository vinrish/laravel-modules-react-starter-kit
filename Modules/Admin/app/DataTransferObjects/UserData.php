<?php

declare(strict_types=1);

namespace Modules\Admin\DataTransferObjects;

use Illuminate\Foundation\Http\FormRequest;

final readonly class UserData
{
    /**
     * @param  array<int, string>  $roles
     */
    public function __construct(
        public string $name,
        public string $email,
        public ?string $password = null,
        public array $roles = [],
        public bool $isActive = true,
    ) {}

    /**
     * Create a DTO instance from a FormRequest.
     */
    public static function fromRequest(FormRequest $request): self
    {
        /** @var array<int, string> $roles */
        $roles = $request->validated('roles', []);

        return new self(
            name: (string) $request->validated('name'),
            email: (string) $request->validated('email'),
            password: $request->validated('password') ? (string) $request->validated('password') : null,
            roles: $roles,
            isActive: (bool) ($request->validated('is_active', true)),
        );
    }

    /**
     * Create a DTO instance from an array.
     *
     * @param  array<string, mixed>  $data
     */
    public static function fromArray(array $data): self
    {
        /** @var array<int, string> $roles */
        $roles = $data['roles'] ?? [];

        return new self(
            name: (string) $data['name'],
            email: (string) $data['email'],
            password: isset($data['password']) ? (string) $data['password'] : null,
            roles: $roles,
            isActive: (bool) ($data['is_active'] ?? true),
        );
    }
}
