<?php

declare(strict_types=1);

namespace Modules\Admin\Tests\Feature;

use Inertia\Testing\AssertableInertia as Assert;
use Modules\Auth\Models\User;
use Modules\Role\Database\Seeders\RolesAndPermissionsSeeder;
use Modules\Role\Enums\RoleName;

beforeEach(function (): void {
    $this->seed(RolesAndPermissionsSeeder::class);
    $this->admin = User::factory()->create(['email_verified_at' => now()]);
    $this->admin->assignRole(RoleName::Admin->value);
});

test('unauthenticated users are redirected from user management to login', function (): void {
    $response = $this->get('/admin/users');

    $response->assertRedirect('/login');
});

test('non-admin users are forbidden from user management', function (): void {
    $student = User::factory()->create();
    $student->assignRole(RoleName::Student->value);

    $response = $this->actingAs($student)->get('/admin/users');

    $response->assertForbidden();
});

test('visiting /users redirects authenticated admin to /admin/users', function (): void {
    $response = $this->actingAs($this->admin)->get('/users');

    $response->assertRedirect(route('admin.users.index'));
});

test('admin can view user index with statistics and filters', function (): void {
    $this->withoutVite();

    $teacher = User::factory()->create(['name' => 'Alice Teacher']);
    $teacher->assignRole(RoleName::Teacher->value);

    $student = User::factory()->inactive()->create(['name' => 'Bob Student']);
    $student->assignRole(RoleName::Student->value);

    $response = $this->actingAs($this->admin)->get(route('admin.users.index'));

    $response->assertOk();
    $response->assertInertia(fn (Assert $page): Assert => $page
        ->component('Admin/Users/Index', false)
        ->has('users.data')
        ->has('stats')
        ->has('roles')
        ->has('filters')
        ->where('stats.total_users', 3)
        ->where('stats.active_users', 2)
        ->where('stats.inactive_users', 1)
        ->where('stats.admins_count', 1)
        ->where('stats.teachers_count', 1)
        ->where('stats.students_count', 1)
    );
});

test('admin can filter users by search keyword, role, and active status', function (): void {
    $this->withoutVite();

    $teacher = User::factory()->create(['name' => 'Alice Teacher', 'email' => 'alice@school.com']);
    $teacher->assignRole(RoleName::Teacher->value);

    $inactiveTeacher = User::factory()->inactive()->create(['name' => 'Inactive Teacher', 'email' => 'inactive@school.com']);
    $inactiveTeacher->assignRole(RoleName::Teacher->value);

    $student = User::factory()->create(['name' => 'Bob Student', 'email' => 'bob@school.com']);
    $student->assignRole(RoleName::Student->value);

    // Search filter
    $searchResponse = $this->actingAs($this->admin)->get(route('admin.users.index', ['search' => 'Alice']));
    $searchResponse->assertOk();
    $searchResponse->assertInertia(fn (Assert $page): Assert => $page
        ->where('users.total', 1)
        ->where('users.data.0.name', 'Alice Teacher')
    );

    // Role filter
    $roleResponse = $this->actingAs($this->admin)->get(route('admin.users.index', ['role' => RoleName::Teacher->value]));
    $roleResponse->assertOk();
    $roleResponse->assertInertia(fn (Assert $page): Assert => $page
        ->where('users.total', 2)
    );

    // Status filter
    $statusResponse = $this->actingAs($this->admin)->get(route('admin.users.index', ['status' => 'inactive']));
    $statusResponse->assertOk();
    $statusResponse->assertInertia(fn (Assert $page): Assert => $page
        ->where('users.total', 1)
        ->where('users.data.0.email', 'inactive@school.com')
    );
});

test('admin can view user creation form', function (): void {
    $this->withoutVite();

    $response = $this->actingAs($this->admin)->get(route('admin.users.create'));

    $response->assertOk();
    $response->assertInertia(fn (Assert $page): Assert => $page
        ->component('Admin/Users/Create', false)
        ->has('roles')
    );
});

test('admin can create a new active user with roles', function (): void {
    $response = $this->actingAs($this->admin)->post(route('admin.users.store'), [
        'name' => 'John Instructor',
        'email' => 'john.instructor@school.test',
        'password' => 'Password123!',
        'password_confirmation' => 'Password123!',
        'roles' => [RoleName::Teacher->value],
        'is_active' => true,
    ]);

    $response->assertRedirect(route('admin.users.index'));
    $response->assertSessionHas('success', 'User created successfully.');

    $user = User::query()->where('email', 'john.instructor@school.test')->first();
    expect($user)->not->toBeNull()
        ->and($user->name)->toBe('John Instructor')
        ->and($user->is_active)->toBeTrue()
        ->and($user->hasRole(RoleName::Teacher->value))->toBeTrue();
});

