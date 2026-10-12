<?php

declare(strict_types=1);

namespace Modules\Role\Http\Controllers;

use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;
use Modules\Role\Actions\CreateRoleAction;
use Modules\Role\Actions\DeleteRoleAction;
use Modules\Role\Actions\UpdateRoleAction;
use Modules\Role\DataTransferObjects\RoleData;
use Modules\Role\Http\Requests\StoreRoleRequest;
use Modules\Role\Http\Requests\UpdateRoleRequest;
use Modules\Role\Services\PermissionService;
use Modules\Role\Services\RoleService;
use Spatie\Permission\Models\Role;

final readonly class RoleController
{
    public function __construct(
        private RoleService $roleService,
        private PermissionService $permissionService,
    ) {}

    /**
     * Display a listing of the roles.
     */
    public function index(): Response
    {
        return Inertia::render('Role/Index', [
            'roles' => $this->roleService->getAllRolesWithPermissions(),
            'permissions' => $this->permissionService->getAllPermissions(),
        ]);
    }

    /**
     * Show the form for creating a new role.
     */
    public function create(): Response
    {
        return Inertia::render('Role/Create', [
            'permissions' => $this->permissionService->getAllPermissions(),
        ]);
    }

    /**
     * Store a newly created role.
     */
    public function store(
        StoreRoleRequest $request,
        CreateRoleAction $action,
    ): RedirectResponse {
        $action->handle(RoleData::fromRequest($request));

        return to_route('roles.index')
            ->with('success', 'Role created successfully.');
    }

    /**
     * Display the specified role.
     */
    public function show(Role $role): Response
    {
        $role->load(['permissions', 'users']);

        return Inertia::render('Role/Show', [
            'role' => $role,
        ]);
    }

    /**
     * Show the form for editing the specified role.
     */
    public function edit(Role $role): Response
    {
        $role->load('permissions');

        return Inertia::render('Role/Edit', [
            'role' => $role,
            'permissions' => $this->permissionService->getAllPermissions(),
        ]);
    }

    /**
     * Update the specified role.
     */
    public function update(
        UpdateRoleRequest $request,
        Role $role,
        UpdateRoleAction $action,
    ): RedirectResponse {
        $action->handle($role, RoleData::fromRequest($request));

        return to_route('roles.index')
            ->with('success', 'Role updated successfully.');
    }

    /**
     * Remove the specified role.
     */
    public function destroy(
        Role $role,
        DeleteRoleAction $action,
    ): RedirectResponse {
        $action->handle($role);

        return to_route('roles.index')
            ->with('success', 'Role deleted successfully.');
    }
}
