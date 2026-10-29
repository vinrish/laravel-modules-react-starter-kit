<?php

declare(strict_types=1);

namespace Modules\Admin\Http\Controllers;

use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Modules\Admin\Actions\CreateUserAction;
use Modules\Admin\Actions\DeleteUserAction;
use Modules\Admin\Actions\ToggleUserStatusAction;
use Modules\Admin\Actions\UpdateUserAction;
use Modules\Admin\DataTransferObjects\UserData;
use Modules\Admin\Http\Requests\StoreUserRequest;
use Modules\Admin\Http\Requests\UpdateUserRequest;
use Modules\Admin\Services\UserService;
use Modules\Auth\Models\User;

final readonly class UserController
{
    public function __construct(
        private UserService $userService,
    ) {}

    /**
     * Display a listing of users.
     */
    public function index(Request $request): Response
    {
        /** @var array{search?: ?string, role?: ?string, status?: ?string} $filters */
        $filters = [
            'search' => $request->query('search'),
            'role' => $request->query('role'),
            'status' => $request->query('status'),
        ];

        return Inertia::render('Admin/Users/Index', [
            'users' => $this->userService->getPaginatedUsers($filters),
            'stats' => $this->userService->getUserStats(),
            'roles' => $this->userService->getAllRoles(),
            'filters' => $filters,
        ]);
    }

    /**
     * Show the form for creating a new user.
     */
    public function create(): Response
    {
        return Inertia::render('Admin/Users/Create', [
            'roles' => $this->userService->getAllRoles(),
        ]);
    }

    /**
     * Store a newly created user in storage.
     */
    public function store(
        StoreUserRequest $request,
        CreateUserAction $action,
    ): RedirectResponse {
        $action->handle(UserData::fromRequest($request));

        return to_route('admin.users.index')
            ->with('success', 'User created successfully.');
    }

    /**
     * Display the specified user.
     */
    public function show(User $user): Response
    {
        $user->load(['roles.permissions', 'permissions']);

        return Inertia::render('Admin/Users/Show', [
            'user' => $user,
        ]);
    }

    /**
     * Show the form for editing the specified user.
     */
    public function edit(User $user): Response
    {
        $user->load('roles');

        return Inertia::render('Admin/Users/Edit', [
            'user' => $user,
            'roles' => $this->userService->getAllRoles(),
        ]);
    }

    /**
     * Update the specified user in storage.
     */
    public function update(
        UpdateUserRequest $request,
        User $user,
        UpdateUserAction $action,
    ): RedirectResponse {
        $action->handle($user, UserData::fromRequest($request));

        return to_route('admin.users.index')
            ->with('success', 'User updated successfully.');
    }

    /**
     * Remove the specified user from storage.
     */
    public function destroy(
        Request $request,
        User $user,
        DeleteUserAction $action,
    ): RedirectResponse {
        if ($user->id === $request->user()?->id) {
            return back()->with('error', 'You cannot delete your own account.');
        }

        $action->handle($user);

        return to_route('admin.users.index')
            ->with('success', 'User deleted successfully.');
    }

    /**
     * Activate the specified user.
     */
    public function activate(
        User $user,
        ToggleUserStatusAction $action,
    ): RedirectResponse {
        $action->handle($user, true);

        return back()->with('success', 'User activated successfully.');
    }

    /**
     * Deactivate the specified user.
     */
    public function deactivate(
        Request $request,
        User $user,
        ToggleUserStatusAction $action,
    ): RedirectResponse {
        if ($user->id === $request->user()?->id) {
            return back()->with('error', 'You cannot deactivate your own account.');
        }

        $action->handle($user, false);

        return back()->with('success', 'User deactivated successfully.');
    }
}