test('user creation validates unique email and required fields', function (): void {
    $response = $this->actingAs($this->admin)->post(route('admin.users.store'), [
        'name' => '',
        'email' => $this->admin->email,
        'password' => 'short',
        'password_confirmation' => 'mismatch',
    ]);

    $response->assertSessionHasErrors(['name', 'email', 'password']);
});

test('admin can view user details', function (): void {
    $this->withoutVite();

    $teacher = User::factory()->create(['name' => 'Jane Instructor']);
    $teacher->assignRole(RoleName::Teacher->value);

    $response = $this->actingAs($this->admin)->get(route('admin.users.show', $teacher));

    $response->assertOk();
    $response->assertInertia(fn (Assert $page): Assert => $page
        ->component('Admin/Users/Show', false)
        ->has('user')
        ->where('user.name', 'Jane Instructor')
        ->has('user.roles')
    );
});

test('admin can view user edit form', function (): void {
    $this->withoutVite();

    $student = User::factory()->create();
    $student->assignRole(RoleName::Student->value);

    $response = $this->actingAs($this->admin)->get(route('admin.users.edit', $student));

    $response->assertOk();
    $response->assertInertia(fn (Assert $page): Assert => $page
        ->component('Admin/Users/Edit', false)
        ->has('user')
        ->has('roles')
    );
});

test('admin can update user details and roles', function (): void {
    $teacher = User::factory()->create(['name' => 'Original Name']);
    $teacher->assignRole(RoleName::Teacher->value);

    $response = $this->actingAs($this->admin)->put(route('admin.users.update', $teacher), [
        'name' => 'Updated Teacher Name',
        'email' => 'updated.teacher@school.test',
        'roles' => [RoleName::Teacher->value, RoleName::Admin->value],
        'is_active' => true,
    ]);

    $response->assertRedirect(route('admin.users.index'));
    $response->assertSessionHas('success', 'User updated successfully.');

    $teacher->refresh();
    expect($teacher->name)->toBe('Updated Teacher Name')
        ->and($teacher->email)->toBe('updated.teacher@school.test')
        ->and($teacher->hasRole(RoleName::Teacher->value))->toBeTrue()
        ->and($teacher->hasRole(RoleName::Admin->value))->toBeTrue();
});

test('admin can activate an inactive user', function (): void {
    $inactiveUser = User::factory()->inactive()->create();
    expect($inactiveUser->is_active)->toBeFalse();

    $response = $this->actingAs($this->admin)->patch(route('admin.users.activate', $inactiveUser));

    $response->assertRedirect();
    $response->assertSessionHas('success', 'User activated successfully.');

    $inactiveUser->refresh();
    expect($inactiveUser->is_active)->toBeTrue();
});

test('admin can deactivate an active user', function (): void {
    $activeUser = User::factory()->create(['is_active' => true]);
    expect($activeUser->is_active)->toBeTrue();

    $response = $this->actingAs($this->admin)->patch(route('admin.users.deactivate', $activeUser));

    $response->assertRedirect();
    $response->assertSessionHas('success', 'User deactivated successfully.');

    $activeUser->refresh();
    expect($activeUser->is_active)->toBeFalse();
});

test('admin cannot deactivate their own account', function (): void {
    $response = $this->actingAs($this->admin)->patch(route('admin.users.deactivate', $this->admin));

    $response->assertRedirect();
    $response->assertSessionHas('error', 'You cannot deactivate your own account.');

    $this->admin->refresh();
    expect($this->admin->is_active)->toBeTrue();
});

test('admin can delete a user', function (): void {
    $targetUser = User::factory()->create();

    $response = $this->actingAs($this->admin)->delete(route('admin.users.destroy', $targetUser));

    $response->assertRedirect(route('admin.users.index'));
    $response->assertSessionHas('success', 'User deleted successfully.');

    expect(User::query()->find($targetUser->id))->toBeNull();
});

test('admin cannot delete their own account', function (): void {
    $response = $this->actingAs($this->admin)->delete(route('admin.users.destroy', $this->admin));

    $response->assertRedirect();
    $response->assertSessionHas('error', 'You cannot delete your own account.');

    expect(User::query()->find($this->admin->id))->not->toBeNull();
});
