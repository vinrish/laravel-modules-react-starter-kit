<?php

declare(strict_types=1);

use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Inertia\Response;
use Modules\Role\Enums\RoleName;

Route::get('/', function (Request $request): Response|RedirectResponse {
    if ($request->user()?->hasRole(RoleName::Admin->value)) {
        return to_route('admin.dashboard');
    }

    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth'])->get('/users', function (Request $request): RedirectResponse {
    if ($request->user()?->hasRole(RoleName::Admin->value)) {
        return to_route('admin.users.index');
    }

    return to_route('dashboard');
})->name('users');
