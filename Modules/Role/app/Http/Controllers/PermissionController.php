<?php

declare(strict_types=1);

namespace Modules\Role\Http\Controllers;

use Inertia\Inertia;
use Inertia\Response;
use Modules\Role\Services\PermissionService;

final readonly class PermissionController
{
    public function __construct(
        private PermissionService $permissionService,
    ) {}

    /**
     * Display a listing of permissions.
     */
    public function index(): Response
    {
        return Inertia::render('Role/Permissions/Index', [
            'permissions' => $this->permissionService->getAllPermissions(),
        ]);
    }
}
