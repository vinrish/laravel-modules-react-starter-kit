<?php

declare(strict_types=1);

use Illuminate\Support\Facades\Route;
use Modules\Role\Http\Controllers\PermissionController;
use Modules\Role\Http\Controllers\RoleController;

Route::middleware(['auth', 'verified'])->group(function (): void {
    Route::resource('roles', RoleController::class);
    Route::get('permissions', [PermissionController::class, 'index'])->name('permissions.index');
});
